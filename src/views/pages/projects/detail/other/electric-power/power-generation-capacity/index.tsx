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
import type { PowerGenerationCapacity } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import PowerGenerationCapacityCard from './power-generation-capacity-card';
import PowerGenerationCapacityDrawer from './power-generation-capacity-drawer';
import { powerGenerationCapacityColumns } from './power-generation-capacity-row';

interface PowerGenerationCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const PowerGenerationCapacityList: React.FC<PowerGenerationCapacityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PowerGenerationCapacity | null>(null);
  const { t } = useTranslation();

  const fetchPowerGenerationCapacitys = (params: GetRequestParam): Promise<IApiResponse<PowerGenerationCapacity[]>> => {
    return projectOtherApiSecondService<PowerGenerationCapacity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: powerGenerationCapacitys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<PowerGenerationCapacity[]>({
    queryKey: ['powerGenerationCapacitys'],
    fetchFunction: fetchPowerGenerationCapacitys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as PowerGenerationCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as PowerGenerationCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (powerGenerationCapacity: PowerGenerationCapacity) => {
    toggleDrawer();
    setSelectedRow(powerGenerationCapacity);
  };

  const handleDelete = async (powerGenerationCapacityId: string) => {
    await projectOtherApiSecondService<PowerGenerationCapacity>().delete(otherSubMenu?.apiRoute || '', powerGenerationCapacityId);
    refetch();
  };

  const handleClickDetail = (powerGenerationCapacity: PowerGenerationCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(powerGenerationCapacity);
  };

  const mapPowerGenerationCapacityToDetailItems = (
    powerGenerationCapacity: PowerGenerationCapacity
  ): { title: string; value: string }[] => [
      {
        title: t('project.other.power-generation-capacity.details.capacity'),
        value: powerGenerationCapacity?.capacity !== undefined ? `${powerGenerationCapacity.capacity} MW` : 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.annual-generation'),
        value: powerGenerationCapacity?.annual_generation !== undefined ? `${powerGenerationCapacity.annual_generation} GWh` : 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.units-number'),
        value: powerGenerationCapacity?.units_number !== undefined ? `${powerGenerationCapacity.units_number}` : 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.owner'),
        value: powerGenerationCapacity?.owner_id || 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.commissioning-date'),
        value: powerGenerationCapacity?.commissioning_date ? formatCreatedAt(powerGenerationCapacity.commissioning_date) : 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.plant-life'),
        value: powerGenerationCapacity?.plant_life !== undefined ? `${powerGenerationCapacity.plant_life} ${t('common.years')}` : 'N/A'
      },
      {
        title: t('project.other.power-generation-capacity.details.others'),
        value: powerGenerationCapacity?.others || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: powerGenerationCapacity?.created_at ? formatCreatedAt(powerGenerationCapacity.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: powerGenerationCapacity?.updated_at ? formatCreatedAt(powerGenerationCapacity.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <PowerGenerationCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          powerGenerationCapacity={selectedRow as PowerGenerationCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPowerGenerationCapacityToDetailItems(selectedRow as PowerGenerationCapacity)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.powerGenerationCapacity}
          title={t('project.other.power-generation-capacity.power-generation-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.power-generation-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: powerGenerationCapacityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <PowerGenerationCapacityCard
            onDetail={handleClickDetail}
            powerGenerationCapacity={data}
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
            subject: 'powergenerationcapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={powerGenerationCapacitys || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default PowerGenerationCapacityList;
