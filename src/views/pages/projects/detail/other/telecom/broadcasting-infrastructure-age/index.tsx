'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import type { OtherMenuRoute } from 'src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { BroadcastingInfrastructureAge, BroadcastingInfrastructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BroadcastingInfrastructureAgeCard from './broadcasting-infrastructure-age-card';
import BroadcastingInfrastructureAgeDrawer from './broadcasting-infrastructure-age-drawer';
import { broadcastingInfrastructureAgeColumns } from './broadcasting-infrastructure-age-row';
import { useQuery } from '@tanstack/react-query';

interface BroadcastingInfrastructureAgeListProps {
  otherSubMenu?: OtherMenuRoute;
  typeId: string;
  projectId: string;
}

const BroadcastingInfrastructureAgeList: React.FC<BroadcastingInfrastructureAgeListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BroadcastingInfrastructureAge | null>(null);
  const { t } = useTranslation();

  // Fetch broadcasting infrastructures for dropdown
  const { data: broadcastingInfrastructures } = useQuery({
    queryKey: ['broadcasting-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<BroadcastingInfrastructure>().getAll('broadcasting-infrastructures', {
        filter: { project_id: projectId }
      })
  });

  // Create maps for quick lookup
  const broadcastingInfrastructureMap = new Map(
    broadcastingInfrastructures?.payload.map((infra) => [infra.id, infra.broadcasting_infrastructure_type_id]) || []
  );

  const fetchBroadcastingInfrastructureAges = (params: GetRequestParam): Promise<IApiResponse<BroadcastingInfrastructureAge[]>> => {
    return projectOtherApiSecondService<BroadcastingInfrastructureAge>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: broadcastingInfrastructureAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BroadcastingInfrastructureAge[]>({
    queryKey: ['broadcastingInfrastructureAges'],
    fetchFunction: fetchBroadcastingInfrastructureAges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructureAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructureAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (broadcastingInfrastructureAge: BroadcastingInfrastructureAge) => {
    toggleDrawer();
    setSelectedRow(broadcastingInfrastructureAge);
  };

  const handleDelete = async (broadcastingInfrastructureAgeId: string) => {
    await projectOtherApiSecondService<BroadcastingInfrastructureAge>().delete(
      otherSubMenu?.apiRoute || '',
      broadcastingInfrastructureAgeId
    );
    refetch();
  };

  const handleClickDetail = (broadcastingInfrastructureAge: BroadcastingInfrastructureAge) => {
    toggleDetailDrawer();
    setSelectedRow(broadcastingInfrastructureAge);
  };

  const mapBroadcastingInfrastructureAgeToDetailItems = (
    broadcastingInfrastructureAge: BroadcastingInfrastructureAge
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.broadcasting-infrastructure-age.details.broadcasting-infrastructure'),
      value:
        broadcastingInfrastructureMap.get(broadcastingInfrastructureAge?.broadcasting_infrastructure_id) ||
        broadcastingInfrastructureAge?.broadcasting_infrastructure_id ||
        'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.name'),
      value: broadcastingInfrastructureAge?.name || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.antennas'),
      value:
        broadcastingInfrastructureAge?.antennas !== undefined ? `${broadcastingInfrastructureAge.antennas} ${t('common.years')}` : 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.transmitters'),
      value:
        broadcastingInfrastructureAge?.transmitters !== undefined
          ? `${broadcastingInfrastructureAge.transmitters} ${t('common.years')}`
          : 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.towers'),
      value: broadcastingInfrastructureAge?.towers !== undefined ? `${broadcastingInfrastructureAge.towers} ${t('common.years')}` : 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.cables'),
      value: broadcastingInfrastructureAge?.cables !== undefined ? `${broadcastingInfrastructureAge.cables} ${t('common.years')}` : 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-age.details.others'),
      value: broadcastingInfrastructureAge?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: broadcastingInfrastructureAge?.created_at ? formatCreatedAt(broadcastingInfrastructureAge.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: broadcastingInfrastructureAge?.updated_at ? formatCreatedAt(broadcastingInfrastructureAge.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BroadcastingInfrastructureAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          broadcastingInfrastructureAge={selectedRow as BroadcastingInfrastructureAge}
          refetch={refetch}
          projectId={projectId}
          broadcastingInfrastructures={broadcastingInfrastructures?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBroadcastingInfrastructureAgeToDetailItems(selectedRow as BroadcastingInfrastructureAge)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.broadcastingInfrastructureAge}
          title={t('project.other.broadcasting-infrastructure-age.broadcasting-infrastructure-age-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.broadcasting-infrastructure-age.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: broadcastingInfrastructureAgeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            broadcastingInfrastructureMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BroadcastingInfrastructureAgeCard
            onDetail={handleClickDetail}
            broadcastingInfrastructureAge={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            broadcastingInfrastructureMap={broadcastingInfrastructureMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'broadcastinginfrastructureage'
          }
        }}
        fetchDataFunction={refetch}
        items={broadcastingInfrastructureAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BroadcastingInfrastructureAgeList;
