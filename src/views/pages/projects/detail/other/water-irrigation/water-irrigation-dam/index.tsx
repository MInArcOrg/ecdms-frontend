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
import WaterIrrigationDamCard from './water-irrigation-dam-card';
import WaterIrrigationDamDrawer from './water-irrigation-dam-drawer';
import { WaterIrrigationDam } from 'src/types/project/other';
import { waterIrrigationDamColumns } from './water-irrigation-dam-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface WaterIrrigationDamListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const WaterIrrigationDamList: React.FC<WaterIrrigationDamListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WaterIrrigationDam | null>(null);
  const { t } = useTranslation();

  const fetchWaterIrrigationDams = (params: GetRequestParam): Promise<IApiResponse<WaterIrrigationDam[]>> => {
    return projectOtherApiService<WaterIrrigationDam>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: waterIrrigationDams,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<WaterIrrigationDam[]>({
    queryKey: ['waterIrrigationDams'],
    fetchFunction: fetchWaterIrrigationDams
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (waterIrrigationDam: WaterIrrigationDam) => {
    setSelectedRow(waterIrrigationDam);
    setShowDrawer(true);
  };

  const handleDelete = async (waterIrrigationDamId: string) => {
    await projectOtherApiService<WaterIrrigationDam>().delete(model, waterIrrigationDamId);
    refetch();
  };

  const handleClickDetail = (waterIrrigationDam: WaterIrrigationDam) => {
    setSelectedRow(waterIrrigationDam);
    setShowDetailDrawer(true);
  };

  const mapWaterIrrigationDamToDetailItems = (waterIrrigationDam: WaterIrrigationDam): { title: string; value: string }[] => [
    { title: t('project.other.water-irrigation-dam.details.dam-volume'), value: waterIrrigationDam.dam_volume?.toString() || 'N/A' },
    {
      title: t('project.other.water-irrigation-dam.details.total-capacity'),
      value: waterIrrigationDam.total_capacity?.toString() || 'N/A'
    },
    {
      title: t('project.other.water-irrigation-dam.details.active-capacity'),
      value: waterIrrigationDam.active_capacity?.toString() || 'N/A'
    },
    {
      title: t('project.other.water-irrigation-dam.details.inactive-capacity'),
      value: waterIrrigationDam.inactive_capacity?.toString() || 'N/A'
    },
    {
      title: t('project.other.water-irrigation-dam.details.catchment-area'),
      value: waterIrrigationDam.catchment_area?.toString() || 'N/A'
    },
    { title: t('project.other.water-irrigation-dam.details.surface-area'), value: waterIrrigationDam.surface_area?.toString() || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: waterIrrigationDam.created_at ? formatCreatedAt(waterIrrigationDam.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: waterIrrigationDam.updated_at ? formatCreatedAt(waterIrrigationDam.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <WaterIrrigationDamDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          waterIrrigationDam={selectedRow as WaterIrrigationDam}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapWaterIrrigationDamToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.waterIrrigationDam}
          title={t('project.other.water-irrigation-dam.details.title')}
        />
      )}

      <ItemsListing
        title={t('project.other.water-irrigation-dam.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: waterIrrigationDamColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WaterIrrigationDamCard
            onDetail={handleClickDetail}
            waterIrrigationDam={data}
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
            subject: 'waterIrrigationDam'
          }
        }}
        fetchDataFunction={refetch}
        items={waterIrrigationDams || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default WaterIrrigationDamList;
