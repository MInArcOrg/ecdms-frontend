'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { Maintenance } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import MaintenanceCard from './maintenance-card';
import MaintenanceDrawer from './maintenance-drawer';
import { maintenanceColumns } from './maintenance-row';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface MaintenanceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MaintenanceList: React.FC<MaintenanceListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Maintenance | null>(null);
  const { t } = useTranslation();

  const fetchMaintenance = (params: GetRequestParam): Promise<IApiResponse<Maintenance[]>> => {
    return projectOtherApiSecondService<Maintenance>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: maintenanceList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Maintenance[]>({
    queryKey: ['maintenance'],
    fetchFunction: fetchMaintenance
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Maintenance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as Maintenance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (maintenance: Maintenance) => {
    toggleDrawer();
    setSelectedRow(maintenance);
  };

  const handleDelete = async (maintenanceId: string) => {
    await projectOtherApiSecondService<Maintenance>().delete(otherSubMenu?.apiRoute || '', maintenanceId);
    refetch();
  };

  const handleClickDetail = (maintenance: Maintenance) => {
    toggleDetailDrawer();
    setSelectedRow(maintenance);
  };

  const mapMaintenanceToDetailItems = (maintenance: Maintenance): { title: string; value: string | React.ReactNode }[] => [
    {
      title: t('project.other.maintenance.details.maintenance-frequency'),
      value: maintenance?.maintenance_frequency ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.maintenance.details.service-level-agreement'),
      value: maintenance?.service_level_agreement ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.maintenance.details.remark'),
      value: maintenance?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: maintenance?.created_at ? formatCreatedAt(maintenance.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: maintenance?.updated_at ? formatCreatedAt(maintenance.updated_at) : 'N/A'
    },
    {
      title: t('project.other.maintenance.file-types.maintenance-document'),
      value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.maintenance} />
    },
    {
      title: t('project.other.maintenance.file-types.infrastructure-image'),
      value: <FileDrawer id={selectedRow?.id || ''} type={uploadableProjectFileTypes.other.infrastructureImage} />
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MaintenanceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          maintenance={selectedRow as Maintenance}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaintenanceToDetailItems(selectedRow as Maintenance)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.maintenanceData}
          title={t('project.other.maintenance.maintenance-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.maintenance.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: maintenanceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MaintenanceCard onDetail={handleClickDetail} maintenance={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'maintenance'
          }
        }}
        fetchDataFunction={refetch}
        items={maintenanceList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MaintenanceList;
