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
import type { RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RailwayTrackRehabilitationOrRenewalCard from './railway-track-rehabilitation-or-renewal-card';
import RailwayTrackRehabilitationOrRenewalDrawer from './railway-track-rehabilitation-or-renewal-drawer';
import { railwayTrackRehabilitationOrRenewalColumns } from './railway-track-rehabilitation-or-renewal-row';

interface RailwayTrackRehabilitationOrRenewalListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayTrackRehabilitationOrRenewalList: React.FC<RailwayTrackRehabilitationOrRenewalListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayTrackRehabilitationOrRenewal | null>(null);
  const { t } = useTranslation();

  const fetchRailwayTrackRehabilitationOrRenewal = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwayTrackRehabilitationOrRenewal[]>> => {
    return projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayTrackRehabilitationOrRenewalList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayTrackRehabilitationOrRenewal[]>({
    queryKey: ['railwayTrackRehabilitationOrRenewal'],
    fetchFunction: fetchRailwayTrackRehabilitationOrRenewal
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTrackRehabilitationOrRenewal);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTrackRehabilitationOrRenewal);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal) => {
    toggleDrawer();
    setSelectedRow(railwayTrackRehabilitationOrRenewal);
  };

  const handleDelete = async (railwayTrackRehabilitationOrRenewalId: string) => {
    await projectOtherApiSecondService<RailwayTrackRehabilitationOrRenewal>().delete(
      otherSubMenu?.apiRoute || '',
      railwayTrackRehabilitationOrRenewalId
    );
    refetch();
  };

  const handleClickDetail = (railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal) => {
    toggleDetailDrawer();
    setSelectedRow(railwayTrackRehabilitationOrRenewal);
  };

  const mapRailwayTrackRehabilitationOrRenewalToDetailItems = (
    railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.railway-track-rehabilitation-or-renewal.details.track-renewal-history'),
      value: railwayTrackRehabilitationOrRenewal?.track_renewal_history || 'N/A'
    },
    {
      title: t('project.other.railway-track-rehabilitation-or-renewal.details.plans-or-schedules'),
      value: railwayTrackRehabilitationOrRenewal?.plans_or_schedules || 'N/A'
    },
    {
      title: t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-methods-used-id'),
      value: railwayTrackRehabilitationOrRenewal?.rehabilitation_renewal_methods_used_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-types'),
      value: railwayTrackRehabilitationOrRenewal?.rehabilitation_renewal_types || 'N/A'
    },
    {
      title: t('project.other.railway-track-rehabilitation-or-renewal.details.remark'),
      value: railwayTrackRehabilitationOrRenewal?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: railwayTrackRehabilitationOrRenewal?.created_at ? formatCreatedAt(railwayTrackRehabilitationOrRenewal.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: railwayTrackRehabilitationOrRenewal?.updated_at ? formatCreatedAt(railwayTrackRehabilitationOrRenewal.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTrackRehabilitationOrRenewalDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayTrackRehabilitationOrRenewal={selectedRow as RailwayTrackRehabilitationOrRenewal}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayTrackRehabilitationOrRenewalToDetailItems(selectedRow as RailwayTrackRehabilitationOrRenewal)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.railway-track-rehabilitation-or-renewal.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-track-rehabilitation-or-renewal.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayTrackRehabilitationOrRenewalColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTrackRehabilitationOrRenewalCard
            onDetail={handleClickDetail}
            railwayTrackRehabilitationOrRenewal={data}
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
            subject: 'railwaytrackrehabilitationorrenewal'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayTrackRehabilitationOrRenewalList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTrackRehabilitationOrRenewalList;
