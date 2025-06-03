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
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RailwayTrackSafetyCard from './railway-track-safety-card';
import RailwayTrackSafetyDrawer from './railway-track-safety-drawer';
import { RailwayTrackSafety } from 'src/types/project/other';

interface RailwayTrackSafetyListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayTrackSafetyList: React.FC<RailwayTrackSafetyListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayTrackSafety | null>(null);
  const { t } = useTranslation();



  const fetchRailwayTrackSafety = (params: GetRequestParam): Promise<IApiResponse<RailwayTrackSafety[]>> => {
    return projectOtherApiSecondService<RailwayTrackSafety>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayTrackSafetyList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayTrackSafety[]>({
    queryKey: ['railwayTrackSafety'],
    fetchFunction: fetchRailwayTrackSafety
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTrackSafety);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTrackSafety);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayTrackSafety: RailwayTrackSafety) => {
    toggleDrawer();
    setSelectedRow(railwayTrackSafety);
  };

  const handleDelete = async (railwayTrackSafetyId: string) => {
    await projectOtherApiSecondService<RailwayTrackSafety>().delete(otherSubMenu?.apiRoute || '', railwayTrackSafetyId);
    refetch();
  };

  const handleClickDetail = (railwayTrackSafety: RailwayTrackSafety) => {
    toggleDetailDrawer();
    setSelectedRow(railwayTrackSafety);
  };

  const mapRailwayTrackSafetyToDetailItems = (
    railwayTrackSafety: RailwayTrackSafety
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.railway-track-safety.details.safety-assessment'),
        value: railwayTrackSafety?.safetyAssessment || 'N/A'
      },
      {
        title: t('project.other.railway-track-safety.details.inspection-date'),
        value: railwayTrackSafety?.inspectionDate || 'N/A'
      },
      {
        title: t('project.other.railway-track-safety.details.corrective-actions'),
        value: railwayTrackSafety?.correctiveActions || 'N/A'
      },
      {
        title: t('project.other.railway-track-safety.details.status'),
        value: railwayTrackSafety?.status || 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTrackSafetyDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayTrackSafety={selectedRow as RailwayTrackSafety}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayTrackSafetyToDetailItems(selectedRow as RailwayTrackSafety)}
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
          headers: railwayTrackSafetyColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTrackSafetyCard
            onDetail={handleClickDetail}
            railwayTrackSafety={data}
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
            subject: 'railwaytracksafety'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayTrackSafetyList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTrackSafetyList;
