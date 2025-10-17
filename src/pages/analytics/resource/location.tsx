import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { formatCurrency } from 'src/utils/formatter/currency';
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes';
import LocationCard from 'src/views/analytics/LocationCard';
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout';

function Location() {
  const [types, setTypes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeType, setActiveType] = useState<any>(null);

  // -------------------- QUERIES --------------------
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'resource'],
    queryFn: () => masterTypeApiService.getAll('resource', {})
  });

  const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['masterCategory', 'resource', activeType?.id],
    queryFn: () =>
      masterCategoryApiService.getAll('resource', {
        filter: { resourcetype_id: activeType?.id }
      }),
    enabled: !!activeType
  });

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    if (!fetchedTypes?.payload?.length) return;

    const mapped = fetchedTypes.payload.map((type: any) => ({
      id: type.id,
      title: type.title,
      progress: Math.floor(Math.random() * 50),
      percentage: `${Math.floor(Math.random() * 50)}%`,
      progressColor: 'primary',
      amount: formatCurrency(Math.floor(Math.random() * 1_000_000)).toString()
    }));

    setTypes(mapped);
    if (!activeType) setActiveType(mapped[0]);
  }, [fetchedTypes]);

  useEffect(() => {
    if (!fetchedCategories?.payload?.length || !activeType) return;

    const mappedCategories = fetchedCategories.payload.map((category: any) => ({
      id: category.id,
      title: category.title,
      progress: Math.floor(Math.random() * 50),
      percentage: `${Math.floor(Math.random() * 50)}%`,
      progressColor: 'primary',
      amount: formatCurrency(Math.floor(Math.random() * 1_000_000)).toString()
    }));

    setCategories(mappedCategories);
  }, [activeType, fetchedCategories]);

  return (
    <ResourceAnalyticsLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={3}>
              <ProjectTypes data={types || []} title="Types" maxHeight="100%" activeType={activeType} setActiveType={setActiveType} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <LocationCard
                categories={categories}
                loading={isCategoryLoading}
                baseUrl={'/analytics/resource-category-location-information'}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ResourceAnalyticsLayout>
  );
}

export default Location;
