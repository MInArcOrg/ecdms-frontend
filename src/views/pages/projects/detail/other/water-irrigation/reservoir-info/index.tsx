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
import ReservoirInfoCard from './reservoir-info-card';
import ReservoirInfoDrawer from './reservoir-info-drawer';
import { ReservoirInfo } from 'src/types/project/other';
import { reservoirInfoColumns } from './reservoir-info-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface ReservoirInfoListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const ReservoirInfoList: React.FC<ReservoirInfoListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReservoirInfo | null>(null);
  const { t } = useTranslation();

  const fetchReservoirInfos = (params: GetRequestParam): Promise<IApiResponse<ReservoirInfo[]>> => {
    return projectOtherApiService<ReservoirInfo>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: reservoirInfos,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ReservoirInfo[]>({
    queryKey: ['reservoirInfos'],
    fetchFunction: fetchReservoirInfos
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (reservoirInfo: ReservoirInfo) => {
    setSelectedRow(reservoirInfo);
    setShowDrawer(true);
  };

  const handleDelete = async (reservoirInfoId: string) => {
    await projectOtherApiService<ReservoirInfo>().delete(model, reservoirInfoId);
    refetch();
  };

  const handleClickDetail = (reservoirInfo: ReservoirInfo) => {
    setSelectedRow(reservoirInfo);
    setShowDetailDrawer(true);
  };

  const mapReservoirInfoToDetailItems = (reservoirInfo: ReservoirInfo): { title: string; value: string }[] => [
    { title: t('project.other.reservoir-info.details.dam-volume'), value: reservoirInfo.dam_volume || 'N/A' },
    { title: t('project.other.reservoir-info.details.total-capacity'), value: reservoirInfo.total_capacity || 'N/A' },
    { title: t('project.other.reservoir-info.details.active-capacity'), value: reservoirInfo.active_capacity || 'N/A' },
    { title: t('project.other.reservoir-info.details.inactive-capacity'), value: reservoirInfo.inactive_capacity || 'N/A' },
    { title: t('project.other.reservoir-info.details.catchment-area'), value: reservoirInfo.catchment_area?.toString() || 'N/A' },
    { title: t('project.other.reservoir-info.details.surface-area'), value: reservoirInfo.surface_area?.toString() || 'N/A' },
    { title: t('project.other.reservoir-info.details.revision-no'), value: reservoirInfo.revision_no?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: reservoirInfo.created_at ? formatCreatedAt(reservoirInfo.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: reservoirInfo.updated_at ? formatCreatedAt(reservoirInfo.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <ReservoirInfoDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          reservoirInfo={selectedRow as ReservoirInfo}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapReservoirInfoToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.reservoirInfo}
          title={t('project.other.reservoir-info.reservoir-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.reservoir-info.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: reservoirInfoColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ReservoirInfoCard
            onDetail={handleClickDetail}
            reservoirInfo={data}
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
            subject: 'reservoirInfo'
          }
        }}
        fetchDataFunction={refetch}
        items={reservoirInfos || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ReservoirInfoList;
