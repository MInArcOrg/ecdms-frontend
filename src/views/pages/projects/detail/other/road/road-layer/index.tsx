import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RoadLayerCard from './road-layer-card';
import RoadLayerDrawer from './road-layer-drawer';
import { RoadLayer } from 'src/types/project/other';
import { roadLayerColumns } from './road-layer-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface RoadLayerListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const RoadLayerList: React.FC<RoadLayerListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RoadLayer | null>(null);
  const { t } = useTranslation();

  const fetchRoadLayers = (params: GetRequestParam): Promise<IApiResponse<RoadLayer[]>> => {
    return projectOtherApiService<RoadLayer>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };
  const {
    data: roadLayers,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RoadLayer[]>({
    queryKey: ['roadLayers'],
    fetchFunction: fetchRoadLayers
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadLayer: RoadLayer) => {
    setSelectedRow(roadLayer);
    setShowDrawer(true);
  };

  const handleDelete = async (roadLayerId: string) => {
    await projectOtherApiService<RoadLayer>().delete(model, roadLayerId);
    refetch();
  };

  const handleClickDetail = (roadLayer: RoadLayer) => {
    setSelectedRow(roadLayer);
    setShowDetailDrawer(true);
  };

  const mapRoadLayerToDetailItems = (roadLayer: RoadLayer): { title: string; value: string }[] => [
    { title: t('project.other.road-layer.details.segment'), value: roadLayer?.roadsegment?.name || 'N/A' },
    { title: t('project.other.road-layer.details.specifications'), value: roadLayer.specifications || 'N/A' },
    { title: t('project.other.road-layer.details.number'), value: roadLayer.number?.toString() || 'N/A' },
    { title: t('project.other.road-layer.details.thickness'), value: roadLayer.thickness?.toString() || 'N/A' },
    { title: t('project.other.road-layer.details.material'), value: roadLayer.material || 'N/A' },
    { title: t('project.other.road-layer.details.description'), value: roadLayer.description || 'N/A' },
    { title: t('common.table-columns.created-at'), value: roadLayer.created_at ? formatCreatedAt(roadLayer.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: roadLayer.updated_at ? formatCreatedAt(roadLayer.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadLayerDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          roadLayer={selectedRow as RoadLayer}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadLayerToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.roadLayer}
          title={t('project.other.road-layer.road-layer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.road-layer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadLayerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadLayerCard onDetail={handleClickDetail} roadLayer={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'roadlayer'
          }
        }}
        fetchDataFunction={refetch}
        items={roadLayers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadLayerList;
