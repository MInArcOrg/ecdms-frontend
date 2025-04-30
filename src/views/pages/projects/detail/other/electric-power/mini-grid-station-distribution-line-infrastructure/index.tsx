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
import type { MiniGridStation, MiniGridStationDistributionLineInfrastructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MiniGridStationDistributionLineInfrastructureCard from './mini-grid-station-distribution-line-infrastructure-card';
import MiniGridStationDistributionLineInfrastructureDrawer from './mini-grid-station-distribution-line-infrastructure-drawer';
import { miniGridStationDistributionLineInfrastructureColumns } from './mini-grid-station-distribution-line-infrastructure-row';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';

interface MiniGridStationDistributionLineInfrastructureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MiniGridStationDistributionLineInfrastructureList: React.FC<MiniGridStationDistributionLineInfrastructureListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MiniGridStationDistributionLineInfrastructure | null>(null);
  const { t } = useTranslation();

  const { data: miniGridStations } = useQuery({
    queryKey: ['mini-grid-stations', projectId],
    queryFn: () => projectOtherApiSecondService<MiniGridStation>().getAll('mini-grid-stations', {})
  });

  const { data: distributionLineTypes } = useQuery({
    queryKey: ['distribution-line-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.distributionLineType.model }
      })
  });

  const { data: distributionLineMaterials } = useQuery({
    queryKey: ['distribution-line-materials'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.distributionLineMaterial.model }
      })
  });

  const fetchMiniGridStationDistributionLineInfrastructures = (
    params: GetRequestParam
  ): Promise<IApiResponse<MiniGridStationDistributionLineInfrastructure[]>> => {
    return projectOtherApiSecondService<MiniGridStationDistributionLineInfrastructure>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: miniGridStationDistributionLineInfrastructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MiniGridStationDistributionLineInfrastructure[]>({
    queryKey: ['miniGridStationDistributionLineInfrastructures'],
    fetchFunction: fetchMiniGridStationDistributionLineInfrastructures
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MiniGridStationDistributionLineInfrastructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MiniGridStationDistributionLineInfrastructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure) => {
    toggleDrawer();
    setSelectedRow(miniGridStationDistributionLineInfrastructure);
  };

  const handleDelete = async (miniGridStationDistributionLineInfrastructureId: string) => {
    await projectOtherApiSecondService<MiniGridStationDistributionLineInfrastructure>().delete(
      otherSubMenu?.apiRoute || '',
      miniGridStationDistributionLineInfrastructureId
    );
    refetch();
  };

  const handleClickDetail = (miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure) => {
    toggleDetailDrawer();
    setSelectedRow(miniGridStationDistributionLineInfrastructure);
  };

  // Create maps for dropdown values
  const miniGridStationsMap = new Map(miniGridStations?.payload.map((item: MiniGridStation) => [item.id, item.name || '']) || []);
  const distributionLineTypesMap = new Map(distributionLineTypes?.payload.map((item: any) => [item.id, item.name || '']) || []);
  const distributionLineMaterialsMap = new Map(distributionLineMaterials?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapMiniGridStationDistributionLineInfrastructureToDetailItems = (
    miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.name'),
      value: miniGridStationDistributionLineInfrastructure?.name || 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.mini-grid-station-id'),
      value: miniGridStationDistributionLineInfrastructure?.mini_grid_station_id
        ? miniGridStationsMap.get(miniGridStationDistributionLineInfrastructure?.mini_grid_station_id) ||
          miniGridStationDistributionLineInfrastructure?.mini_grid_station_id
        : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-type-id'),
      value: miniGridStationDistributionLineInfrastructure?.distribution_line_type_id
        ? distributionLineTypesMap.get(miniGridStationDistributionLineInfrastructure?.distribution_line_type_id) ||
          miniGridStationDistributionLineInfrastructure?.distribution_line_type_id
        : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-material-id'),
      value: miniGridStationDistributionLineInfrastructure?.distribution_line_material_id
        ? distributionLineMaterialsMap.get(miniGridStationDistributionLineInfrastructure?.distribution_line_material_id) ||
          miniGridStationDistributionLineInfrastructure?.distribution_line_material_id
        : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-conductor-size'),
      value:
        miniGridStationDistributionLineInfrastructure?.distribution_line_conductor_size !== undefined
          ? `${miniGridStationDistributionLineInfrastructure.distribution_line_conductor_size} ${t('common.mm2')}`
          : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.voltage-level'),
      value:
        miniGridStationDistributionLineInfrastructure?.voltage_level !== undefined
          ? `${miniGridStationDistributionLineInfrastructure.voltage_level} ${t('common.kv')}`
          : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.topology'),
      value: miniGridStationDistributionLineInfrastructure?.topology
        ? t(
            `project.other.mini-grid-station-distribution-line-infrastructure.topology-options.${miniGridStationDistributionLineInfrastructure.topology.toLowerCase()}`
          )
        : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.switching-station-connection'),
      value:
        miniGridStationDistributionLineInfrastructure?.switching_station_connection !== undefined
          ? miniGridStationDistributionLineInfrastructure.switching_station_connection
            ? t('common.yes')
            : t('common.no')
          : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.station-name'),
      value: miniGridStationDistributionLineInfrastructure?.station_name || 'N/A'
    },
    {
      title: t('project.other.mini-grid-station-distribution-line-infrastructure.details.remark'),
      value: miniGridStationDistributionLineInfrastructure?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: miniGridStationDistributionLineInfrastructure?.created_at
        ? formatCreatedAt(miniGridStationDistributionLineInfrastructure.created_at)
        : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: miniGridStationDistributionLineInfrastructure?.updated_at
        ? formatCreatedAt(miniGridStationDistributionLineInfrastructure.updated_at)
        : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MiniGridStationDistributionLineInfrastructureDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          miniGridStationDistributionLineInfrastructure={selectedRow as MiniGridStationDistributionLineInfrastructure}
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
          distributionLineTypes={distributionLineTypes?.payload || []}
          distributionLineMaterials={distributionLineMaterials?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMiniGridStationDistributionLineInfrastructureToDetailItems(selectedRow as MiniGridStationDistributionLineInfrastructure)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.mini_grid_station_distribution_line_infrastructure}
          title={t(
            'project.other.mini-grid-station-distribution-line-infrastructure.mini-grid-station-distribution-line-infrastructure-details'
          )}
        />
      )}

      <ItemsListing
        title={t('project.other.mini-grid-station-distribution-line-infrastructure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: miniGridStationDistributionLineInfrastructureColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            miniGridStationsMap,
            distributionLineTypesMap,
            distributionLineMaterialsMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MiniGridStationDistributionLineInfrastructureCard
            onDetail={handleClickDetail}
            miniGridStationDistributionLineInfrastructure={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            miniGridStationsMap={miniGridStationsMap}
            distributionLineTypesMap={distributionLineTypesMap}
            distributionLineMaterialsMap={distributionLineMaterialsMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'minigridstationdistributionlineinfrastructure'
          }
        }}
        fetchDataFunction={refetch}
        items={miniGridStationDistributionLineInfrastructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MiniGridStationDistributionLineInfrastructureList;
