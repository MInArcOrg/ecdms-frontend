'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { ElectricSmartMetersData, MiniGridStation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import ElectricSmartMetersDataCard from './electric-smart-meters-data-card';
import ElectricSmartMetersDataDrawer from './electric-smart-meters-data-drawer';
import { electricSmartMetersDataColumns } from './electric-smart-meters-data-row';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface ElectricSmartMetersDataListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const ElectricSmartMetersDataList: React.FC<ElectricSmartMetersDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ElectricSmartMetersData | null>(null);
  const { t } = useTranslation();

  // Fetch mini grid stations
  const { data: miniGridStations } = useQuery({
    queryKey: ['mini-grid-stations', projectId],
    queryFn: () => projectOtherApiSecondService<MiniGridStation>().getAll('mini-grid-stations', {})
  });

  // Fetch smart meter models from master data
  const { data: model } = useQuery({
    queryKey: ['models'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.model.model }
      })
  });

  // Fetch smart meter types from master data
  const { data: smartMeterTypes } = useQuery({
    queryKey: ['smart-meter-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.smartMeterType.model }
      })
  });

  const fetchElectricSmartMetersData = (params: GetRequestParam): Promise<IApiResponse<ElectricSmartMetersData[]>> => {
    return projectOtherApiSecondService<ElectricSmartMetersData>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: electricSmartMetersData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ElectricSmartMetersData[]>({
    queryKey: ['electricSmartMetersData'],
    fetchFunction: fetchElectricSmartMetersData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (electricSmartMetersData: ElectricSmartMetersData) => {
    toggleDrawer();
    setSelectedRow(electricSmartMetersData);
  };

  const handleDelete = async (electricSmartMetersDataId: string) => {
    await projectOtherApiSecondService<ElectricSmartMetersData>().delete(otherSubMenu?.apiRoute || '', electricSmartMetersDataId);
    refetch();
  };

  const handleClickDetail = (electricSmartMetersData: ElectricSmartMetersData) => {
    toggleDetailDrawer();
    setSelectedRow(electricSmartMetersData);
  };

  // Create maps for dropdown values
  const miniGridStationsMap = new Map(miniGridStations?.payload.map((item: MiniGridStation) => [item.id, item.name || '']) || []);
  const modelMap = new Map(model?.payload.map((item: any) => [item.id, item.title || '']) || []);
  const smartMeterTypesMap = new Map(smartMeterTypes?.payload.map((item: any) => [item.id, item.title || '']) || []);

  const mapElectricSmartMetersDataToDetailItems = (
    electricSmartMetersData: ElectricSmartMetersData
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.electric-smart-meters-data.details.name'),
      value: electricSmartMetersData?.name || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.mini-grid-station-id'),
      value: electricSmartMetersData?.mini_grid_station_id
        ? miniGridStationsMap.get(electricSmartMetersData.mini_grid_station_id) || electricSmartMetersData.mini_grid_station_id
        : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.owner-operator'),
      value: electricSmartMetersData?.owner_operator || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.facility-type'),
      value: electricSmartMetersData?.facility_type || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.service-area'),
      value: electricSmartMetersData?.service_area !== undefined ? `${electricSmartMetersData.service_area} ${t('common.km2')}` : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.manufacturer'),
      value: electricSmartMetersData?.manufacturer || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.model-id'),
      value: electricSmartMetersData?.model_id ? modelMap.get(electricSmartMetersData.model_id) || electricSmartMetersData.model_id : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.smart-meter-type-id'),
      value: electricSmartMetersData?.smart_meter_type_id
        ? smartMeterTypesMap.get(electricSmartMetersData.smart_meter_type_id) || electricSmartMetersData.smart_meter_type_id
        : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.installation-year'),
      value: electricSmartMetersData?.installation_year?.toString() || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.smart-meters-installed-number'),
      value: electricSmartMetersData?.smart_meters_installed_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-data.details.remark'),
      value: electricSmartMetersData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: electricSmartMetersData?.created_at ? formatCreatedAt(electricSmartMetersData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: electricSmartMetersData?.updated_at ? formatCreatedAt(electricSmartMetersData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricSmartMetersDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricSmartMetersData={selectedRow as ElectricSmartMetersData}
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
          Model={model?.payload || []}
          smartMeterTypes={smartMeterTypes?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricSmartMetersDataToDetailItems(selectedRow as ElectricSmartMetersData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electric_smart_meters_data}
          title={t('project.other.electric-smart-meters-data.electric-smart-meters-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.electric-smart-meters-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricSmartMetersDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            miniGridStationsMap,
            modelMap,
            smartMeterTypesMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricSmartMetersDataCard
            onDetail={handleClickDetail}
            electricSmartMetersData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            miniGridStationsMap={miniGridStationsMap}
            modelMap={modelMap}
            smartMeterTypesMap={smartMeterTypesMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'electricsmartmetersdata'
          }
        }}
        fetchDataFunction={refetch}
        items={electricSmartMetersData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricSmartMetersDataList;
