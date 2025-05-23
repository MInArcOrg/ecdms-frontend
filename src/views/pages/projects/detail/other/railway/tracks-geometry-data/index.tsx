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
import TracksGeometryDataCard from './tracks-geometry-data-card';
import TracksGeometryDataDrawer from './tracks-geometry-data-drawer';
import { TracksGeometryData } from 'src/types/project/other';
import { tracksGeometryDataColumns } from './tracks-geometry-data-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface TracksGeometryDataListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const TracksGeometryDataList: React.FC<TracksGeometryDataListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TracksGeometryData | null>(null);
  const { t } = useTranslation();

  const fetchTracksGeometryDatas = (params: GetRequestParam): Promise<IApiResponse<TracksGeometryData[]>> => {
    return projectOtherApiService<TracksGeometryData>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: tracksGeometryDatas,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TracksGeometryData[]>({
    queryKey: ['tracksGeometryDatas'],
    fetchFunction: fetchTracksGeometryDatas
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (tracksGeometryData: TracksGeometryData) => {
    setSelectedRow(tracksGeometryData);
    setShowDrawer(true);
  };

  const handleDelete = async (tracksGeometryDataId: string) => {
    await projectOtherApiService<TracksGeometryData>().delete(model, tracksGeometryDataId);
    refetch();
  };

  const handleClickDetail = (tracksGeometryData: TracksGeometryData) => {
    setSelectedRow(tracksGeometryData);
    setShowDetailDrawer(true);
  };

  const mapTracksGeometryDataToDetailItems = (tracksGeometryData: TracksGeometryData): { title: string; value: string }[] => [
    { title: t('project.other.railway-station.details.specifications'), value: tracksGeometryData.specifications || 'N/A' },
    { title: t('project.other.railway-station.details.northing'), value: tracksGeometryData.northing?.toString() || 'N/A' },
    { title: t('project.other.railway-station.details.easting'), value: tracksGeometryData.easting?.toString() || 'N/A' },
    { title: t('project.other.railway-station.details.revision-no'), value: tracksGeometryData.revision_no?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: tracksGeometryData.created_at ? formatCreatedAt(tracksGeometryData.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: tracksGeometryData.updated_at ? formatCreatedAt(tracksGeometryData.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <TracksGeometryDataDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          tracksGeometryData={selectedRow as TracksGeometryData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTracksGeometryDataToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.tracksGeometryData}
          title={t('project.other.railway-station.railway-station-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-station.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: tracksGeometryDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TracksGeometryDataCard
            onDetail={handleClickDetail}
            tracksGeometryData={data}
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
            subject: 'tracksGeometryData'
          }
        }}
        fetchDataFunction={refetch}
        items={tracksGeometryDatas || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TracksGeometryDataList;
