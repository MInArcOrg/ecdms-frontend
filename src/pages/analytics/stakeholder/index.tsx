// ** React Imports
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Box, Grid } from '@mui/material';

// ** Third-Party Imports
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useQuery } from '@tanstack/react-query';

// ** Custom Components
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import ApexPolarChart from 'src/views/analytics/Charts/ApexPolarChart';
import GeneralTypeGrowthRate from 'src/views/analytics/Charts/General/GeneralTypeGrowthRate';
import ReginalDistributionBarChart from 'src/views/analytics/Charts/General/ReginalDistributionBarChart';
import GeneralCategoriesBarChart from 'src/views/analytics/Charts/GeneralCategories';
import GeneralSubCategories from 'src/views/analytics/General/SubCategories';
import TypeCardStat from 'src/views/analytics/General/TypeCards';
import StakeholderAnalyticsLayout from 'src/views/analytics/layouts/StakeholderAnalyticsLayout';

// ** API Service
import masterTypeApiService from 'src/services/master-data/master-type-service';

const CrmDashboard = () => {
  // ** Fetch stakeholder types
  const { data: types, isLoading: stakeholderTypesLoading } = useQuery({
    queryKey: ['masterType', 'stakeholder'],
    queryFn: () => masterTypeApiService.getAll('stakeholder', {})
  });

  // ** Hooks
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  // ** Mock data for subcategories
  const subCategories = [
    { progress: 67, percentage: '54.4%', title: 'Level 1', progressColor: 'primary' },
    { progress: 40, percentage: '14.6%', title: 'Level 2', progressColor: 'success' },
    { progress: 30, percentage: '6.1%', title: 'Level 3', progressColor: 'secondary' },
    { progress: 20, percentage: '8.0%', title: 'Level 4', progressColor: 'info' }
  ];

  return (
    <StakeholderAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          {/* === Type Cards Row === */}
          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: 'auto' }}>
              <PerfectScrollbar>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: desktop ? 'row' : 'column',
                    alignItems: desktop ? 'center' : 'stretch',
                    gap: 2,
                    flexWrap: 'wrap'
                  }}
                >
                  {types?.payload?.map((type: any, index: number) =>
                    index ? (
                      <TypeCardStat
                        key={index}
                        sx={{ width: desktop ? 210 : '100%' }}
                        stats="24.67k"
                        chipText="+25.2%"
                        avatarColor="info"
                        chipColor="default"
                        title={type.title}
                        subtitle="Last week"
                        avatarIcon="tabler:chart-bar"
                      />
                    ) : null
                  )}
                </Box>
              </PerfectScrollbar>
            </Box>
          </Grid>

          {/* === Growth Rate Chart === */}
          <Grid item xs={12} sm={8} lg={4}>
            <GeneralTypeGrowthRate title="Suppliers" />
          </Grid>

          {/* === Polar Chart === */}
          <Grid item xs={12} md={6} lg={4}>
            <ApexPolarChart title="Suppliers" labels={['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']} />
          </Grid>

          {/* === Categories Bar Chart === */}
          <Grid item xs={12} lg={8}>
            <GeneralCategoriesBarChart
              series={[
                { name: 'Level 1', data: [90, 120, 55, 100, 80, 125, 175, 70, 88] },
                { name: 'Level 2', data: [85, 100, 30, 40, 95, 90, 30, 110, 62] },
                { name: 'Level 3', data: [60, 80, 45, 90, 70, 60, 55, 100, 72] },
                { name: 'Level 4', data: [40, 60, 35, 75, 50, 80, 45, 90, 60] },
                { name: 'Level 5', data: [30, 45, 25, 60, 40, 55, 35, 70, 50] }
              ]}
            />
          </Grid>

          {/* === Subcategories Progress === */}
          <Grid item xs={12} md={6} lg={4}>
            <GeneralSubCategories data={subCategories} />
          </Grid>

          {/* === Regional Distribution Chart === */}
          <Grid item xs={12} md={6} lg={8}>
            <ReginalDistributionBarChart title="Level 1" />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </StakeholderAnalyticsLayout>
  );
};

export default CrmDashboard;
