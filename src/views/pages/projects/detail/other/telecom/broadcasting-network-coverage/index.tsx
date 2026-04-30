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
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { BroadcastingInfrastructure, BroadcastingNetworkCoverage } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BroadcastingNetworkCoverageCard from './broadcasting-network-coverage-card';
import BroadcastingNetworkCoverageDrawer from './broadcasting-network-coverage-drawer';
import { broadcastingNetworkCoverageColumns } from './broadcasting-network-coverage-row';

interface BroadcastingNetworkCoverageListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BroadcastingNetworkCoverageList: React.FC<BroadcastingNetworkCoverageListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BroadcastingNetworkCoverage | null>(null);
  const { t } = useTranslation();

  const { data: networkInfrastructureTypes } = useQuery({
    queryKey: ['network-infrastructure-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const networkInfrastructureTypeMap = new Map<string, string>(
    networkInfrastructureTypes?.payload.map((item) => [item.id, item.title || '']) || []
  );

  const { data: broadcastingInfrastructures } = useQuery({
    queryKey: ['broadcasting-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<BroadcastingInfrastructure>().getAll('broadcasting-infrastructures', {
        filter: { project_id: projectId }
      })
  });

  const broadcastingInfrastructureMap = new Map<string, string>(
    broadcastingInfrastructures?.payload.map((item) => [item.id, item.name || '']) || []
  );

  const fetchBroadcastingNetworkCoverages = (params: GetRequestParam): Promise<IApiResponse<BroadcastingNetworkCoverage[]>> => {
    return projectOtherApiSecondService<BroadcastingNetworkCoverage>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: broadcastingNetworkCoverages,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BroadcastingNetworkCoverage[]>({
    queryKey: ['broadcastingNetworkCoverages'],
    fetchFunction: fetchBroadcastingNetworkCoverages
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BroadcastingNetworkCoverage);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BroadcastingNetworkCoverage);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => {
    toggleDrawer();
    setSelectedRow(broadcastingNetworkCoverage);
  };

  const handleDelete = async (broadcastingNetworkCoverageId: string) => {
    await projectOtherApiSecondService<BroadcastingNetworkCoverage>().delete(otherSubMenu?.apiRoute || '', broadcastingNetworkCoverageId);
    refetch();
  };

  const handleClickDetail = (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => {
    toggleDetailDrawer();
    setSelectedRow(broadcastingNetworkCoverage);
  };

  const mapBroadcastingNetworkCoverageToDetailItems = (
    broadcastingNetworkCoverage: BroadcastingNetworkCoverage
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.broadcasting-network-coverage.details.broadcasting-infrastructure'),
      value:
        broadcastingNetworkCoverage?.broadcastingInfrastructure?.name ||
        broadcastingInfrastructureMap.get(broadcastingNetworkCoverage?.broadcasting_infrastructure_id) ||
        broadcastingNetworkCoverage?.broadcasting_infrastructure_id ||
        'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.network-infrastructure-type'),
      value:
        broadcastingNetworkCoverage?.networkInfrastructureType?.title ||
        networkInfrastructureTypeMap.get(broadcastingNetworkCoverage?.network_infrastructure_type_id) ||
        broadcastingNetworkCoverage?.network_infrastructure_type_id ||
        'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.total-coverage-area'),
      value: broadcastingNetworkCoverage?.total_coverage_area?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.coverage-population-no'),
      value: broadcastingNetworkCoverage?.coverage_population_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.active-users-no'),
      value: broadcastingNetworkCoverage?.active_users_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.average-download-speed'),
      value: broadcastingNetworkCoverage?.average_download_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.average-upload-speed'),
      value: broadcastingNetworkCoverage?.average_upload_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.signal-strength'),
      value: broadcastingNetworkCoverage?.signal_strength?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-coverage.details.others'),
      value: broadcastingNetworkCoverage?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: broadcastingNetworkCoverage?.created_at ? formatCreatedAt(broadcastingNetworkCoverage.created_at as any) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: broadcastingNetworkCoverage?.updated_at ? formatCreatedAt(broadcastingNetworkCoverage.updated_at as any) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BroadcastingNetworkCoverageDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          broadcastingNetworkCoverage={selectedRow as BroadcastingNetworkCoverage}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBroadcastingNetworkCoverageToDetailItems(selectedRow as BroadcastingNetworkCoverage)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.broadcasting-network-coverage.broadcasting-network-coverage-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.broadcasting-network-coverage.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: broadcastingNetworkCoverageColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkInfrastructureTypeMap,
            broadcastingInfrastructureMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BroadcastingNetworkCoverageCard
            onDetail={handleClickDetail}
            broadcastingNetworkCoverage={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkInfrastructureTypeMap={networkInfrastructureTypeMap}
            broadcastingInfrastructureMap={broadcastingInfrastructureMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || 'broadcastingnetworkcoverage'
          }
        }}
        fetchDataFunction={refetch}
        items={broadcastingNetworkCoverages || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BroadcastingNetworkCoverageList;
