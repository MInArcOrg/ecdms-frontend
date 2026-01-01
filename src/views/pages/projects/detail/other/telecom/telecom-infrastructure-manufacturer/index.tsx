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
import type { TelecomInfrastructure, TelecomInfrastructureManufacturer } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TelecomInfrastructureManufacturerDrawer from './telecom-infrastructure-manufacturer-drawer';
import { telecomInfrastructureManufacturerColumns } from './telecom-infrastructure-manufacturer-row';

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

  const { data: telecomInfrastructures } = useQuery({
    queryKey: ['telecom-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiService<TelecomInfrastructure>().getAll('telecom_infrastructure', {
        filter: { project_id: projectId }
      })
  });

  const telecomInfrastructureMap = new Map(
    telecomInfrastructures?.payload.map((item) => [item.id, item.name || 'N/A']) || []
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

  const toggleDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TelecomInfrastructureManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer) => {
    toggleDrawer();
    setSelectedRow(telecomInfrastructureManufacturer);
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
      title: t('project.other.telecom-infrastructure-manufacturer.details.name'),
      value: telecomInfrastructureManufacturer?.name || 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure-manufacturer.details.country'),
      value: telecomInfrastructureManufacturer?.country || 'N/A'
    },
    {
      title: t('project.other.telecom-infrastructure-manufacturer.details.website'),
      value: telecomInfrastructureManufacturer?.website || 'N/A'
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
        type={ITEMS_LISTING_TYPE.table}
        isLoading={isLoading}
        columns={telecomInfrastructureManufacturerColumns(
          handleClickDetail,
          handleEdit,
          handleDelete,
          t,
          refetch,
          telecomInfrastructureMap
        )}
        data={telecomInfrastructureManufacturerList || []}
        onPageChange={handlePageChange}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true
        }}
        fetchDataFunction={refetch}
      />

      <TelecomInfrastructureManufacturerDrawer
        open={showDrawer}
        toggle={toggleDrawer}
        refetch={refetch}
        telecomInfrastructureManufacturer={selectedRow as TelecomInfrastructureManufacturer}
        projectId={projectId}
        otherSubMenu={otherSubMenu}
        telecomInfrastructures={telecomInfrastructures?.payload || []}
      />
    </Box>
  );
};

export default TelecomInfrastructureManufacturerList;
