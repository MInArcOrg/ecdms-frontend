'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetwork, SatelliteNetworkCoverage } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import SatelliteNetworkCoverageCard from './satellite-network-coverage-card';
import SatelliteNetworkCoverageDrawer from './satellite-network-coverage-drawer';
import { satelliteNetworkCoverageColumns } from './satellite-network-coverage-row';

interface SatelliteNetworkCoverageListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string; 
  projectId: string;
}

const SatelliteNetworkCoverageList: React.FC<SatelliteNetworkCoverageListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SatelliteNetworkCoverage | null>(null);
  const { t } = useTranslation();

  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const { data: satelliteNetworks } = useQuery({
    queryKey: ['satellite-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<SatelliteNetwork>().getAll('satellite-networks', {
        filter: { project_id: projectId }
      })
  });

  const networkTypeMap = new Map(networkTypes?.payload.map((item) => [item.id, item.title || '']) || []);
  const satelliteNetworkMap = new Map(satelliteNetworks?.payload.map((item) => [item.id, item.name || 'N/A']) || []);

  const fetchSatelliteNetworkCoverages = (params: GetRequestParam): Promise<IApiResponse<SatelliteNetworkCoverage[]>> => {
    return projectOtherApiSecondService<SatelliteNetworkCoverage>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: satelliteNetworkCoverages,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SatelliteNetworkCoverage[]>({
    queryKey: ['satelliteNetworkCoverages'],
    fetchFunction: fetchSatelliteNetworkCoverages
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SatelliteNetworkCoverage);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SatelliteNetworkCoverage);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (satelliteNetworkCoverage: SatelliteNetworkCoverage) => {
    toggleDrawer();
    setSelectedRow(satelliteNetworkCoverage);
  };

  const handleDelete = async (satelliteNetworkCoverageId: string) => {
    await projectOtherApiSecondService<SatelliteNetworkCoverage>().delete(otherSubMenu?.apiRoute || '', satelliteNetworkCoverageId);
    refetch();
  };

  const handleClickDetail = (satelliteNetworkCoverage: SatelliteNetworkCoverage) => {
    toggleDetailDrawer();
    setSelectedRow(satelliteNetworkCoverage);
  };

  const mapSatelliteNetworkCoverageToDetailItems = (satelliteNetworkCoverage: SatelliteNetworkCoverage): { title: string; value: string }[] => [
    {
      title: t('project.other.satellite-network.title'),
      value: satelliteNetworkMap.get(satelliteNetworkCoverage?.satellite_network_id) || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.network-infrastructure-type-id'),
      value:
        networkTypeMap.get(satelliteNetworkCoverage?.network_infrastructure_type_id) ||
        satelliteNetworkCoverage?.network_infrastructure_type_id ||
        'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.total-coverage-area'),
      value: satelliteNetworkCoverage?.total_coverage_area?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.coverage-population-no'),
      value: satelliteNetworkCoverage?.coverage_population_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.active-users-no'),
      value: satelliteNetworkCoverage?.active_users_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.average-download-speed'),
      value: satelliteNetworkCoverage?.average_download_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.average-upload-speed'),
      value: satelliteNetworkCoverage?.average_upload_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.signal-strength'),
      value: satelliteNetworkCoverage?.signal_strength?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-coverage.details.others'),
      value: satelliteNetworkCoverage?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: satelliteNetworkCoverage?.created_at ? formatCreatedAt(satelliteNetworkCoverage.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: satelliteNetworkCoverage?.updated_at ? formatCreatedAt(satelliteNetworkCoverage.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <SatelliteNetworkCoverageDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          satelliteNetworkCoverage={selectedRow as SatelliteNetworkCoverage}
          refetch={refetch}
          projectId={projectId}
          satelliteNetworks={satelliteNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSatelliteNetworkCoverageToDetailItems(selectedRow as SatelliteNetworkCoverage)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.satelliteNetworkCoverage}
          title={t('project.other.satellite-network-coverage.satellite-network-coverage-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.satellite-network-coverage.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: satelliteNetworkCoverageColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
            satelliteNetworkMap,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SatelliteNetworkCoverageCard
            onDetail={handleClickDetail}
            satelliteNetworkCoverage={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
            satelliteNetworkMap={satelliteNetworkMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || ''
          }
        }}
        fetchDataFunction={refetch}
        items={satelliteNetworkCoverages || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SatelliteNetworkCoverageList;
