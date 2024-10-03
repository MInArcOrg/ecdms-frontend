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
import RailwayStationCard from './railway-station-card';
import RailwayStationDrawer from './railway-station-drawer';
import { RailwayStation } from 'src/types/project/other';
import { railwayStationColumns } from './railway-station-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface RailwayStationListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const RailwayStationList: React.FC<RailwayStationListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayStation | null>(null);
  const { t } = useTranslation();

  const fetchRailwayStations = (params: GetRequestParam): Promise<IApiResponse<RailwayStation[]>> => {
    return projectOtherApiService<RailwayStation>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayStations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayStation[]>({
    queryKey: ['railwayStations'],
    fetchFunction: fetchRailwayStations
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayStation: RailwayStation) => {
    setSelectedRow(railwayStation);
    setShowDrawer(true);
  };

  const handleDelete = async (railwayStationId: string) => {
    await projectOtherApiService<RailwayStation>().delete(model, railwayStationId);
    refetch();
  };

  const handleClickDetail = (railwayStation: RailwayStation) => {
    setSelectedRow(railwayStation);
    setShowDetailDrawer(true);
  };

  const mapRailwayStationToDetailItems = (railwayStation: RailwayStation): { title: string; value: string }[] => [
    { title: t('project.other.railway-station.details.specifications'), value: railwayStation.specifications || 'N/A' },
    { title: t('project.other.railway-station.details.northing'), value: railwayStation.northing?.toString() || 'N/A' },
    { title: t('project.other.railway-station.details.easting'), value: railwayStation.easting?.toString() || 'N/A' },
    { title: t('project.other.railway-station.details.revision-no'), value: railwayStation.revision_no?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: railwayStation.created_at ? formatCreatedAt(railwayStation.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: railwayStation.updated_at ? formatCreatedAt(railwayStation.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayStationDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStation={selectedRow as RailwayStation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayStationToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.railwayStation}
          title={t('project.other.railway-station.railway-station-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-station.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayStationCard
            onDetail={handleClickDetail}
            railwayStation={data}
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
            subject: 'railwayStation'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayStations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationList;
