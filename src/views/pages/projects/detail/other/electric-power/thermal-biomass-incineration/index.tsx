'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { ThermalBiomassIncinerationData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import ThermalBiomassIncinerationCard from './thermal-biomass-incineration-card';
import ThermalBiomassIncinerationDrawer from './thermal-biomass-incineration-drawer';
import { thermalBiomassIncinerationColumns } from './thermal-biomass-incineration-row';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface ThermalBiomassIncinerationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ThermalBiomassIncinerationList: React.FC<ThermalBiomassIncinerationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ThermalBiomassIncinerationData | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: thermalTypes } = useQuery({
    queryKey: ['thermal-biomass-incineration-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.thermalBiomassIncinerationType.model }
      })
  });

  const { data: fuelSources } = useQuery({
    queryKey: ['fuel-sources'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.fuelSource.model }
      })
  });

  // Create maps for quick lookup
  const thermalTypeMap = new Map(thermalTypes?.payload.map((item) => [item.id, item.title || '']) || []);
  const fuelSourceMap = new Map(fuelSources?.payload.map((item) => [item.id, item.title || '']) || []);

  const fetchThermalBiomassIncinerationData = (params: GetRequestParam): Promise<IApiResponse<ThermalBiomassIncinerationData[]>> => {
    return projectOtherApiSecondService<ThermalBiomassIncinerationData>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: thermalBiomassIncinerationDataList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ThermalBiomassIncinerationData[]>({
    queryKey: ['thermalBiomassIncinerationData'],
    fetchFunction: fetchThermalBiomassIncinerationData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ThermalBiomassIncinerationData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ThermalBiomassIncinerationData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: ThermalBiomassIncinerationData) => {
    toggleDrawer();
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<ThermalBiomassIncinerationData>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: ThermalBiomassIncinerationData) => {
    toggleDetailDrawer();
    setSelectedRow(data);
  };

  const mapToDetailItems = (data: ThermalBiomassIncinerationData): { title: string; value: string }[] => [
    {
      title: t('project.other.thermal-biomass-incineration.details.type'),
      value: thermalTypeMap.get(data.type_id) || 'N/A'
    },
    {
      title: t('project.other.thermal-biomass-incineration.details.fuel-source'),
      value: fuelSourceMap.get(data.fuel_source_id) || 'N/A'
    },
    {
      title: t('project.other.thermal-biomass-incineration.details.heat-rate'),
      value: data.heat_rate_at_max_capacity ? `${data.heat_rate_at_max_capacity}` : 'N/A'
    },
    {
      title: t('project.other.thermal-biomass-incineration.details.remark'),
      value: data.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: formatCreatedAt(data.created_at)
    }
  ];

  return (
    <Box>
      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as ThermalBiomassIncinerationData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.thermalBiomassIncinerationData}
          title={t('project.other.thermal-biomass-incineration.title')}
        />
      )}
      <ThermalBiomassIncinerationDrawer
        open={showDrawer}
        toggle={toggleDrawer}
        refetch={refetch}
        thermalBiomassIncinerationData={selectedRow as ThermalBiomassIncinerationData}
        projectId={projectId}
        otherSubMenu={otherSubMenu}
      />
      <ItemsListing
        title={t('project.other.thermal-biomass-incineration.title')}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ThermalBiomassIncinerationCard
            thermalBiomassIncinerationData={data as ThermalBiomassIncinerationData}
            refetch={refetch}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDetail={handleClickDetail}
            thermalTypeMap={thermalTypeMap}
            fuelSourceMap={fuelSourceMap}
          />
        )}
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
        tableProps={{
          headers: thermalBiomassIncinerationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            thermalTypeMap,
            fuelSourceMap
          )
        }}
        type={ITEMS_LISTING_TYPE.table.value}
        pagination={pagination}
        onPaginationChange={handlePageChange}
        items={thermalBiomassIncinerationDataList || []}
      />
    </Box>
  );
};

export default ThermalBiomassIncinerationList;
