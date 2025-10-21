// src/views/project/other/railway-power-distribution/railway-power-distribution-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_POWER_DISTRIBUTION_FILE_TYPES,
  RAILWAY_POWER_DISTRIBUTION_ENTITY_SUBJECT
} from './filet-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayPowerDistribution } from 'src/types/project/other';

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayPowerDistributionCard from './railway-power-distribution-card';
import RailwayPowerDistributionDrawer from './railway-power-distribution-drawer';
import { railwayPowerDistributionColumns } from './railway-power-distribution-row';


interface RailwayPowerDistributionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  // Note: typeId is not used by this entity's fetch, but included if needed later
  typeId?: string
}

const RailwayPowerDistributionList: React.FC<RailwayPowerDistributionListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayPowerDistribution | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_POWER_DISTRIBUTION_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_POWER_DISTRIBUTION_FILE_TYPES[0].type;


  const fetchRailwayPowerDistribution = (params: GetRequestParam): Promise<IApiResponse<RailwayPowerDistribution[]>> => {
    return projectOtherApiSecondService<RailwayPowerDistribution>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: powerDistributionData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayPowerDistribution[]>({
    queryKey: ['railwayPowerDistribution'],
    fetchFunction: fetchRailwayPowerDistribution
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerDistribution);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerDistribution);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayPowerDistribution) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerDistribution>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayPowerDistribution) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const mapPowerDistributionToDetailItems = (data: RailwayPowerDistribution): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-power-distribution.details.railway_station_platform_layout_id'),
      value: data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || 'N/A'
    },
    {
      title: t('project.other.railway-power-distribution.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_POWER_DISTRIBUTION_FILE_TYPES.map(type => ({
      title: type.titleTKey,
      value: data?.id ? <FileDrawer id={data.id} type={type.type} /> : 'N/A'
    })),
    {
      title: t('common.table-columns.created-at'),
      value: data?.created_at ? formatCreatedAt(data.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: data?.updated_at ? formatCreatedAt(data.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayPowerDistributionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerDistribution={selectedRow as RailwayPowerDistribution}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_POWER_DISTRIBUTION_FILE_TYPES} // Passing config to Drawer
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPowerDistributionToDetailItems(selectedRow as RailwayPowerDistribution)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-power-distribution.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-power-distribution.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerDistributionColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_POWER_DISTRIBUTION_FILE_TYPES // Passing config to Columns
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerDistributionCard
            onDetail={handleClickDetail}
            railwayPowerDistribution={data as RailwayPowerDistribution}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_POWER_DISTRIBUTION_FILE_TYPES} // Passing config to Card
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
        items={powerDistributionData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayPowerDistributionList;