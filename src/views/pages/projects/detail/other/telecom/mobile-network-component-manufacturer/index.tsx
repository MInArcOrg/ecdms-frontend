'use client';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { ManufacturerOfMobileNetworkComponent, TelecomInfrastructureComponent } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import ManufacturerOfMobileNetworkComponentDrawer from './mobile-network-component-manufacturer-drawer';
import { mobileNetworkComponentManufacturerColumns } from './mobile-network-component-manufacturer-row';

interface ManufacturerOfMobileNetworkComponentListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ManufacturerOfMobileNetworkComponentList: React.FC<ManufacturerOfMobileNetworkComponentListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ManufacturerOfMobileNetworkComponent | null>(null);
  const { t } = useTranslation();

  const { data: mobileNetworkTypes } = useQuery({
    queryKey: ['mobile-network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const mobileNetworkTypeMap = new Map(mobileNetworkTypes?.payload.map((item) => [item.id, item.title || 'N/A']) || []);

  const { data: telecomInfrastructureComponents } = useQuery({
    queryKey: ['mobile-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<TelecomInfrastructureComponent>().getAll('mobile-networks', {
        filter: { project_id: projectId }
      })
  });

  const telecomInfrastructureComponentMap = new Map(
    telecomInfrastructureComponents?.payload.map((item) => [
      item.id,
      item.name || mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
    ]) || []
  );

  const fetchManufacturerOfMobileNetworkComponent = (
    params: GetRequestParam
  ): Promise<IApiResponse<ManufacturerOfMobileNetworkComponent[]>> => {
    return projectOtherApiSecondService<ManufacturerOfMobileNetworkComponent>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };
  const {
    data: manufacturerOfMobileNetworkComponentList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ManufacturerOfMobileNetworkComponent[]>({
    queryKey: ['manufacturerOfMobileNetworkComponent'],
    fetchFunction: fetchManufacturerOfMobileNetworkComponent
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ManufacturerOfMobileNetworkComponent);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ManufacturerOfMobileNetworkComponent);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: ManufacturerOfMobileNetworkComponent) => {
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<ManufacturerOfMobileNetworkComponent>().delete(
      otherSubMenu?.apiRoute || '',
      id
    );
    refetch();
  };

  const handleClickDetail = (row: ManufacturerOfMobileNetworkComponent) => {
    toggleDetailDrawer();
    setSelectedRow(row);
  };

  const mapToDetailItems = (
    row: ManufacturerOfMobileNetworkComponent
  ): { title: string; value: string | React.ReactNode }[] => [
      {
        title: t('project.other.mobile-network-component-manufacturer.details.mobile_network_id'),
        value: telecomInfrastructureComponentMap.get(row.mobile_network_id) || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.cell'),
        value: row?.cell || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.towers'),
        value: row?.towers || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.antennas'),
        value: row?.antennas || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.base-stations'),
        value: row?.base_stations || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.repeaters'),
        value: row?.repeaters || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.switches'),
        value: row?.switches || 'N/A'
      },
      {
        title: t('project.other.mobile-network-component-manufacturer.details.others'),
        value: row?.others || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: row?.created_at
          ? formatCreatedAt(row.created_at)
          : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: row?.updated_at
          ? formatCreatedAt(row.updated_at)
          : 'N/A'
      }
    ];

  return (
    <Box>
      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as ManufacturerOfMobileNetworkComponent)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.telecomInfrastructure}
          title={t('project.other.mobile-network-component-manufacturer.mobile-network-component-manufacturer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.mobile-network-component-manufacturer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={
          {
            headers: mobileNetworkComponentManufacturerColumns(
              handleClickDetail,
              handleEdit,
              handleDelete,
              t,
              refetch,
              telecomInfrastructureComponentMap
            ),
          }
        }
        items={manufacturerOfMobileNetworkComponentList || []}
        onPaginationChange={handlePageChange}
        createActionConfig={{
          ...defaultCreateActionConfig,
          permission: {
            subject: otherSubMenu?.model || '',
            action: 'create'
          },
          onClick: toggleDrawer,
          onlyIcon: false
        }}
        fetchDataFunction={refetch}
      />
      {showDrawer && (

        <ManufacturerOfMobileNetworkComponentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          manufacturerOfMobileNetworkComponent={selectedRow as ManufacturerOfMobileNetworkComponent}
          projectId={projectId}
          otherSubMenu={otherSubMenu}
          telecomInfrastructureComponents={telecomInfrastructureComponents?.payload || []}
          mobileNetworkTypeMap={mobileNetworkTypeMap}
        />
      )}
    </Box>
  );
};

export default ManufacturerOfMobileNetworkComponentList;
