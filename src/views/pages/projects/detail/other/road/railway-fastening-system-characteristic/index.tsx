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
import { RailwayFasteningSystemCharacteristic } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';

import RailwayFasteningSystemCharacteristicCard from './railway-fastening-system-characteristic-card';
import RailwayFasteningSystemCharacteristicDrawer from './railway-fastening-system-characteristic-drawer';
import { railwayFasteningSystemCharacteristicColumns } from './railway-fastening-system-characteristic-row';

interface RailwayFasteningSystemCharacteristicListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string; // Not directly used but kept for consistency with other list components
  projectId: string;
}

const RailwayFasteningSystemCharacteristicList: React.FC<RailwayFasteningSystemCharacteristicListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayFasteningSystemCharacteristic | null>(null);
  const { t } = useTranslation();

  const fetchRailwayFasteningSystemCharacteristic = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwayFasteningSystemCharacteristic[]>> => {
    return projectOtherApiSecondService<RailwayFasteningSystemCharacteristic>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwayFasteningSystemCharacteristic,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayFasteningSystemCharacteristic[]>({
    queryKey: ['railwayFasteningSystemCharacteristic'],
    fetchFunction: fetchRailwayFasteningSystemCharacteristic
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemCharacteristic); // Reset selected row for new creation
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemCharacteristic); // Reset selected row on detail close
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (characteristic: RailwayFasteningSystemCharacteristic) => {
    toggleDrawer();
    setSelectedRow(characteristic);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayFasteningSystemCharacteristic>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (characteristic: RailwayFasteningSystemCharacteristic) => {
    toggleDetailDrawer();
    setSelectedRow(characteristic);
  };

  const mapRailwayFasteningSystemCharacteristicToDetailItems = (
    characteristic: RailwayFasteningSystemCharacteristic
  ): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: characteristic?.id || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.railway_line_section_name'),
      value: characteristic?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.used_fastening_system_type'),
      value: characteristic?.used_fastening_system_type || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.fastening_system_manufacturer_supplier'),
      value: characteristic?.fastening_system_manufacturer_supplier || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.fastening_system_specifications'),
      value: characteristic?.fastening_system_specifications || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.rail_clips_or_clamps_details'),
      value: characteristic?.rail_clips_or_clamps_details || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.bolts_and_nuts_specifications'),
      value: characteristic?.bolts_and_nuts_specifications || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.other_fastening_system'),
      value: characteristic?.other_fastening_system || 'N/A'
    },
    {
      title: t('project.other.railway-fastening-system-characteristic.details.remark'),
      value: characteristic?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: characteristic?.created_at ? formatCreatedAt(characteristic.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: characteristic?.updated_at ? formatCreatedAt(characteristic.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayFasteningSystemCharacteristicDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayFasteningSystemCharacteristic={selectedRow as RailwayFasteningSystemCharacteristic}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayFasteningSystemCharacteristicToDetailItems(selectedRow as RailwayFasteningSystemCharacteristic)}
          hasReference={false} // Adjust if this entity has file references
          id={selectedRow?.id || ''} // Use 'id' for FileDrawer
          fileType={otherSubMenu?.fileType || ''} // No file type explicitly defined in the schema for this entity
          title={t('project.other.railway-fastening-system-characteristic.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-fastening-system-characteristic.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayFasteningSystemCharacteristicColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayFasteningSystemCharacteristicCard
            onDetail={handleClickDetail}
            railwayFasteningSystemCharacteristic={data as RailwayFasteningSystemCharacteristic}
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
            subject: 'railwayfasteningsystemcharacteristic' // Subject for permission control
          }
        }}
        fetchDataFunction={refetch}
        items={railwayFasteningSystemCharacteristic || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayFasteningSystemCharacteristicList;
