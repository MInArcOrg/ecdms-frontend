import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { MaintenanceHistory } from 'src/types/project/other';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MaintenanceHistoryCard from './maintenance-history-card';
import MaintenanceHistoryDrawer from './maintenance-history-drawer';
import { maintenanceHistoryColumns } from './maintenance-history-row';

interface MaintenanceHistoryListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const MaintenanceHistoryList: React.FC<MaintenanceHistoryListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MaintenanceHistory | null>(null);
  const { t } = useTranslation();

  const fetchMaintenanceHistorys = (params: GetRequestParam): Promise<IApiResponse<MaintenanceHistory[]>> => {
    return projectOtherApiSecondService<MaintenanceHistory>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: maintenanceHistorys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MaintenanceHistory[]>({
    queryKey: ['maintenanceHistorys'],
    fetchFunction: fetchMaintenanceHistorys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MaintenanceHistory);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MaintenanceHistory);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (maintenanceHistory: MaintenanceHistory) => {
    toggleDrawer();
    setSelectedRow(maintenanceHistory);
  };

  const handleDelete = async (maintenanceHistoryId: string) => {
    await projectOtherApiSecondService<MaintenanceHistory>().delete(otherSubMenu?.apiRoute || '', maintenanceHistoryId);
    refetch();
  };

  const handleClickDetail = (maintenanceHistory: MaintenanceHistory) => {
    toggleDetailDrawer();
    setSelectedRow(maintenanceHistory);
  };

  const mapMaintenanceHistoryToDetailItems = (maintenanceHistory: MaintenanceHistory): { title: string; value: string }[] => [
    {
      title: t('project.other.maintenance-history.details.road-segment'),
      value: maintenanceHistory?.road_segment || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.last-maintenance-date'),
      value: maintenanceHistory?.last_maintenance_date ? formatCreatedAt(maintenanceHistory.last_maintenance_date) : 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.maintenance-type'),
      value: maintenanceHistory?.maintenance_type_id || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.maintenance-cost'),
      value: maintenanceHistory?.maintenance_cost?.toString() || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.severity-level'),
      value: maintenanceHistory?.severity_level_id || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.suggested-repair'),
      value: maintenanceHistory?.suggested_repair_id || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.recommended-action-urgency'),
      value: maintenanceHistory?.recommended_action_urgency_id || 'N/A'
    },
    {
      title: t('project.other.maintenance-history.details.remark'),
      value: maintenanceHistory?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: maintenanceHistory?.created_at ? formatCreatedAt(maintenanceHistory.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: maintenanceHistory?.updated_at ? formatCreatedAt(maintenanceHistory.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MaintenanceHistoryDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          maintenanceHistory={selectedRow as MaintenanceHistory}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaintenanceHistoryToDetailItems(selectedRow as MaintenanceHistory)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.maintenanceHistory}
          title={t('project.other.maintenance-history.maintenance-history-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.maintenance-history.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: maintenanceHistoryColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MaintenanceHistoryCard
            onDetail={handleClickDetail}
            maintenanceHistory={data}
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
            subject: 'maintenancehistory'
          }
        }}
        fetchDataFunction={refetch}
        items={maintenanceHistorys || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MaintenanceHistoryList;
