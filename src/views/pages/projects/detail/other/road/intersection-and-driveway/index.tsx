'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { IntersectionAndDriveway } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import IntersectionDrivewayCard from './intersection-and-driveway-card';
import IntersectionDrivewayDrawer from './intersection-and-driveway-drawer';
import { intersectionDrivewayColumns } from './intersection-and-driveway-row';

interface IntersectionDrivewayListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const IntersectionDrivewayList: React.FC<IntersectionDrivewayListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<IntersectionAndDriveway | null>(null);
  const { t } = useTranslation();

  const fetchIntersectionDriveways = (params: GetRequestParam): Promise<IApiResponse<IntersectionAndDriveway[]>> => {
    return projectOtherApiSecondService<IntersectionAndDriveway>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: intersectionDriveways,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<IntersectionAndDriveway[]>({
    queryKey: ['intersectionDriveways'],
    fetchFunction: fetchIntersectionDriveways
  });

  const toggleDrawer = () => {
    setSelectedRow({} as IntersectionAndDriveway);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as IntersectionAndDriveway);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (intersectionDriveway: IntersectionAndDriveway) => {
    toggleDrawer();
    setSelectedRow(intersectionDriveway);
  };

  const handleDelete = async (intersectionDrivewayId: string) => {
    await projectOtherApiSecondService<IntersectionAndDriveway>().delete(otherSubMenu?.apiRoute || '', intersectionDrivewayId);
    refetch();
  };

  const handleClickDetail = (intersectionDriveway: IntersectionAndDriveway) => {
    toggleDetailDrawer();
    setSelectedRow(intersectionDriveway);
  };

  const mapIntersectionDrivewayToDetailItems = (intersectionDriveway: IntersectionAndDriveway): { title: string; value: string }[] => [
    {
      title: t('project.other.intersection-driveway.details.name'),
      value: intersectionDriveway?.name || 'N/A'
    },
    {
      title: t('project.other.intersection-driveway.details.number-of-intersections'),
      value: intersectionDriveway?.number_of_intersections?.toString() || 'N/A'
    },
    {
      title: t('project.other.intersection-driveway.details.intersection-type'),
      value: intersectionDriveway?.intersection_type_id || 'N/A'
    },
    {
      title: t('project.other.intersection-driveway.details.driveway-access-point'),
      value: intersectionDriveway?.driveway_access_point_id || 'N/A'
    },
    {
      title: t('project.other.intersection-driveway.details.similar-for-all'),
      value: intersectionDriveway?.similar_for_all ? t('common.yes') : t('common.no')
    },
    {
      title: t('common.table-columns.created-at'),
      value: intersectionDriveway?.created_at ? formatCreatedAt(intersectionDriveway.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: intersectionDriveway?.updated_at ? formatCreatedAt(intersectionDriveway.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <IntersectionDrivewayDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          intersectionDriveway={selectedRow as IntersectionAndDriveway}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapIntersectionDrivewayToDetailItems(selectedRow as IntersectionAndDriveway)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.intersection-driveway.intersection-driveway-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.intersection-driveway.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: intersectionDrivewayColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <IntersectionDrivewayCard
            onDetail={handleClickDetail}
            intersectionDriveway={data}
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
            subject: 'intersectiondriveway'
          }
        }}
        fetchDataFunction={refetch}
        items={intersectionDriveways || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default IntersectionDrivewayList;
