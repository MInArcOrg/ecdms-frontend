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
import type { ElectricSmartMetersData, ElectricSmartMetersRatingsData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import ElectricSmartMetersRatingsDataCard from './electric-smart-meters-ratings-data-card';
import ElectricSmartMetersRatingsDataDrawer from './electric-smart-meters-ratings-data-drawer';
import { electricSmartMetersRatingsDataColumns } from './electric-smart-meters-ratings-data-row';

interface ElectricSmartMetersRatingsDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const ElectricSmartMetersRatingsDataList: React.FC<ElectricSmartMetersRatingsDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ElectricSmartMetersRatingsData | null>(null);
  const { t } = useTranslation();

  // Fetch electric smart meters data
  const { data: electricSmartMetersData } = useQuery({
    queryKey: ['electric-smart-meters-data', projectId],
    queryFn: () => projectOtherApiSecondService<ElectricSmartMetersData>().getAll('electric-smart-meters-data', {})
  });

  const fetchElectricSmartMetersRatingsData = (params: GetRequestParam): Promise<IApiResponse<ElectricSmartMetersRatingsData[]>> => {
    return projectOtherApiSecondService<ElectricSmartMetersRatingsData>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: electricSmartMetersRatingsData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ElectricSmartMetersRatingsData[]>({
    queryKey: ['electricSmartMetersRatingsData'],
    fetchFunction: fetchElectricSmartMetersRatingsData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersRatingsData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ElectricSmartMetersRatingsData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (electricSmartMetersRatingsData: ElectricSmartMetersRatingsData) => {
    toggleDrawer();
    setSelectedRow(electricSmartMetersRatingsData);
  };

  const handleDelete = async (electricSmartMetersRatingsDataId: string) => {
    await projectOtherApiSecondService<ElectricSmartMetersRatingsData>().delete(
      otherSubMenu?.apiRoute || '',
      electricSmartMetersRatingsDataId
    );
    refetch();
  };

  const handleClickDetail = (electricSmartMetersRatingsData: ElectricSmartMetersRatingsData) => {
    toggleDetailDrawer();
    setSelectedRow(electricSmartMetersRatingsData);
  };

  // Create map for dropdown values
  const electricSmartMetersDataMap = new Map(
    electricSmartMetersData?.payload.map((item: ElectricSmartMetersData) => [item.id, item.name || '']) || []
  );

  const mapElectricSmartMetersRatingsDataToDetailItems = (
    electricSmartMetersRatingsData: ElectricSmartMetersRatingsData
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.name'),
      value: electricSmartMetersRatingsData?.name || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.electric-smart-meters-data-id'),
      value: electricSmartMetersRatingsData?.electric_smart_meters_data_id
        ? electricSmartMetersDataMap.get(electricSmartMetersRatingsData.electric_smart_meters_data_id) ||
          electricSmartMetersRatingsData.electric_smart_meters_data_id
        : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.active-reactive'),
      value: electricSmartMetersRatingsData?.active_reactive || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.kwh-kvarh-rating'),
      value:
        electricSmartMetersRatingsData?.kwh_kvarh_rating !== undefined ? electricSmartMetersRatingsData.kwh_kvarh_rating.toString() : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.phase'),
      value: electricSmartMetersRatingsData?.phase || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.maximum-current-rating'),
      value:
        electricSmartMetersRatingsData?.maximum_current_rating !== undefined
          ? electricSmartMetersRatingsData.maximum_current_rating.toString()
          : 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.other'),
      value: electricSmartMetersRatingsData?.other || 'N/A'
    },
    {
      title: t('project.other.electric-smart-meters-ratings-data.details.remark'),
      value: electricSmartMetersRatingsData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: electricSmartMetersRatingsData?.created_at ? formatCreatedAt(electricSmartMetersRatingsData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: electricSmartMetersRatingsData?.updated_at ? formatCreatedAt(electricSmartMetersRatingsData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ElectricSmartMetersRatingsDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          electricSmartMetersRatingsData={selectedRow as ElectricSmartMetersRatingsData}
          refetch={refetch}
          projectId={projectId}
          electricSmartMetersData={electricSmartMetersData?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapElectricSmartMetersRatingsDataToDetailItems(selectedRow as ElectricSmartMetersRatingsData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electric_smart_meters_ratings_data}
          title={t('project.other.electric-smart-meters-ratings-data.electric-smart-meters-ratings-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.electric-smart-meters-ratings-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: electricSmartMetersRatingsDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            electricSmartMetersDataMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ElectricSmartMetersRatingsDataCard
            onDetail={handleClickDetail}
            electricSmartMetersRatingsData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            electricSmartMetersDataMap={electricSmartMetersDataMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'electricsmartmetersratingsdata'
          }
        }}
        fetchDataFunction={refetch}
        items={electricSmartMetersRatingsData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ElectricSmartMetersRatingsDataList;
