'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { ProjectRoadSafetyFeature } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import RoadSafetyFeaturesCard from './road-safety-features-card';
import RoadSafetyFeaturesDrawer from './road-safety-features-drawer';
import { roadSafetyFeaturesColumns } from './road-safety-features-row';

interface RoadSafetyFeaturesListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RoadSafetyFeaturesList: React.FC<RoadSafetyFeaturesListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectRoadSafetyFeature | null>(null);
  const { t } = useTranslation();

  const fetchRoadSafetyFeatures = (params: GetRequestParam): Promise<IApiResponse<ProjectRoadSafetyFeature[]>> => {
    return projectOtherApiSecondService<ProjectRoadSafetyFeature>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    }); 
  };

  const {
    data: roadSafetyFeatures,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectRoadSafetyFeature[]>({
    queryKey: ['roadSafetyFeatures'],
    fetchFunction: fetchRoadSafetyFeatures
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectRoadSafetyFeature);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectRoadSafetyFeature);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadSafetyFeature: ProjectRoadSafetyFeature) => {
    toggleDrawer();
    setSelectedRow(roadSafetyFeature);
  };

  const handleDelete = async (roadSafetyFeatureId: string) => {
    await projectOtherApiSecondService<ProjectRoadSafetyFeature>().delete(otherSubMenu?.apiRoute || '', roadSafetyFeatureId);
    refetch();
  };

  const handleClickDetail = (roadSafetyFeature: ProjectRoadSafetyFeature) => {
    toggleDetailDrawer();
    setSelectedRow(roadSafetyFeature);
  };

  const mapToDetailItems = (row: ProjectRoadSafetyFeature): { title: string; value: any }[] => {
    const segmentName = row?.roadSegment?.name || row?.roadsegment?.name || row?.road_segment_id || 'N/A';
    const featureTitle =
      row?.roadSafetyFeature?.title || row?.roadsafetyfeature?.title || row?.road_safety_feature_id || 'N/A';

    return [
      { title: t('common.table-columns.id'), value: row?.id || 'N/A' },
      { title: t('project.other.road-safety-features.details.road-segment'), value: segmentName },
      { title: t('project.other.road-safety-features.details.road-safety-feature'), value: featureTitle },
      { title: t('project.other.road-safety-features.details.safety-feature-condition'), value: row?.safety_feature_condition || 'N/A' },
      { title: t('project.other.road-safety-features.details.description'), value: row?.description || 'N/A' },
      { title: t('common.table-columns.created-at'), value: row?.created_at ? formatCreatedAt(row.created_at as any) : 'N/A' },
      { title: t('common.table-columns.updated-at'), value: row?.updated_at ? formatCreatedAt(row.updated_at as any) : 'N/A' }
    ];
  };

  return (
    <Box>
      {showDrawer && (
        <RoadSafetyFeaturesDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          roadSafetyFeature={selectedRow as ProjectRoadSafetyFeature}
          refetch={refetch}
          projectId={projectId}
          typeId={typeId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as ProjectRoadSafetyFeature)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.road-safety-features.details.title')}
        />
      )}

      <ItemsListing
        title={t('project.other.road-safety-features.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadSafetyFeaturesColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadSafetyFeaturesCard onDetail={handleClickDetail} roadSafetyFeature={data} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'roadsafetyfeature'
          }
        }}
        fetchDataFunction={refetch}
        items={roadSafetyFeatures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadSafetyFeaturesList;
