import Grid from '@mui/material/Grid';
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data';
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes';
import LocationCard from 'src/views/analytics/LocationCard';
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

function Location() {
  const {
    types,
    categories,
    activeType,
    setActiveType,
    activeCategory,
    setActiveCategory,
    isCategoryLoading
  } = useProjectTypeCategory('model')


  return (
    <ProjectAnalyticsLayout>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={3}>
          <ProjectTypes rawData={types || []} title="Types" maxHeight="100%" activeType={activeType} setActiveType={setActiveType} />
        </Grid>
        <Grid item xs={12} sm={9}>
          <LocationCard
            categories={categories}
            loading={isCategoryLoading}
            baseUrl={'/analytics/project-category-location-information'}
          />
        </Grid>
      </Grid>

    </ProjectAnalyticsLayout >
  );
}

export default Location;
