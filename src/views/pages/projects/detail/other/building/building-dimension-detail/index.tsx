import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { BuildingDimensionDetail } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BuildingDimensionDetailCard from './building-dimension-detail-card';
import BuildingDimensionDetailDrawer from './building-dimension-detail-drawer';
import { buldingDimensionDetailColumns } from './building-dimension-detail-row';

interface BuildingDimensionDetailListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const BuildingDimensionDetailList: React.FC<BuildingDimensionDetailListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BuildingDimensionDetail | null>(null);
  const { t } = useTranslation();

  const fetchBuildingDimensionDetails = (params: GetRequestParam): Promise<IApiResponse<BuildingDimensionDetail[]>> => {
    return projectOtherApiService<BuildingDimensionDetail>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: buildingDimensionDetails,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BuildingDimensionDetail[]>({
    queryKey: ['buildingDimensionDetails'],
    fetchFunction: fetchBuildingDimensionDetails
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BuildingDimensionDetail);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BuildingDimensionDetail);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (buildingDimensionDetail: BuildingDimensionDetail) => {
    toggleDrawer();
    setSelectedRow(buildingDimensionDetail);
  };

  const handleDelete = async (dimensionId: string) => {
    await projectOtherApiService<BuildingDimensionDetail>().delete(model, dimensionId);
    refetch();
  };

  const handleClickDetail = (buildingDimensionDetail: BuildingDimensionDetail) => {
    toggleDetailDrawer();
    setSelectedRow(buildingDimensionDetail);
  };

  const mapBuildingDimensionDetailToDetailItems = (
    buildingDimensionDetail: BuildingDimensionDetail
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.building-dimension-detail.details.site-area'),
      value: buildingDimensionDetail?.site_area ? `${buildingDimensionDetail?.site_area} sqm` : 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.site-above-sea-level'),
      value: buildingDimensionDetail?.site_above_sea_level?.toString() || 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.ground-floor-area'),
      value: buildingDimensionDetail?.ground_floor_area ? `${buildingDimensionDetail?.ground_floor_area} sqm` : 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.total-floor-area'),
      value: buildingDimensionDetail?.total_floor_area ? `${buildingDimensionDetail?.total_floor_area} sqm` : 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.basement-stories-no'),
      value: buildingDimensionDetail?.basement_stories_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.above-ground-floor-stories-no'),
      value: buildingDimensionDetail?.above_ground_floor_stories_no?.toString() || 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.height-above-natural-ground'),
      value: buildingDimensionDetail?.height_above_natural_ground ? `${buildingDimensionDetail?.height_above_natural_ground} m` : 'N/A'
    },
    {
      title: t('project.other.building-dimension-detail.details.depth-below-natural-ground'),
      value: buildingDimensionDetail?.depth_below_natural_ground ? `${buildingDimensionDetail?.depth_below_natural_ground} m` : 'N/A'
    },
    { title: t('project.other.building-dimension-detail.details.remark'), value: buildingDimensionDetail?.remark || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: buildingDimensionDetail?.created_at ? formatCreatedAt(buildingDimensionDetail?.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: buildingDimensionDetail?.updated_at ? formatCreatedAt(buildingDimensionDetail?.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BuildingDimensionDetailDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          buildingDimensionDetail={selectedRow as BuildingDimensionDetail}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBuildingDimensionDetailToDetailItems(selectedRow as BuildingDimensionDetail)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.buildingDimensionDetail}
          title={t('project.other.building-dimension-detail.building-dimension-detail-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.building-dimension-detail.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: buldingDimensionDetailColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BuildingDimensionDetailCard
            onDetail={handleClickDetail}
            buildingDimensionDetail={data}
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
            subject: 'buildingDimensionDetail'
          }
        }}
        fetchDataFunction={refetch}
        items={buildingDimensionDetails || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BuildingDimensionDetailList;
