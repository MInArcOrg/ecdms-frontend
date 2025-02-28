import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import jointVentureApiService from 'src/services/stakeholder/joint-venture-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import JointVentureCard from './joint-venture-card';
import JointVentureDrawer from './joint-venture-drawer';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import { jointVentureColumns } from './joint-venture-row';

interface JointVentureListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const JointVentureList: React.FC<JointVentureListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<JointVenture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchJointVentures = (params: GetRequestParam): Promise<IApiResponse<JointVenture[]>> => {
    return jointVentureApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: jointVentures,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<JointVenture[]>({
    queryKey: ['jointVentures'],
    fetchFunction: fetchJointVentures
  });

  const toggleDrawer = () => {
    setSelectedRow({} as JointVenture);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as JointVenture);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (jointVenture: JointVenture) => {
    toggleDrawer();
    setSelectedRow(jointVenture);
  };

  const handleDelete = async (jointVentureId: string) => {
    await jointVentureApiService.delete(jointVentureId);
    refetch();
  };

  const handleClickDetail = (jointVenture: JointVenture) => {
    toggleDetailDrawer();
    setSelectedRow(jointVenture);
  };

  const mapJointVentureToDetailItems = (jointVenture: JointVenture): { title: string; value: string }[] => [
    { title: t('stakeholder.joint-venture.name'), value: jointVenture.name },
    { title: t('stakeholder.joint-venture.memberCompaniesNo'), value: jointVenture.member_companies_no.toString() },
    { title: t('stakeholder.joint-venture.description'), value: jointVenture.description },
    { title: t('stakeholder.joint-venture.reference'), value: jointVenture.reference || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: jointVenture?.created_at ? formatCreatedAt(jointVenture.created_at) : 'N/A'
    }
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      {showDrawer && (
        <JointVentureDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          jointVenture={selectedRow as JointVenture}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapJointVentureToDetailItems(selectedRow as JointVenture)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="JOINT_VENTURE"
          title={t('stakeholder.joint-venture.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.joint-venture.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: jointVentureColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <JointVentureCard
            onDetail={handleClickDetail}
            jointVenture={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'jointventure'
          }
        }}
        fetchDataFunction={refetch}
        items={jointVentures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default JointVentureList;
