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
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { RailwayPowerSupplyConfiguration } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';

// Components specific to this entity
import RailwayPowerSupplyConfigurationCard from './railway-power-supply-configuration-card';
import RailwayPowerSupplyConfigurationDrawer from './railway-power-supply-configuration-drawer';
import { railwayPowerSupplyConfigurationColumns } from './railway-power-supply-configuration-row';


interface RailwayPowerSupplyConfigurationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId: string
}

const RailwayPowerSupplyConfigurationList: React.FC<RailwayPowerSupplyConfigurationListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayPowerSupplyConfiguration | null>(null);
  const { t } = useTranslation();
  const entitySubject = 'railwaypowersupplyconfiguration';

  const fetchConfiguration = (params: GetRequestParam): Promise<IApiResponse<RailwayPowerSupplyConfiguration[]>> => {
    return projectOtherApiSecondService<RailwayPowerSupplyConfiguration>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: configurationData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayPowerSupplyConfiguration[]>({
    queryKey: ['railwayPowerSupplyConfiguration'],
    fetchFunction: fetchConfiguration
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyConfiguration);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyConfiguration);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayPowerSupplyConfiguration) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerSupplyConfiguration>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayPowerSupplyConfiguration) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapConfigurationToDetailItems = (specs: RailwayPowerSupplyConfiguration): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-configuration.details.power_supply_system_type_id'),
      value: specs?.power_supply_system_type_id || 'N/A' // Placeholder for lookup/UUID
    },
    {
      title: t('project.other.railway-power-supply-configuration.details.voltage_level_and_frequency'),
      value: specs?.voltage_level_and_frequency || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-configuration.details.power_supply_capacity_and_load_requirements'),
      value: specs?.power_supply_capacity_and_load_requirements || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-configuration.details.remark'),
      value: specs?.remark || 'N/A'
    },
    {
      title: t('common.form.attachments'),
      // FileDrawer uses the entity's file type
      value: <FileDrawer id={specs.id} type={otherSubMenu?.fileType || 'RAILWAY_POWER_SUPPLY_CONFIGURATION'} />
    },
    {
      title: t('common.table-columns.created-at'),
      value: specs?.created_at ? formatCreatedAt(specs.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: specs?.updated_at ? formatCreatedAt(specs.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayPowerSupplyConfigurationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerSupplyConfiguration={selectedRow as RailwayPowerSupplyConfiguration}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapConfigurationToDetailItems(selectedRow as RailwayPowerSupplyConfiguration)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || 'RAILWAY_POWER_SUPPLY_CONFIGURATION'}
          title={t('project.other.railway-power-supply-configuration.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-power-supply-configuration.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerSupplyConfigurationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerSupplyConfigurationCard
            onDetail={handleClickDetail}
            railwayPowerSupplyConfiguration={data as RailwayPowerSupplyConfiguration}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: entitySubject
          }
        }}
        fetchDataFunction={refetch}
        items={configurationData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayPowerSupplyConfigurationList;