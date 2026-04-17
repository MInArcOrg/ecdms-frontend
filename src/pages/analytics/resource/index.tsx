// ResourceAnalytics.tsx
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { indexOf } from 'lodash';

import { useAuth } from 'src/hooks/useAuth';
import departmentApiService from 'src/services/department/department-service';
import resourceApiService from 'src/services/resource/resource-service';
import { defaultGetRequestParam } from 'src/types/requests';

import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';
import ResourceFilter from 'src/views/analytics/layouts/ResourceAnalyticsLayout/ResourceFilter';
import TableView from 'src/views/analytics/layouts/ResourceAnalyticsLayout/TableView';
import ChartView from 'src/views/analytics/layouts/ResourceAnalyticsLayout/ChartView';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import useModelTypeCategory from 'src/hooks/analytics/use-master-data';
import resourceGeneralAnalyticsService from 'src/services/analytics/resource/general';
import useLocalStorage from 'src/hooks/use-local-storage';
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants';

const years = Array.from({ length: 10 }, (_, i) => ({ id: i, name: (2021 + i).toString() }));

const ResourceAnalytics = () => {
  const { user } = useAuth();
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false);
  const [item, setItem] = useState<any>(null);
  const [baseYear, setBaseYear] = useState(years[0]);
  const [tableView, setTableView] = useState(true);
  const [resourceParams, setResourceParams] = useState(defaultGetRequestParam);

  const {
    types,
    categories,
    subCategories,
    activeType,
    setActiveType,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
    isTypeLoading,
    isCategoryLoading,
    isSubCategoryLoading
  } = useModelTypeCategory('resource');

  // Fetch resources based on selected type/category/subcategory
  const { data: resources, isLoading: resourceLoading } = useQuery({
    queryKey: ['resources', resourceParams],
    queryFn: () => resourceApiService.getAll(resourceParams),
    enabled: !!activeType?.id && !dummyEnabled
  });

  // Fetch department labels
  const { data: labels } = useQuery({
    queryKey: ['departments', user?.id],
    queryFn: () => departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }),
    enabled: !!user?.id && !dummyEnabled
  });

  // Update query params when selection changes
  useEffect(() => {
    setResourceParams({
      filter: {
        resourcetype_id: activeType?.id,
        resourcecategory_id: activeCategory?.id,
        resourcesubcategory_id: activeSubCategory?.id
      }
    });
  }, [activeType?.id, activeCategory?.id, activeSubCategory?.id]);
  const { data } = useQuery({
    queryKey: ['resource-price-index', item?.id],
    queryFn: () => resourceGeneralAnalyticsService.resourcePriceIndex(Number(baseYear.name), item?.id, {}),
    enabled: !!item?.id && !dummyEnabled
  });

  const dummyResources = [
    { id: 'r-1', name: 'Cement' },
    { id: 'r-2', name: 'Rebar' },
    { id: 'r-3', name: 'Sand' }
  ];

  const dummyPriceIndex = {
    payload: {
      labels: [2021, 2022, 2023, 2024, 2025],
      data: [{ name: 'Price Index', data: [100, 112, 121, 135, 148] }]
    }
  };

  const safeType = activeType?.id ? activeType : null;
  const safeCategory = activeCategory?.id ? activeCategory : null;
  const safeSubCategory = activeSubCategory?.id ? activeSubCategory : null;

  return (
    <ResourceAnalyticsLayout>
      <ResourceFilter
        type={safeType}
        setType={setActiveType}
        category={safeCategory}
        setCategory={setActiveCategory}
        subCategory={safeSubCategory}
        setSubCategory={setActiveSubCategory}
        item={item}
        setItem={setItem}
        resourceTypes={types}
        resourceTypesLoading={isTypeLoading}
        resourceCategories={categories}
        isCategoryLoading={isCategoryLoading}
        resourceSubCategories={subCategories}
        isSubCategoryLoading={isSubCategoryLoading}
        resources={dummyEnabled ? dummyResources : resources?.payload}
        loading={!dummyEnabled && resourceLoading}
        years={years}
        baseYear={baseYear}
        setBaseYear={setBaseYear}
      />

      <Box display="flex" gap={2} my={3} alignItems="center">
        <IconButton
          color={tableView ? 'primary' : 'secondary'}
          onClick={() => setTableView(true)}
          sx={{ display: 'flex', gap: 1 }}
        >
          <Icon icon="mdi:table" />
          <Typography>Table</Typography>
        </IconButton>

        <IconButton
          color={!tableView ? 'primary' : 'secondary'}
          onClick={() => setTableView(false)}
          sx={{ display: 'flex', gap: 1 }}
        >
          <Icon icon="mdi:chart-bar" />
          <Typography>Graph</Typography>
        </IconButton>
      </Box>

      <Card>
        {tableView ? (
          <TableView
            years={(dummyEnabled ? dummyPriceIndex : data)?.payload?.labels?.map((year: number, index: number) => ({ id: index, name: year }))}
            baseYear={indexOf(years, baseYear)}
            data={(dummyEnabled ? dummyPriceIndex : data)?.payload.data}
          />
        ) : (
          <DatePickerWrapper>
            <ChartView
              years={(dummyEnabled ? dummyPriceIndex : data)?.payload?.labels?.map((year: number, index: number) => ({ id: index, name: year }))}
              baseYear={indexOf(years, baseYear)}
              data={(dummyEnabled ? dummyPriceIndex : data)?.payload.data}
            />
          </DatePickerWrapper>
        )}
      </Card>
    </ResourceAnalyticsLayout>
  );
};

export default ResourceAnalytics;
