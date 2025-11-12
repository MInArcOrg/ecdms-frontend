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

const years = Array.from({ length: 10 }, (_, i) => ({ id: i, name: (2021 + i).toString() }));

const InflationAnalytics = () => {
  const { user } = useAuth();
  const [item, setItem] = useState<any>(null);
  const [baseYear, setBaseYear] = useState(years[0]);
  const [tableView, setTableView] = useState(true);
  const [rows, setRows] = useState<any[]>([]);
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
    queryFn: () => resourceApiService.getAll(resourceParams)
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
    queryFn: () => resourceGeneralAnalyticsService.resourceInflation( item?.id, {}),
    enabled: !!item?.id
  });

  return (
    <ResourceAnalyticsLayout>
      <ResourceFilter
        type={activeType}
        setType={setActiveType}
        category={activeCategory}
        setCategory={setActiveCategory}
        subCategory={activeSubCategory}
        setSubCategory={setActiveSubCategory}
        item={item}
        setItem={setItem}
        resourceTypes={types}
        resourceTypesLoading={isTypeLoading}
        resourceCategories={categories}
        isCategoryLoading={isCategoryLoading}
        resourceSubCategories={subCategories}
        isSubCategoryLoading={isSubCategoryLoading}
        resources={resources?.payload}
        loading={resourceLoading}
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
            years={data?.payload?.labels?.map((year: number, index: number) => ({ id: index, name: year }))}
            baseYear={indexOf(years, baseYear)}
            data={data?.payload.data}
          />
        ) : (
          <DatePickerWrapper>
            <ChartView
              years={data?.payload?.labels?.map((year: number, index: number) => ({ id: index, name: year }))}
              baseYear={indexOf(years, baseYear)}
              data={data?.payload.data}
            />
          </DatePickerWrapper>
        )}
      </Card>
    </ResourceAnalyticsLayout>
  );
};

export default InflationAnalytics;
