'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import weatherConditionApiService from 'src/services/project/weather-condition-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import WeatherConditionCard from './project-weather-condition-card';
import WeatherConditionDrawer from './project-weather-condition-drawer';
import type { WeatherCondition } from 'src/types/project/weather-condition';
import { weatherConditionColumns } from './project-weather-condition-row';

interface WeatherConditionListProps {
  model: string;
  projectId: string;
  typeId: string;
}

const WeatherConditionList: React.FC<WeatherConditionListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<WeatherCondition | null>(null);
  const { t } = useTranslation();

  const fetchWeatherConditions = (params: GetRequestParam): Promise<IApiResponse<WeatherCondition[]>> => {
    return weatherConditionApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: weatherConditions,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<WeatherCondition[]>({
    queryKey: ['weatherConditions'],
    fetchFunction: fetchWeatherConditions
  });

  const toggleDrawer = () => {
    setSelectedRow({} as WeatherCondition);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as WeatherCondition);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (weatherCondition: WeatherCondition) => {
    toggleDrawer();
    setSelectedRow(weatherCondition);
  };

  const handleDelete = async (weatherConditionId: string) => {
    await weatherConditionApiService.delete(weatherConditionId);
    refetch();
  };

  const handleClickDetail = (weatherCondition: WeatherCondition) => {
    toggleDetailDrawer();
    setSelectedRow(weatherCondition);
  };

  const mapWeatherConditionToDetailItems = (weatherCondition: WeatherCondition): { title: string; value: string }[] => [
    { title: t('project.weather-condition.weather-type'), value: weatherCondition?.weather_type || 'N/A' },
    { title: t('project.weather-condition.description'), value: weatherCondition?.description || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: weatherCondition?.created_at ? formatCreatedAt(weatherCondition.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <WeatherConditionDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          weatherCondition={selectedRow as WeatherCondition}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapWeatherConditionToDetailItems(selectedRow as WeatherCondition)}
          id={selectedRow?.id || ''}
          hasReference={false}
          title={t('project.weather-condition.details')}
          fileType="weatherCondition"
        />
      )}

      <ItemsListing
        title={t('project.weather-condition.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: weatherConditionColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <WeatherConditionCard
            onDetail={handleClickDetail}
            weatherCondition={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'weathercondition'
          }
        }}
        fetchDataFunction={refetch}
        items={weatherConditions || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default WeatherConditionList;
