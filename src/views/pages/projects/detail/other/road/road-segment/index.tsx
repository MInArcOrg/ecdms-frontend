'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { RoadSegment } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RoadSegmentCard from './road-segment-card';
import RoadSegmentDrawer from './road-segment-drawer';
import { roadSegmentColumns } from './road-segment-row';
import { useQuery } from '@tanstack/react-query';
import surfaceTypeMasterService from 'src/services/general/project/surface-type-master-service';
import designStandardMasterService from 'src/services/general/project/design-standard-master-service';

interface RoadSegmentListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const RoadSegmentList: React.FC<RoadSegmentListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RoadSegment | null>(null);
  const { t } = useTranslation();

  // Fetch master data for lookups
  const { data: surfaceTypes } = useQuery({
    queryKey: ['masterCategory', 'surfaceTypes'],
    queryFn: () => surfaceTypeMasterService.getAll({})
  });

  const { data: designStandardTypes } = useQuery({
    queryKey: ['masterCategory', 'designStandards'],
    queryFn: () => designStandardMasterService.getAll({})
  });

  // Create lookup maps
  const surfaceTypeMap = new Map();
  const designStandardMap = new Map();

  if (surfaceTypes?.payload) {
    surfaceTypes.payload.forEach((type) => {
      surfaceTypeMap.set(type.id, type.title);
    });
  }

  if (designStandardTypes?.payload) {
    designStandardTypes.payload.forEach((standard) => {
      designStandardMap.set(standard.id, standard.title);
    });
  }

  const fetchRoadSegments = (params: GetRequestParam): Promise<IApiResponse<RoadSegment[]>> => {
    return projectOtherApiService<RoadSegment>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: roadSegments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RoadSegment[]>({
    queryKey: ['roadSegments'],
    fetchFunction: fetchRoadSegments
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadSegment: RoadSegment) => {
    setSelectedRow(roadSegment);
    setShowDrawer(true);
  };

  const handleDelete = async (roadSegmentId: string) => {
    await projectOtherApiService<RoadSegment>().delete(model, roadSegmentId);
    refetch();
  };

  const handleClickDetail = (roadSegment: RoadSegment) => {
    setSelectedRow(roadSegment);
    setShowDetailDrawer(true);
  };

  const mapRoadSegmentToDetailItems = (roadSegment: RoadSegment): { title: string; value: string }[] => [
    { title: t('project.other.road-segment.details.name'), value: roadSegment?.name || 'N/A' },
    {
      title: t('project.other.road-segment.details.surface-type-id'),
      value: surfaceTypeMap.get(roadSegment?.surface_type_id) || 'N/A'
    },
    {
      title: t('project.other.road-segment.details.start-northing'),
      value: roadSegment?.start_northing?.toString() || 'N/A'
    },
    {
      title: t('project.other.road-segment.details.start-easting'),
      value: roadSegment?.start_easting?.toString() || 'N/A'
    },
    {
      title: t('project.other.road-segment.details.end-northing'),
      value: roadSegment?.end_northing?.toString() || 'N/A'
    },
    {
      title: t('project.other.road-segment.details.end-easting'),
      value: roadSegment?.end_easting?.toString() || 'N/A'
    },
    {
      title: t('project.other.road-segment.details.design-standard-id'),
      value: designStandardMap.get(roadSegment?.design_standard_id) || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: roadSegment?.created_at ? formatCreatedAt(roadSegment.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: roadSegment?.updated_at ? formatCreatedAt(roadSegment.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadSegmentDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          roadSegment={selectedRow as RoadSegment}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadSegmentToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.roadSegment}
          title={t('project.other.road-segment.road-segment-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.road-segment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadSegmentColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, surfaceTypeMap, designStandardMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadSegmentCard onDetail={handleClickDetail} roadSegment={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'roadsegment'
          }
        }}
        fetchDataFunction={refetch}
        items={roadSegments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadSegmentList;
