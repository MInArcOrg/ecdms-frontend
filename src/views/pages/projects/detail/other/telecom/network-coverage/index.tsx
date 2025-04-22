import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { NetworkCoverage } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import NetworkCoverageCard from './network-coverage-card';
import NetworkCoverageDrawer from './network-coverage-drawer';
import { networkCoverageColumns } from './network-coverage-row';

interface NetworkCoverageListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const NetworkCoverageList: React.FC<NetworkCoverageListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<NetworkCoverage | null>(null);
  const { t } = useTranslation();

  const fetchNetworkCoverages = (params: GetRequestParam): Promise<IApiResponse<NetworkCoverage[]>> => {
    return projectOtherApiSecondService<NetworkCoverage>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: networkCoverages,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<NetworkCoverage[]>({
    queryKey: ['networkCoverages'],
    fetchFunction: fetchNetworkCoverages
  });

  const toggleDrawer = () => {
    setSelectedRow({} as NetworkCoverage);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as NetworkCoverage);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (networkCoverage: NetworkCoverage) => {
    toggleDrawer();
    setSelectedRow(networkCoverage);
  };

  const handleDelete = async (networkCoverageId: string) => {
    await projectOtherApiSecondService<NetworkCoverage>().delete(otherSubMenu?.apiRoute || '', networkCoverageId);
    refetch();
  };

  const handleClickDetail = (networkCoverage: NetworkCoverage) => {
    toggleDetailDrawer();
    setSelectedRow(networkCoverage);
  };

  const mapNetworkCoverageToDetailItems = (networkCoverage: NetworkCoverage): { title: string; value: string }[] => [
    {
      title: t('project.other.network-coverage.details.network-infrastructure-type'),
      value: networkCoverage?.networkinfrastructuretype?.id || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.total-coverage-area'),
      value: networkCoverage?.total_coverage_area?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.coverage-population-number'),
      value: networkCoverage?.coverage_population_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.active-users-number'),
      value: networkCoverage?.active_users_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.average-download-speed'),
      value: networkCoverage?.average_download_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.average-upload-speed'),
      value: networkCoverage?.average_upload_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.signal-strength'),
      value: networkCoverage?.signal_strength?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.others'),
      value: networkCoverage?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: networkCoverage?.created_at ? formatCreatedAt(networkCoverage.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: networkCoverage?.updated_at ? formatCreatedAt(networkCoverage.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <NetworkCoverageDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          networkCoverage={selectedRow as NetworkCoverage}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapNetworkCoverageToDetailItems(selectedRow as NetworkCoverage)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.networkCoverage}
          title={t('project.other.network-coverage.network-coverage-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.network-coverage.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: networkCoverageColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <NetworkCoverageCard
            onDetail={handleClickDetail}
            networkCoverage={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'networkcoverage'
          }
        }}
        fetchDataFunction={refetch}
        items={networkCoverages || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default NetworkCoverageList;
