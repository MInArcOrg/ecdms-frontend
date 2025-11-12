import Grid from '@mui/material/Grid';
import { useState } from 'react';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

import { Typography } from '@mui/material';
import { MasterCategory, MasterSubCategory, MasterType } from 'src/types/master/master-types';
import GeneralTypeGrowthRate from 'src/views/analytics/Charts/General/GeneralTypeGrowthRate';
import ScrollableStatCards from 'src/views/analytics/Charts/General/ScrollableStatCards';
import ProjectVariousCategory from 'src/views/analytics/General/model-variouse-category';
import ProjectRegionalCategoryDistribution from 'src/views/analytics/General/project-regional-category-distribution';
import GeneralSubCategories from 'src/views/analytics/General/sub-categories';
import ProjectRegionalSubCategoryDistribution from 'src/views/analytics/General/project-regional-subcatagory-distribution';

const CrmDashboard = () => {
  const [selectedType, onTypeSelected] = useState<MasterType>({} as MasterType);
  const [selectedCategory, onCategorySelected] = useState<MasterCategory>({} as MasterCategory);
  const [selectedSubCategory, onSubCategorySelected] = useState<MasterSubCategory>({} as MasterSubCategory);



  return (
    <ProjectAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          {/* Scrollable Stat Cards */}
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              {selectedType?.title} Overview
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <ScrollableStatCards onSelect={onTypeSelected} model='project' />
          </Grid>

          {/* Growth Rate */}
          <Grid item xs={12} md={4}>
            <GeneralTypeGrowthRate selectedType={selectedType} />
          </Grid>

          {/* Polar Chart */}
          <Grid item xs={12} md={6}>
            <ProjectVariousCategory
              model='project'
              selectedType={selectedType}
            />
          </Grid>

          {/* Category Bar Chart */}
          <Grid item xs={12} md={6}>
            <ProjectRegionalCategoryDistribution
              selectedType={selectedType}
              model='project'
            />
          </Grid>

          {/* Subcategories */}
          <Grid item xs={12} md={4}>
            <GeneralSubCategories
              selectedType={selectedType}
              model="project"
              onSelectCategory={(category: any | null) => {
                onCategorySelected(category);
              }}
              onSelectSubCategory={(subcategory: any | null) => {
                onSubCategorySelected(subcategory);
              }}
            />

          </Grid>

          <Grid item xs={12} md={8}>
            <ProjectRegionalSubCategoryDistribution model='project' selectedSubCategory={selectedSubCategory} />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </ProjectAnalyticsLayout>
  );
};

export default CrmDashboard;
