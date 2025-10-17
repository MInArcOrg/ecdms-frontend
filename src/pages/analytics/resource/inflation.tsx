import { useState, useEffect } from 'react';
import { Box, Card, IconButton, Typography, useTheme } from '@mui/material';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { indexOf } from 'lodash';

import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';
import ResourceFilter from 'src/views/analytics/layouts/ResourceAnalyticsLayout/ResourceFilter';
import TableView from 'src/views/analytics/layouts/ResourceAnalyticsLayout/TableView';
import ChartView from 'src/views/analytics/layouts/ResourceAnalyticsLayout/ChartView';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import masterTypeApiService from 'src/services/master-data/master-type-service';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import departmentApiService from 'src/services/department/department-service';
import resourceApiService from 'src/services/resource/resource-service';
import { useAuth } from 'src/hooks/useAuth';

const years = Array.from({ length: 10 }, (_, i) => ({ id: i, name: (2021 + i).toString() }));

const Inflation = () => {
  const theme = useTheme();
  const whiteColor = '#fff';
  const lineChartYellow = '#d4e157';
  const lineChartPrimary = theme.palette.primary.main;
  const lineChartWarning = '#ff9800';
  const borderColor = theme.palette.divider;
  const labelColor = theme.palette.text.disabled;
  const legendColor = theme.palette.text.secondary;

  const [baseYear, setBaseYear] = useState(years[0]);
  const [type, setType] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [subCategory, setSubCategory] = useState<any>(null);
  const [subCategoryOptions, setSubcategoryOptions] = useState<any[]>([]);
  const [item, setItem] = useState<any>(null);
  const [tableView, setTableView] = useState(true);
  const [rows, setRows] = useState<any[]>([]);

  const [resourceParams, setResourceParams] = useState({ filter: {} });

  // --- Fetch resource types ---
  const { data: resourceTypes, isLoading: resourceTypesLoading } = useQuery({
    queryKey: ['masterType', 'resource'],
    queryFn: () => masterTypeApiService.getAll('resource', {})
  });

  // --- Fetch categories based on type ---
  const { data: categories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['categories', type?.id],
    queryFn: () =>
      masterCategoryApiService.getAll('resource', {
        filter: { resourcetype_id: type?.id }
      }),
    enabled: !!type?.id
  });

  // --- Fetch subcategories based on category ---
  const { data: subcategories, isLoading: isSubCategoryLoading } = useQuery({
    queryKey: ['subcategories', category?.id],
    queryFn: () =>
      masterSubCategoryApiService.getAll('resource', {
        filter: { resourcecategory_id: category?.id }
      }),
    enabled: !!category?.id
  });
  const { user } = useAuth();
  // --- Fetch departments ---
  const { data: labels } = useQuery({
    queryKey: ['departments'],
    queryFn: () => departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }), // Replace 1 with logged-in user id
    enabled: true
  });

  // --- Fetch resources ---
  const { data: resources, isLoading: resourceLoading } = useQuery({
    queryKey: ['resources', resourceParams],
    queryFn: () => resourceApiService.getAll(resourceParams)
  });

  useEffect(() => {
    setResourceParams({
      filter: {
        resourcetype_id: type?.id,
        resourcecategory_id: category?.id,
        resourcesubcategory_id: subCategory?.id
      }
    });
  }, [type?.id, category?.id, subCategory?.id]);

  const createData = (label: string, rest: number[]) => {
    const baseIndex = indexOf(years, baseYear);
    const data = rest.map((item) => Number((item / rest[baseIndex]) * 100).toFixed(0));
    return { label, ...data };
  };

  useEffect(() => {
    if (labels?.payload?.length) {
      setRows(labels?.payload?.map((region) => createData(region.name, [100, 120, 140, 150, 155, 160, 170, 175, 180, 180])) || []);
    }
  }, [labels, baseYear]);

  return (
    <ResourceAnalyticsLayout>
      <ResourceFilter
        inflation
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        item={item}
        setItem={setItem}
        resourceTypes={resourceTypes?.payload}
        resourceTypesLoading={resourceTypesLoading}
        resourceCategories={categories?.payload}
        isCategoryLoading={isCategoryLoading}
        resourceSubCategories={subcategories?.payload}
        isSubCategoryLoading={isSubCategoryLoading}
        subCategoryOptions={subCategoryOptions}
        setSubcategoryOptions={setSubcategoryOptions}
        baseYear={baseYear}
        setBaseYear={setBaseYear}
        loading={resourceLoading}
        resources={resources?.payload}
        years={years}
      />

      <Box display="flex" gap={2} my={3} alignItems="center">
        <IconButton color={tableView ? 'primary' : 'secondary'} onClick={() => setTableView(true)}>
          <Icon icon="mdi:table" />
          <Typography>Table</Typography>
        </IconButton>
        <IconButton color={!tableView ? 'primary' : 'secondary'} onClick={() => setTableView(false)}>
          <Icon icon="mdi:chart-bar" />
          <Typography>Graph</Typography>
        </IconButton>
      </Box>

      <Card>
        {tableView ? (
          <TableView years={years} baseYear={indexOf(years, baseYear)} regions={labels?.payload ?? []} data={rows} />
        ) : (
          <DatePickerWrapper>
            <ChartView years={years} regions={labels?.payload ?? []} baseYear={indexOf(years, baseYear)} inflation />
          </DatePickerWrapper>
        )}
      </Card>
    </ResourceAnalyticsLayout>
  );
};

export default Inflation;
