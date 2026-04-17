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

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

const RESOURCE_REGIONS = [
  'Addis Ababa',
  'Oromia',
  'Amhara',
  'Tigray',
  'Somali',
  'Afar',
  'Dire Dawa',
  'Harari',
  'Sidama',
  'Central Ethiopia',
  'South Ethiopia',
  'Southwest Ethiopia',
  'Benishangul',
  'Gambella'
];

const getResourceProfile = (resourceTitle: string) => {
  const key = resourceTitle.toLowerCase();
  if (key.includes('cement')) return { baseMin: 900, baseMax: 1800, trendMin: 0.05, trendMax: 0.14, vol: 0.06 };
  if (key.includes('rebar') || key.includes('steel')) return { baseMin: 1400, baseMax: 2600, trendMin: 0.06, trendMax: 0.16, vol: 0.07 };
  if (key.includes('sand') || key.includes('aggregate') || key.includes('gravel')) return { baseMin: 250, baseMax: 650, trendMin: 0.04, trendMax: 0.12, vol: 0.08 };
  if (key.includes('diesel') || key.includes('fuel')) return { baseMin: 800, baseMax: 1600, trendMin: 0.06, trendMax: 0.18, vol: 0.1 };
  if (key.includes('cable') || key.includes('electrical')) return { baseMin: 600, baseMax: 1400, trendMin: 0.05, trendMax: 0.15, vol: 0.08 };
  return { baseMin: 500, baseMax: 1400, trendMin: 0.04, trendMax: 0.14, vol: 0.08 };
};

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
    { id: 'r-1', name: 'Cement (OPC 42.5)' },
    { id: 'r-2', name: 'Rebar (12mm)' },
    { id: 'r-3', name: 'Sand (River)' },
    { id: 'r-4', name: 'Diesel' },
    { id: 'r-5', name: 'Electrical Cable (LV)' },
    { id: 'r-6', name: 'Bricks & Blocks' },
    { id: 'r-7', name: 'Crushed Stone (Base Course)' },
    { id: 'r-8', name: 'Paint (Emulsion)' }
  ];

  const yearLabels = years.map((y) => Number(y.name));
  const resourceTitle = String(item?.title ?? item?.name ?? dummyResources[0].name);
  const profile = getResourceProfile(resourceTitle);
  const baseSeed = hashString(`${resourceTitle}:${baseYear?.name || ''}`);

  const dummyPriceIndex = {
    payload: {
      labels: yearLabels,
      data: RESOURCE_REGIONS.map((regionName, regionIndex) => {
        const rand = mulberry32(hashString(`${baseSeed}:${regionName}:${regionIndex}`));
        const base = profile.baseMin + rand() * (profile.baseMax - profile.baseMin);
        const trend = profile.trendMin + rand() * (profile.trendMax - profile.trendMin);
        const phase = rand() * Math.PI * 2;

        const series = yearLabels.map((_, i) => {
          const wave = Math.sin(i * 0.9 + phase) * profile.vol;
          const noise = (rand() - 0.5) * profile.vol;
          const factor = Math.max(0.7, 1 + wave + noise);
          const value = base * Math.pow(1 + trend, i) * factor * (0.92 + regionIndex * 0.005);
          return Math.max(0, Math.round(value));
        });

        return { label: regionName, data: series };
      })
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
