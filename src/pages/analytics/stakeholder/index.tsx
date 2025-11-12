// ** React Imports
import { Grid, Typography } from '@mui/material';

// ** Third-Party Imports

// ** Custom Components
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import GeneralSubCategories from 'src/views/analytics/General/sub-categories';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

// ** API Service
import { useState } from 'react';
import { MasterCategory, MasterSubCategory, MasterType } from 'src/types/master/master-types';
import ScrollableStatCards from 'src/views/analytics/Charts/General/ScrollableStatCards';
import ModelVariousCategory from 'src/views/analytics/General/model-variouse-category';
import ModelRegionalCategoryDistribution from 'src/views/analytics/General/project-regional-category-distribution';
import ModelRegionalSubCategoryDistribution from 'src/views/analytics/General/project-regional-subcatagory-distribution';

const StakeholderAnlytics = () => {
  const [selectedType, onTypeSelected] = useState<MasterType>({} as MasterType);
  const [selectedCategory, onCategorySelected] = useState<MasterCategory>({} as MasterCategory);
  const [selectedSubCategory, onSubCategorySelected] = useState<MasterSubCategory>({} as MasterSubCategory);




  return (
    <StakeholderAnalyticsLayout>

      <ApexChartWrapper>
        <Grid container spacing={6}>
          {/* Scrollable Stat Cards */}
          <Grid item xs={12}>
            <Typography variant='subtitle1'>
              {selectedType?.title} Overview
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <ScrollableStatCards onSelect={onTypeSelected} model='stakeholder' />
          </Grid>

          {/* Polar Chart */}
          <Grid item xs={12} md={6}>
            <ModelVariousCategory
              model='stakeholder'
              selectedType={selectedType}
            />
          </Grid>

          {/* Category Bar Chart */}
          <Grid item xs={12} md={6}>
            <ModelRegionalCategoryDistribution
              selectedType={selectedType}
              model='stakeholder'
            />
          </Grid>
          {/* Subcategories */}
          <Grid item xs={12} md={4}>
            <GeneralSubCategories
              selectedType={selectedType}
              model="stakeholder"
              onSelectCategory={(category: any | null) => {
                onCategorySelected(category);
              }}
              onSelectSubCategory={(subcategory: any | null) => {
                onSubCategorySelected(subcategory);
              }}
            />

          </Grid>

          <Grid item xs={12} md={8}>
            <ModelRegionalSubCategoryDistribution model='stakeholder' selectedSubCategory={selectedSubCategory} />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </StakeholderAnalyticsLayout>
  );
};

export default StakeholderAnlytics;
