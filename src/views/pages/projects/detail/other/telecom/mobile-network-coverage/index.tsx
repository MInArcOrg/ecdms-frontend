'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { MobileNetwork, MobileNetworkCoverage } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MobileNetworkCoverageCard from './mobile-network-coverage-card';
import MobileNetworkCoverageDrawer from './mobile-network-coverage-drawer';
import { mobileNetworkCoverageColumns } from './mobile-network-coverage-row';

interface MobileNetworkCoverageListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MobileNetworkCoverageList: React.FC<MobileNetworkCoverageListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MobileNetworkCoverage | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const { data: mobileNetworks } = useQuery({
    queryKey: ['mobile-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<MobileNetwork>().getAll('mobile-networks', {
        filter: { project_id: projectId }
      })
  });

  // Create maps for quick lookup
  const networkTypeMap = new Map(networkTypes?.payload.map((item) => [item.id, item.title || '']) || []);
  const mobileNetworkMap = new Map(
    mobileNetworks?.payload.map((item) => [
      item.id,
      item.name || 'N/A'
    ]) || []
  );

  const fetchMobileNetworkCoverages = (params: GetRequestParam): Promise<IApiResponse<MobileNetworkCoverage[]>> => {
    return projectOtherApiSecondService<MobileNetworkCoverage>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: mobileNetworkCoverages,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MobileNetworkCoverage[]>({
    queryKey: ['mobileNetworkCoverages'],
    fetchFunction: fetchMobileNetworkCoverages
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MobileNetworkCoverage);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MobileNetworkCoverage);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (mobileNetworkCoverage: MobileNetworkCoverage) => {
    toggleDrawer();
    setSelectedRow(mobileNetworkCoverage);
  };

  const handleDelete = async (mobileNetworkCoverageId: string) => {
    await projectOtherApiSecondService<MobileNetworkCoverage>().delete(otherSubMenu?.apiRoute || '', mobileNetworkCoverageId);
    refetch();
  };

  const handleClickDetail = (mobileNetworkCoverage: MobileNetworkCoverage) => {
    toggleDetailDrawer();
    setSelectedRow(mobileNetworkCoverage);
  };

  const mapMobileNetworkCoverageToDetailItems = (mobileNetworkCoverage: MobileNetworkCoverage): { title: string; value: string }[] => [
    {
      title: t('project.other.mobile-network.title'),
      value: mobileNetworkMap.get(mobileNetworkCoverage?.mobile_network_id) || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.network-infrastructure-type'),
      value: networkTypeMap.get(mobileNetworkCoverage?.network_infrastructure_type_id) || mobileNetworkCoverage?.network_infrastructure_type_id || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.total-coverage-area'),
      value: mobileNetworkCoverage?.total_coverage_area?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.coverage-population-number'),
      value: mobileNetworkCoverage?.coverage_population_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.active-users-number'),
      value: mobileNetworkCoverage?.active_users_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.average-download-speed'),
      value: mobileNetworkCoverage?.average_download_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.average-upload-speed'),
      value: mobileNetworkCoverage?.average_upload_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.signal-strength'),
      value: mobileNetworkCoverage?.signal_strength?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-coverage.details.others'),
      value: mobileNetworkCoverage?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: mobileNetworkCoverage?.created_at ? formatCreatedAt(mobileNetworkCoverage.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: mobileNetworkCoverage?.updated_at ? formatCreatedAt(mobileNetworkCoverage.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MobileNetworkCoverageDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          mobileNetworkCoverage={selectedRow as MobileNetworkCoverage}
          refetch={refetch}
          projectId={projectId}
          mobileNetworks={mobileNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMobileNetworkCoverageToDetailItems(selectedRow as MobileNetworkCoverage)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.networkCoverage}
          title={t('project.other.network-coverage.network-coverage-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.network-coverage.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: mobileNetworkCoverageColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
            mobileNetworkMap,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MobileNetworkCoverageCard
            onDetail={handleClickDetail}
            mobileNetworkCoverage={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
            mobileNetworkMap={mobileNetworkMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || ''
          }
        }}
        fetchDataFunction={refetch}
        items={mobileNetworkCoverages || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MobileNetworkCoverageList;
