'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { RailwayCommunicationSystem } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayCommunicationSystemCard from './railway-communication-system-card';
import RailwayCommunicationSystemDrawer from './railway-communication-system-drawer';
import { railwayCommunicationSystemColumns } from './railway-communication-system-row';

interface RailwayCommunicationSystemListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayCommunicationSystemList: React.FC<RailwayCommunicationSystemListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayCommunicationSystem | null>(null);
  const { t } = useTranslation();

  const fetchRailwayCommunicationSystem = (params: GetRequestParam): Promise<IApiResponse<RailwayCommunicationSystem[]>> => {
    return projectOtherApiSecondService<RailwayCommunicationSystem>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayCommunicationSystems,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayCommunicationSystem[]>({
    queryKey: ['railwayCommunicationSystems'],
    fetchFunction: fetchRailwayCommunicationSystem
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystem);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayCommunicationSystem);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (communicationSystem: RailwayCommunicationSystem) => {
    toggleDrawer();
    setSelectedRow(communicationSystem);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayCommunicationSystem>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (communicationSystem: RailwayCommunicationSystem) => {
    toggleDetailDrawer();
    setSelectedRow(communicationSystem);
  };

  const mapRailwayCommunicationSystemToDetailItems = (
    communicationSystem: RailwayCommunicationSystem
  ): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: communicationSystem?.id || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.railway_line_section_name'),
      value: communicationSystem?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.communication_system_type'),
      value: communicationSystem?.communication_system_type || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.communication_system_protocols_or_standards'),
      value: communicationSystem?.communication_system_protocols_or_standards || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.communication_system_components'),
      value: communicationSystem?.communication_system_components || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.signaling_system_components'),
      value: communicationSystem?.signaling_system_components || 'N/A'
    },
    {
      title: t('project.other.railway-communication-system.details.remark'),
      value: communicationSystem?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: communicationSystem?.created_at ? formatCreatedAt(communicationSystem.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: communicationSystem?.updated_at ? formatCreatedAt(communicationSystem.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayCommunicationSystemDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayCommunicationSystem={selectedRow as RailwayCommunicationSystem}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayCommunicationSystemToDetailItems(selectedRow as RailwayCommunicationSystem)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.id || ''}
          title={t('project.other.railway-communication-system.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-communication-system.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayCommunicationSystemColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayCommunicationSystemCard
            onDetail={handleClickDetail}
            railwayCommunicationSystem={data as RailwayCommunicationSystem}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwaycommunicationsystem'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayCommunicationSystems || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayCommunicationSystemList;
