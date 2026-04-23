'use client';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { TelecomInfrastructureManufacturer, TelecomInfrastructureComponent } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TelecomInfrastructureManufacturerDrawer from './telecom-infrastructure-manufacturer-drawer';
import { telecomInfrastructureManufacturerColumns } from './telecom-infrastructure-manufacturer-row';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface TelecomInfrastructureManufacturerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TelecomInfrastructureManufacturerList: React.FC<TelecomInfrastructureManufacturerListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TelecomInfrastructureManufacturer | null>(null);
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
    queryKey: ['telecom-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<TelecomInfrastructureComponent>().getAll('telecom-infrastructures', {
        filter: { project_id: projectId }
      })
  });

  const telecomInfrastructureComponentMap = new Map(
    telecomInfrastructureComponents?.payload.map((item) => [
      item.id,
      mobileNetworkTypeMap.get(item.mobile_network_type_id) || 'N/A'
    ]) || []
  );

  const fetchTelecomInfrastructureManufacturer = (
    params: GetRequestParam
  ): Promise<IApiResponse<TelecomInfrastructureManufacturer[]>> => {
    return projectOtherApiSecondService<TelecomInfrastructureManufacturer>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };
  const {
    data: telecomInfrastructureManufacturerList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TelecomInfrastructureManufacturer[]>({
    queryKey: ['telecomInfrastructureManufacturer'],
    fetchFunction: fetchTelecomInfrastructureManufacturer
  });
  console.log('telecomInfrastructureManufacturerList', telecomInfrastructureManufacturerList)

  const toggleDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer) => {
    setSelectedRow(telecomInfrastructureManufacturer);
    setShowDrawer(true);
  };

  const handleDelete = async (telecomInfrastructureManufacturerId: string) => {
    await projectOtherApiSecondService<TelecomInfrastructureManufacturer>().delete(
      otherSubMenu?.apiRoute || '',
      telecomInfrastructureManufacturerId
    );
    refetch();
  };

  const handleClickDetail = (telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer) => {
    toggleDetailDrawer();
    setSelectedRow(telecomInfrastructureManufacturer);
  };

  const mapTelecomInfrastructureManufacturerToDetailItems = (
    telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer
  ): { title: string; value: string | React.ReactNode }[] => [
      {
        title: t('project.other.telecom-infrastructure.title'),
        value: telecomInfrastructureComponentMap.get(telecomInfrastructureManufacturer?.telecom_infrastructure_id) || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.cables'),
        value: telecomInfrastructureManufacturer?.cables || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.wires'),
        value: telecomInfrastructureManufacturer?.wires || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.routers'),
        value: telecomInfrastructureManufacturer?.routers || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.switches'),
        value: telecomInfrastructureManufacturer?.switches || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.hubs'),
        value: telecomInfrastructureManufacturer?.hubs || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.repeaters'),
        value: telecomInfrastructureManufacturer?.repeaters || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.antennas'),
        value: telecomInfrastructureManufacturer?.antennas || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.towers'),
        value: telecomInfrastructureManufacturer?.towers || 'N/A'
      },
      {
        title: t('project.other.telecom-infrastructure-manufacturer.details.remark'),
        value: telecomInfrastructureManufacturer?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: telecomInfrastructureManufacturer?.created_at
          ? formatCreatedAt(telecomInfrastructureManufacturer.created_at)
          : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: telecomInfrastructureManufacturer?.updated_at
          ? formatCreatedAt(telecomInfrastructureManufacturer.updated_at)
          : 'N/A'
      }
    ];

  return (
    <Box>
      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTelecomInfrastructureManufacturerToDetailItems(selectedRow as TelecomInfrastructureManufacturer)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.telecomInfrastructure}
          title={t('project.other.telecom-infrastructure-manufacturer.telecom-infrastructure-manufacturer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.telecom-infrastructure-manufacturer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={
          {
            headers: telecomInfrastructureManufacturerColumns(
              handleClickDetail,
              handleEdit,
              handleDelete,
              t,
              refetch,
              telecomInfrastructureComponentMap
            ),
          }
        }
        items={telecomInfrastructureManufacturerList || []}
        onPaginationChange={handlePageChange}
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
      />
      {
        showDrawer && <TelecomInfrastructureManufacturerDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          telecomInfrastructureManufacturer={selectedRow as TelecomInfrastructureManufacturer}
          projectId={projectId}
          otherSubMenu={otherSubMenu}
          telecomInfrastructureComponents={telecomInfrastructureComponents?.payload || []}
          mobileNetworkTypeMap={mobileNetworkTypeMap}
        />
      }

    </Box>
  );
};

export default TelecomInfrastructureManufacturerList;
