import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { NetworkCoverage, TelecomInfrastructureComponent } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
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

  const { data: mobileNetworkTypes } = useQuery({
    queryKey: ['mobile-network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const mobileNetworkTypeMap = new Map(mobileNetworkTypes?.payload.map((item) => [item.id, item.title || 'N/A']) || []);

  const { data: telecomInfrastructureComponents } = useQuery({
    queryKey: ['telecom-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<TelecomInfrastructureComponent>().getAll('telecom-infrastructures', dropDownConfig({
        filter: { project_id: projectId }
      })
      )
  });

  const telecomInfrastructureComponentMap = new Map(
    telecomInfrastructureComponents?.payload.map((item) => [
      item.id,
      mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
    ]) || []
  );

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
          telecomInfrastructureComponents={telecomInfrastructureComponents?.payload || []}
          mobileNetworkTypeMap={mobileNetworkTypeMap}
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
          headers: networkCoverageColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            telecomInfrastructureComponentMap
          )
        }}
        items={networkCoverages || []}

        createActionConfig={{
          ...defaultCreateActionConfig,
          permission: {
            subject: otherSubMenu?.model || '',
            action: 'create'
          },
          onClick: toggleDrawer,
          onlyIcon: false
        }}
        fetchDataFunction={refetch}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default NetworkCoverageList;
