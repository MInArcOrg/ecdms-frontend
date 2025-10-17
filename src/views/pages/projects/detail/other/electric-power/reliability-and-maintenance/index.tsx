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
import type { ReliabilityAndMaintenance } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import ReliabilityAndMaintenanceCard from './reliability-and-maintenance-card';
import ReliabilityAndMaintenanceDrawer from './reliability-and-maintenance-drawer';
import { reliabilityAndMaintenanceColumns } from './reliability-and-maintenance-row';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface ReliabilityAndMaintenanceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ReliabilityAndMaintenanceList: React.FC<ReliabilityAndMaintenanceListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ReliabilityAndMaintenance | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ['maintenance-frequencies'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model }
      })
  });

  // Create maps for quick lookup
  const maintenanceFrequencyMap = new Map(maintenanceFrequencies?.payload.map((item) => [item.id, item.title || '']) || []);

  const fetchReliabilityAndMaintenance = (params: GetRequestParam): Promise<IApiResponse<ReliabilityAndMaintenance[]>> => {
    return projectOtherApiSecondService<ReliabilityAndMaintenance>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: reliabilityAndMaintenanceItems,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ReliabilityAndMaintenance[]>({
    queryKey: ['reliabilityAndMaintenance'],
    fetchFunction: fetchReliabilityAndMaintenance
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ReliabilityAndMaintenance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ReliabilityAndMaintenance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (reliabilityAndMaintenance: ReliabilityAndMaintenance) => {
    toggleDrawer();
    setSelectedRow(reliabilityAndMaintenance);
  };

  const handleDelete = async (reliabilityAndMaintenanceId: string) => {
    await projectOtherApiSecondService<ReliabilityAndMaintenance>().delete(otherSubMenu?.apiRoute || '', reliabilityAndMaintenanceId);
    refetch();
  };

  const handleClickDetail = (reliabilityAndMaintenance: ReliabilityAndMaintenance) => {
    toggleDetailDrawer();
    setSelectedRow(reliabilityAndMaintenance);
  };

  const mapReliabilityAndMaintenanceToDetailItems = (
    reliabilityAndMaintenance: ReliabilityAndMaintenance
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.reliability-and-maintenance.details.maintenance-frequency'),
      value: reliabilityAndMaintenance?.maintenance_frequency_id
        ? maintenanceFrequencyMap.get(reliabilityAndMaintenance.maintenance_frequency_id) || 'N/A'
        : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.total-outage-duration'),
      value:
        reliabilityAndMaintenance?.total_outage_duration !== undefined
          ? `${reliabilityAndMaintenance.total_outage_duration} ${t('common.hours')}`
          : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.total-interruption-number'),
      value:
        reliabilityAndMaintenance?.total_interruption_number !== undefined
          ? reliabilityAndMaintenance.total_interruption_number.toString()
          : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.saidi'),
      value: reliabilityAndMaintenance?.saidi !== undefined ? reliabilityAndMaintenance.saidi.toString() : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.saifi'),
      value: reliabilityAndMaintenance?.saifi !== undefined ? reliabilityAndMaintenance.saifi.toString() : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.automatic-fault-detection'),
      value:
        reliabilityAndMaintenance?.automatic_fault_detection_restoration_system_installed !== undefined
          ? reliabilityAndMaintenance.automatic_fault_detection_restoration_system_installed
            ? t('common.yes')
            : t('common.no')
          : 'N/A'
    },
    {
      title: t('project.other.reliability-and-maintenance.details.remark'),
      value: reliabilityAndMaintenance?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: reliabilityAndMaintenance?.created_at ? formatCreatedAt(reliabilityAndMaintenance.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: reliabilityAndMaintenance?.updated_at ? formatCreatedAt(reliabilityAndMaintenance.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ReliabilityAndMaintenanceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          reliabilityAndMaintenance={selectedRow as ReliabilityAndMaintenance}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapReliabilityAndMaintenanceToDetailItems(selectedRow as ReliabilityAndMaintenance)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.reliabilityAndMaintenance}
          title={t('project.other.reliability-and-maintenance.reliability-and-maintenance-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.reliability-and-maintenance.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: reliabilityAndMaintenanceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, maintenanceFrequencyMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ReliabilityAndMaintenanceCard
            onDetail={handleClickDetail}
            reliabilityAndMaintenance={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            maintenanceFrequencyMap={maintenanceFrequencyMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'reliabilityandmaintenance'
          }
        }}
        fetchDataFunction={refetch}
        items={reliabilityAndMaintenanceItems || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ReliabilityAndMaintenanceList;
