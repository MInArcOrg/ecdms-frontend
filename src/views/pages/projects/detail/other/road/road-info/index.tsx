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
import RoadInfoCard from './road-info-card';
import RoadInfoDrawer from './road-info-drawer';
import { RoadInfo } from 'src/types/project/other';
import { roadInfoColumns } from './road-info-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface RoadInfoListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const RoadInfoList: React.FC<RoadInfoListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RoadInfo | null>(null);
  const { t } = useTranslation();

  const fetchRoadInfos = (params: GetRequestParam): Promise<IApiResponse<RoadInfo[]>> => {
    return projectOtherApiService<RoadInfo>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: roadInfos,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RoadInfo[]>({
    queryKey: ['roadInfos'],
    fetchFunction: fetchRoadInfos
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RoadInfo);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RoadInfo);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (roadInfo: RoadInfo) => {
    toggleDrawer();
    setSelectedRow(roadInfo);
  };

  const handleDelete = async (roadInfoId: string) => {
    await projectOtherApiService<RoadInfo>().delete(model, roadInfoId);
    refetch();
  };

  const handleClickDetail = (roadInfo: RoadInfo) => {
    toggleDetailDrawer();
    setSelectedRow(roadInfo);
  };

  const mapRoadInfoToDetailItems = (roadInfo: RoadInfo): { title: string; value: string }[] => [
    { title: t('project.other.road-info.details.material'), value: roadInfo?.material || 'N/A' },
    { title: t('project.other.road-info.details.location-function'), value: roadInfo?.location_function || 'N/A' },
    { title: t('project.other.road-info.details.traffic-volume'), value: roadInfo?.traffic_volume?.toString() || 'N/A' },
    { title: t('project.other.road-info.details.traffic-type'), value: roadInfo?.traffic_type || 'N/A' },
    { title: t('project.other.road-info.details.economy'), value: roadInfo?.economy || 'N/A' },
    { title: t('project.other.road-info.details.rigidity'), value: roadInfo?.rigidity || 'N/A' },
    { title: t('project.other.road-info.details.topography'), value: roadInfo?.topography || 'N/A' },
    { title: t('common.table-columns.created-at'), value: roadInfo?.created_at ? formatCreatedAt(roadInfo.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: roadInfo?.updated_at ? formatCreatedAt(roadInfo.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <RoadInfoDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          roadInfo={selectedRow as RoadInfo}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRoadInfoToDetailItems(selectedRow as RoadInfo)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.roadInfo}
          title={t('project.other.road-info.road-info-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.road-info.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: roadInfoColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RoadInfoCard onDetail={handleClickDetail} roadInfo={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'roadinfo'
          }
        }}
        fetchDataFunction={refetch}
        items={roadInfos || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RoadInfoList;
