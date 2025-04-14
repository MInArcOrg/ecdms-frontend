'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { MiniGridStation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MiniGridStationCard from './mini-grid-station-card';
import MiniGridStationDrawer from './mini-grid-station-drawer';
import { miniGridStationColumns } from './mini-grid-station-row';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface MiniGridStationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MiniGridStationList: React.FC<MiniGridStationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MiniGridStation | null>(null);
  const { t } = useTranslation();

  const { data: substations } = useQuery({
    queryKey: ['substations', projectId],
    queryFn: () => projectOtherApiSecondService<any>().getAll('substation-transformer-and-switchgear-datas', {})
  });

  const { data: batteryTypes } = useQuery({
    queryKey: ['battery-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.batteryType.model }
      })
  });

  const fetchMiniGridStations = (params: GetRequestParam): Promise<IApiResponse<MiniGridStation[]>> => {
    return projectOtherApiSecondService<MiniGridStation>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: miniGridStations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MiniGridStation[]>({
    queryKey: ['miniGridStations'],
    fetchFunction: fetchMiniGridStations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MiniGridStation);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MiniGridStation);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (miniGridStation: MiniGridStation) => {
    toggleDrawer();
    setSelectedRow(miniGridStation);
  };

  const handleDelete = async (miniGridStationId: string) => {
    await projectOtherApiSecondService<MiniGridStation>().delete(otherSubMenu?.apiRoute || '', miniGridStationId);
    refetch();
  };

  const handleClickDetail = (miniGridStation: MiniGridStation) => {
    toggleDetailDrawer();
    setSelectedRow(miniGridStation);
  };

  const substationsMap = new Map(substations?.payload.map((item: any) => [item.id, item.name || '']) || []);
  const batteryTypesMap = new Map(batteryTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapMiniGridStationToDetailItems = (miniGridStation: MiniGridStation): { title: string; value: string }[] => [
    {
      title: t('project.other.mini-grid-station.details.name'),
      value: miniGridStation?.name || 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.substation-id'),
      value: miniGridStation?.substation_id ? substationsMap.get(miniGridStation?.substation_id) || miniGridStation?.substation_id : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.minigrid-size'),
      value: miniGridStation?.minigrid_size !== undefined ? `${miniGridStation.minigrid_size} ${t('common.kw')}` : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.battery-type-id'),
      value: miniGridStation?.battery_type_id
        ? batteryTypesMap.get(miniGridStation?.battery_type_id) || miniGridStation?.battery_type_id
        : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.battery-size'),
      value: miniGridStation?.battery_size !== undefined ? `${miniGridStation.battery_size} ${t('common.kwh')}` : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.inverter'),
      value: miniGridStation?.inverter !== undefined ? `${miniGridStation.inverter} ${t('common.kw')}` : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.system-voltage'),
      value: miniGridStation?.system_voltage !== undefined ? `${miniGridStation.system_voltage} ${t('common.v')}` : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.expected-annual-generation'),
      value:
        miniGridStation?.expected_annual_generation !== undefined
          ? `${miniGridStation.expected_annual_generation} ${t('common.kwh')}`
          : 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.diesel-generator'),
      value: miniGridStation?.diesel_generator || 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.owner-operator'),
      value: miniGridStation?.owner_operator || 'N/A'
    },
    {
      title: t('project.other.mini-grid-station.details.remark'),
      value: miniGridStation?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: miniGridStation?.created_at ? formatCreatedAt(miniGridStation.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: miniGridStation?.updated_at ? formatCreatedAt(miniGridStation.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MiniGridStationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          miniGridStation={selectedRow as MiniGridStation}
          refetch={refetch}
          projectId={projectId}
          substations={substations?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMiniGridStationToDetailItems(selectedRow as MiniGridStation)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.mini_grid_station}
          title={t('project.other.mini-grid-station.mini-grid-station-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.mini-grid-station.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: miniGridStationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MiniGridStationCard
            onDetail={handleClickDetail}
            miniGridStation={data}
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
            subject: 'minigridstation'
          }
        }}
        fetchDataFunction={refetch}
        items={miniGridStations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MiniGridStationList;
