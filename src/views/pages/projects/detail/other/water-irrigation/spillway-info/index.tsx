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
import SpillwayInfoCard from './spillway-info-card';
import SpillwayInfoDrawer from './spillway-info-drawer';
import { SpillwayInfo } from 'src/types/project/other';
import { spillwayInfoColumns } from './spillway-info-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface SpillwayInfoListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const SpillwayInfoList: React.FC<SpillwayInfoListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SpillwayInfo | null>(null);
  const { t } = useTranslation();

  const fetchSpillwayInfos = (params: GetRequestParam): Promise<IApiResponse<SpillwayInfo[]>> => {
    return projectOtherApiService<SpillwayInfo>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: spillwayInfos,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SpillwayInfo[]>({
    queryKey: ['spillwayInfos'],
    fetchFunction: fetchSpillwayInfos
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (spillwayInfo: SpillwayInfo) => {
    setSelectedRow(spillwayInfo);
    setShowDrawer(true);
  };

  const handleDelete = async (spillwayInfoId: string) => {
    await projectOtherApiService<SpillwayInfo>().delete(model, spillwayInfoId);
    refetch();
  };

  const handleClickDetail = (spillwayInfo: SpillwayInfo) => {
    setSelectedRow(spillwayInfo);
    setShowDetailDrawer(true);
  };

  const mapSpillwayInfoToDetailItems = (spillwayInfo: SpillwayInfo): { title: string; value: string }[] => [
    { title: t('project.other.spillway-info.details.name'), value: spillwayInfo.name || 'N/A' },
    { title: t('project.other.spillway-info.details.type'), value: spillwayInfo.type || 'N/A' },
    { title: t('project.other.spillway-info.details.quantity'), value: spillwayInfo.quantity?.toString() || 'N/A' },
    { title: t('project.other.spillway-info.details.specifications'), value: spillwayInfo.specifications || 'N/A' },
    { title: t('project.other.spillway-info.details.capacity'), value: spillwayInfo.capacity?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: spillwayInfo.created_at ? formatCreatedAt(spillwayInfo.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: spillwayInfo.updated_at ? formatCreatedAt(spillwayInfo.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <SpillwayInfoDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          spillwayInfo={selectedRow as SpillwayInfo}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSpillwayInfoToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.spillwayInfo}
          title={t('project.other.spillway-info.spillway-info-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.spillway-info.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: spillwayInfoColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SpillwayInfoCard
            onDetail={handleClickDetail}
            spillwayInfo={data}
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
            subject: 'spillwayInfo'
          }
        }}
        fetchDataFunction={refetch}
        items={spillwayInfos || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SpillwayInfoList;
