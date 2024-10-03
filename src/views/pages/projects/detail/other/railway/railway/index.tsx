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
import RailwayCard from './railway-card';
import RailwayDrawer from './railway-drawer';
import { Railway } from 'src/types/project/other';
import { railwayColumns } from './railway-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface RailwayListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const RailwayList: React.FC<RailwayListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Railway | null>(null);
  const { t } = useTranslation();

  const fetchRailways = (params: GetRequestParam): Promise<IApiResponse<Railway[]>> => {
    return projectOtherApiService<Railway>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railways,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Railway[]>({
    queryKey: ['railways'],
    fetchFunction: fetchRailways
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railway: Railway) => {
    setSelectedRow(railway);
    setShowDrawer(true);
  };

  const handleDelete = async (railwayId: string) => {
    await projectOtherApiService<Railway>().delete(model, railwayId);
    refetch();
  };

  const handleClickDetail = (railway: Railway) => {
    setSelectedRow(railway);
    setShowDetailDrawer(true);
  };

  const mapRailwayToDetailItems = (railway: Railway): { title: string; value: string }[] => [
    { title: t('project.other.railway.details.energy-source'), value: railway.energy_source || 'N/A' },
    { title: t('project.other.railway.details.major-operator'), value: railway.major_operator || 'N/A' },
    { title: t('project.other.railway.details.system-length'), value: railway.system_length?.toString() || 'N/A' },
    { title: t('project.other.railway.details.total-station-no'), value: railway.total_station_no?.toString() || 'N/A' },
    { title: t('project.other.railway.details.fright-cargo-no'), value: railway.fright_cargo_no?.toString() || 'N/A' },
    { title: t('project.other.railway.details.transport-cargo-no'), value: railway.transport_cargo_no?.toString() || 'N/A' },
    { title: t('common.table-columns.created-at'), value: railway.created_at ? formatCreatedAt(railway.created_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          railway={selectedRow as Railway}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.railway}
          title={t('project.other.railway.railways')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayCard onDetail={handleClickDetail} railway={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'railway'
          }
        }}
        fetchDataFunction={refetch}
        items={railways || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayList;
