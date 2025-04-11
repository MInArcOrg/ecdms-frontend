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
import type { SatelliteInfrastructureAge, SatelliteNetwork } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import SatelliteInfrastructureAgeCard from './satellite-infrastructure-age-card';
import SatelliteInfrastructureAgeDrawer from './satellite-infrastructure-age-drawer';
import { satelliteInfrastructureAgeColumns } from './satellite-infrastructure-age-row';
import { useQuery } from '@tanstack/react-query';

interface SatelliteInfrastructureAgeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const SatelliteInfrastructureAgeList: React.FC<SatelliteInfrastructureAgeListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SatelliteInfrastructureAge | null>(null);
  const { t } = useTranslation();

  // Fetch satellite networks for dropdown
  const { data: satelliteNetworks } = useQuery({
    queryKey: ['satellite-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<SatelliteNetwork>().getAll('satellite-networks', {
        filter: { project_id: projectId }
      })
  });

  // Create maps for quick lookup
  const satelliteNetworkMap = new Map(satelliteNetworks?.payload.map((network) => [network.id, network.name]) || []);

  const fetchSatelliteInfrastructureAges = (params: GetRequestParam): Promise<IApiResponse<SatelliteInfrastructureAge[]>> => {
    return projectOtherApiSecondService<SatelliteInfrastructureAge>().getAll(otherSubMenu?.apiRoute || '', {
      ...params
    });
  };

  const {
    data: satelliteInfrastructureAges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SatelliteInfrastructureAge[]>({
    queryKey: ['satelliteInfrastructureAges'],
    fetchFunction: fetchSatelliteInfrastructureAges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SatelliteInfrastructureAge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SatelliteInfrastructureAge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (satelliteInfrastructureAge: SatelliteInfrastructureAge) => {
    toggleDrawer();
    setSelectedRow(satelliteInfrastructureAge);
  };

  const handleDelete = async (satelliteInfrastructureAgeId: string) => {
    await projectOtherApiSecondService<SatelliteInfrastructureAge>().delete(otherSubMenu?.apiRoute || '', satelliteInfrastructureAgeId);
    refetch();
  };

  const handleClickDetail = (satelliteInfrastructureAge: SatelliteInfrastructureAge) => {
    toggleDetailDrawer();
    setSelectedRow(satelliteInfrastructureAge);
  };

  const mapSatelliteInfrastructureAgeToDetailItems = (
    satelliteInfrastructureAge: SatelliteInfrastructureAge
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.satellite-infrastructure-age.details.satellite-network'),
        value:
          satelliteNetworkMap.get(satelliteInfrastructureAge?.satellite_network_id) ||
          satelliteInfrastructureAge?.satellite_network_id ||
          'N/A'
      },
      {
        title: t('project.other.satellite-infrastructure-age.details.satellite'),
        value: satelliteInfrastructureAge?.satellite?.toString() || 'N/A'
      },
      {
        title: t('project.other.satellite-infrastructure-age.details.ground-stations'),
        value: satelliteInfrastructureAge?.ground_stations?.toString() || 'N/A'
      },
      {
        title: t('project.other.satellite-infrastructure-age.details.modems'),
        value: satelliteInfrastructureAge?.modems?.toString() || 'N/A'
      },
      {
        title: t('project.other.satellite-infrastructure-age.details.routers'),
        value: satelliteInfrastructureAge?.routers?.toString() || 'N/A'
      },
      {
        title: t('project.other.satellite-infrastructure-age.details.others'),
        value: satelliteInfrastructureAge?.others || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: satelliteInfrastructureAge?.created_at ? formatCreatedAt(satelliteInfrastructureAge.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: satelliteInfrastructureAge?.updated_at ? formatCreatedAt(satelliteInfrastructureAge.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <SatelliteInfrastructureAgeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          satelliteInfrastructureAge={selectedRow as SatelliteInfrastructureAge}
          refetch={refetch}
          projectId={projectId}
          satelliteNetworks={satelliteNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSatelliteInfrastructureAgeToDetailItems(selectedRow as SatelliteInfrastructureAge)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.satelliteInfrastructureAge}
          title={t('project.other.satellite-infrastructure-age.satellite-infrastructure-age-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.satellite-infrastructure-age.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: satelliteInfrastructureAgeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, satelliteNetworkMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SatelliteInfrastructureAgeCard
            onDetail={handleClickDetail}
            satelliteInfrastructureAge={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            satelliteNetworkMap={satelliteNetworkMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'satelliteinfrastructureage'
          }
        }}
        fetchDataFunction={refetch}
        items={satelliteInfrastructureAges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SatelliteInfrastructureAgeList;
