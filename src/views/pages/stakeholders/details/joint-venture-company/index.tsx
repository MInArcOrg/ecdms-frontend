import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import jointVentureCompanyApiService from 'src/services/stakeholder/joint-venture-company-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import JointVentureCompanyCard from './joint-venture-company-card';
import JointVentureCompanyDrawer from './joint-venture-company-drawer';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import { jointVentureCompanyColumns } from './joint-venture-company-row';

interface JointVentureCompanyListProps {
  model: string;
  stakeholderId: string;
  typeId: string;
}

const JointVentureCompanyList: React.FC<JointVentureCompanyListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<JointVentureCompany | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchJointVentureCompanies = (params: GetRequestParam): Promise<IApiResponse<JointVentureCompany[]>> => {
    return jointVentureCompanyApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: jointVentureCompanies,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<JointVentureCompany[]>({
    queryKey: ['jointVentureCompanies'],
    fetchFunction: fetchJointVentureCompanies
  });

  const toggleDrawer = () => {
    setSelectedRow({} as JointVentureCompany);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as JointVentureCompany);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (jointVentureCompany: JointVentureCompany) => {
    toggleDrawer();
    setSelectedRow(jointVentureCompany);
  };

  const handleDelete = async (jointVentureCompanyId: string) => {
    await jointVentureCompanyApiService.delete(jointVentureCompanyId);
    refetch();
  };

  const handleClickDetail = (jointVentureCompany: JointVentureCompany) => {
    toggleDetailDrawer();
    setSelectedRow(jointVentureCompany);
  };

  const mapJointVentureCompanyToDetailItems = (jointVentureCompany: JointVentureCompany): { title: string; value: string }[] => [
    { title: t('jointVentureCompany.companyName'), value: jointVentureCompany.company_name },
    { title: t('jointVentureCompany.specialization'), value: jointVentureCompany.specialization || 'N/A' },
    { title: t('jointVentureCompany.rolesAndResponsibilities'), value: jointVentureCompany.roles_and_responsibilities || 'N/A' },
    { title: t('jointVentureCompany.ownershipPercentage'), value: jointVentureCompany.ownership_percentage?.toString() || 'N/A' },
    { title: t('jointVentureCompany.description'), value: jointVentureCompany.description },
    { title: t('jointVentureCompany.reference'), value: jointVentureCompany.reference },
    {
      title: t('common.table-columns.created-at'),
      value: jointVentureCompany?.created_at ? formatCreatedAt(jointVentureCompany.created_at) : 'N/A'
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
        <JointVentureCompanyDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          jointVentureCompany={selectedRow as JointVentureCompany}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapJointVentureCompanyToDetailItems(selectedRow as JointVentureCompany)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="JOINT_VENTURE_COMPANY"
          title={t('jointVentureCompany.details')}
        />
      )}

      <ItemsListing
        title={t('jointVentureCompany.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: jointVentureCompanyColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <JointVentureCompanyCard
            onDetail={handleClickDetail}
            jointVentureCompany={data}
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
            subject: 'jointventurecompany'
          }
        }}
        fetchDataFunction={refetch}
        items={jointVentureCompanies || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default JointVentureCompanyList;
