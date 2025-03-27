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
import type { WindResource } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import WindResourceCard from './wind-resource-card';
import WindResourceDrawer from './wind-resource-drawer';
import { windResourceColumns } from './wind-resource-row';

interface WindResourceListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const WindResourceList: React.FC<WindResourceListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WindResource | null>(null);
  const { t } = useTranslation();

  const fetchWindResources = (params: GetRequestParam): Promise<IApiResponse<WindResource[]>> => {
    return projectOtherApiSecondService<WindResource>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: windResources,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<WindResource[]>({
    queryKey: ['windResources'],
    fetchFunction: fetchWindResources
  });

  const toggleDrawer = () => {
    setSelectedRow({} as WindResource);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as WindResource);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (windResource: WindResource) => {
    toggleDrawer();
    setSelectedRow(windResource);
  };

  const handleDelete = async (windResourceId: string) => {
    await projectOtherApiSecondService<WindResource>().delete(otherSubMenu?.apiRoute || '', windResourceId);
    refetch();
  };

  const handleClickDetail = (windResource: WindResource) => {
    toggleDetailDrawer();
    setSelectedRow(windResource);
  };

  const mapWindResourceToDetailItems = (windResource: WindResource): { title: string; value: string }[] => [
    {
      title: t('project.other.wind-resource.details.wind-speed-at-hub-height'),
      value:
        windResource?.wind_speed_at_hub_height !== undefined
          ? `${windResource.wind_speed_at_hub_height} ${t('common.meters-per-second')}`
          : 'N/A'
    },
    {
      title: t('project.other.wind-resource.details.weibull-shape-factor'),
      value:
        windResource?.weibull_shape_factor !== undefined ? (windResource.weibull_shape_factor ? t('common.yes') : t('common.no')) : 'N/A'
    },
    {
      title: t('project.other.wind-resource.details.remark'),
      value: windResource?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: windResource?.created_at ? formatCreatedAt(windResource.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: windResource?.updated_at ? formatCreatedAt(windResource.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <WindResourceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          windResource={selectedRow as WindResource}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapWindResourceToDetailItems(selectedRow as WindResource)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.windResource}
          title={t('project.other.wind-resource.wind-resource-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.wind-resource.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: windResourceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WindResourceCard
            onDetail={handleClickDetail}
            windResource={data}
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
            subject: 'windresource'
          }
        }}
        fetchDataFunction={refetch}
        items={windResources || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default WindResourceList;
