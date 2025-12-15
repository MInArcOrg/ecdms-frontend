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
import type { Accessory } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import AccessoryCard from './accessory-card';
import AccessoryDrawer from './accessory-drawer';
import { accessoryColumns } from './accessory-row';
import { sub } from 'date-fns';

interface AccessoryListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const AccessoryList: React.FC<AccessoryListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Accessory | null>(null);
  const { t } = useTranslation();

  const fetchAccessories = (params: GetRequestParam): Promise<IApiResponse<Accessory[]>> => {
    return projectOtherApiSecondService<Accessory>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: accessories,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Accessory[]>({
    queryKey: ['accessories'],
    fetchFunction: fetchAccessories
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Accessory);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Accessory);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (accessory: Accessory) => {
    toggleDrawer();
    setSelectedRow(accessory);
  };

  const handleDelete = async (accessoryId: string) => {
    await projectOtherApiSecondService<Accessory>().delete(otherSubMenu?.apiRoute || '', accessoryId);
    refetch();
  };

  const handleClickDetail = (accessory: Accessory) => {
    toggleDetailDrawer();
    setSelectedRow(accessory);
  };

  const mapAccessoryToDetailItems = (accessory: Accessory): { title: string; value: string }[] => [
    {
      title: t('project.other.accessory.details.name'),
      value: accessory?.name || 'N/A'
    },
    {
      title: t('project.other.accessory.details.under-passes'),
      value: accessory?.under_passes?.toString() || 'N/A'
    },
    {
      title: t('project.other.accessory.details.ramps'),
      value: accessory?.ramps?.toString() || 'N/A'
    },
    {
      title: t('project.other.accessory.details.traffic-signals'),
      value: accessory?.traffic_signals?.toString() || 'N/A'
    },
    {
      title: t('project.other.accessory.details.repair-stations'),
      value: accessory?.repair_stations?.toString() || 'N/A'
    },
    {
      title: t('project.other.accessory.details.bicycle-lanes'),
      value: accessory?.bicycle_lanes ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.accessory.details.bicycle-signals'),
      value: accessory?.bicycle_signals?.toString() || 'N/A'
    },
    {
      title: t('project.other.accessory.details.culvert'),
      value: accessory?.culvert ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.accessory.details.bridge'),
      value: accessory?.bridge ? t('common.yes') : t('common.no')
    },
    {
      title: t('common.table-columns.created-at'),
      value: accessory?.created_at ? formatCreatedAt(accessory.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: accessory?.updated_at ? formatCreatedAt(accessory.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <AccessoryDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          accessory={selectedRow as Accessory}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapAccessoryToDetailItems(selectedRow as Accessory)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.accessory.accessory-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.accessory.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: accessoryColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu?.model || 'accessory')
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <AccessoryCard onDetail={handleClickDetail} accessory={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} model={otherSubMenu?.model || 'accessory'} />
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
        items={accessories || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default AccessoryList;
