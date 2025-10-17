import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { InternetConnectionInfrastructureAge } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import InternetConnectionInfrastructureAgeCard from './internet-connection-infrastructure-age-card';
import InternetConnectionInfrastructureAgeDrawer from './internet-connection-infrastructure-age-drawer';
import { internetConnectionInfrastructureAgeColumns } from './internet-connection-infrastructure-age-row';

interface InternetConnectionInfrastructureAgeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const InternetConnectionInfrastructureAgeList: React.FC<InternetConnectionInfrastructureAgeListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InternetConnectionInfrastructureAge | null>(null);
  const { t } = useTranslation();

  const fetchInternetConnectionInfrastructureAges = (
    params: GetRequestParam
  ): Promise<IApiResponse<InternetConnectionInfrastructureAge[]>> => {
    return projectOtherApiSecondService<InternetConnectionInfrastructureAge>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter }
    });
  };

  const {
    data: internetConnectionInfrastructureAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<InternetConnectionInfrastructureAge[]>({
    queryKey: ['internetConnectionInfrastructureAges'],
    fetchFunction: fetchInternetConnectionInfrastructureAges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as InternetConnectionInfrastructureAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as InternetConnectionInfrastructureAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => {
    toggleDrawer();
    setSelectedRow(internetConnectionInfrastructureAge);
  };

  const handleDelete = async (internetConnectionInfrastructureAgeId: string) => {
    await projectOtherApiSecondService<InternetConnectionInfrastructureAge>().delete(
      otherSubMenu?.apiRoute || '',
      internetConnectionInfrastructureAgeId
    );
    refetch();
  };

  const handleClickDetail = (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => {
    toggleDetailDrawer();
    setSelectedRow(internetConnectionInfrastructureAge);
  };

  const mapInternetConnectionInfrastructureAgeToDetailItems = (
    internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.internet-connection-infrastructure-age.details.internet-connection-id'),
      value: internetConnectionInfrastructureAge?.internet_connection_id || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-age.details.routers'),
      value: internetConnectionInfrastructureAge?.routers?.toString() || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-age.details.switches'),
      value: internetConnectionInfrastructureAge?.switches?.toString() || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-age.details.modems'),
      value: internetConnectionInfrastructureAge?.modems?.toString() || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-age.details.cables'),
      value: internetConnectionInfrastructureAge?.cables?.toString() || 'N/A'
    },
    {
      title: t('project.other.internet-connection-infrastructure-age.details.others'),
      value: internetConnectionInfrastructureAge?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: internetConnectionInfrastructureAge?.created_at ? formatCreatedAt(internetConnectionInfrastructureAge.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: internetConnectionInfrastructureAge?.updated_at ? formatCreatedAt(internetConnectionInfrastructureAge.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <InternetConnectionInfrastructureAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          internetConnectionInfrastructureAge={selectedRow as InternetConnectionInfrastructureAge}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapInternetConnectionInfrastructureAgeToDetailItems(selectedRow as InternetConnectionInfrastructureAge)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.internetConnectionInfrastructureAge}
          title={t('project.other.internet-connection-infrastructure-age.internet-connection-infrastructure-age-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.internet-connection-infrastructure-age.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: internetConnectionInfrastructureAgeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <InternetConnectionInfrastructureAgeCard
            onDetail={handleClickDetail}
            internetConnectionInfrastructureAge={data}
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
            subject: 'internetconnectioninfrastructureage'
          }
        }}
        fetchDataFunction={refetch}
        items={internetConnectionInfrastructureAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default InternetConnectionInfrastructureAgeList;
