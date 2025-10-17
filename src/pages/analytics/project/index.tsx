// ** MUI Imports
import Grid from '@mui/material/Grid';
import { Box, useMediaQuery } from '@mui/material';

// ** Hooks & Utilities
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';

// ** Third Party Imports
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** Custom Styles
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Layout Imports
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

// ** Chart & Component Imports
import ApexPolarChart from 'src/views/analytics/Charts/ApexPolarChart';
import GeneralTypeGrowthRate from 'src/views/analytics/Charts/General/GeneralTypeGrowthRate';
import ReginalDistributionBarChart from 'src/views/analytics/Charts/General/ReginalDistributionBarChart';
import GeneralCategoriesBarChart from 'src/views/analytics/Charts/GeneralCategories';
import GeneralSubCategories from 'src/views/analytics/General/SubCategories';
import TypeCardStat from 'src/views/analytics/General/TypeCards';

// ** API Services
import masterTypeApiService from 'src/services/master-data/master-type-service';

const CrmDashboard = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  // ✅ Fetch master types
  const { data: types, isLoading } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {}),
    enabled: true
  });

  // ✅ Example sub-category data
  const subCategories = [
    {
      progress: 67,
      percentage: '54.4%',
      title: 'Residence',
      progressColor: 'primary'
    },
    {
      progress: 40,
      percentage: '14.6%',
      title: 'Condominium',
      progressColor: 'success'
    },
    {
      progress: 30,
      percentage: '6.1%',
      title: 'Real Estate',
      progressColor: 'secondary'
    },
    {
      progress: 20,
      percentage: '8.0%',
      title: 'Cooperation',
      progressColor: 'info'
    }
  ];

  return (
    <ProjectAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          {/* ✅ Scrollable Type Cards */}
          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: '250px' }}>
              <PerfectScrollbar>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: desktop ? 'row' : 'column',
                    alignItems: desktop ? 'center' : 'flex-start',
                    gap: 2,
                    padding: 1
                  }}
                >
                  {isLoading ? (
                    <p>Loading types...</p>
                  ) : (
                    types?.payload?.map((type, index) => (
                      <TypeCardStat
                        key={type.id || index}
                        sx={{
                          width: desktop ? '210px' : '100%',
                          flexShrink: 0
                        }}
                        stats="24.67k"
                        chipText="+25.2%"
                        avatarColor="info"
                        chipColor="default"
                        title={type.title}
                        subtitle="Last week"
                        avatarIcon="tabler:chart-bar"
                      />
                    ))
                  )}
                </Box>
              </PerfectScrollbar>
            </Box>
          </Grid>

          {/* ✅ Growth Rate */}
          <Grid item xs={12} sm={8} lg={4}>
            <GeneralTypeGrowthRate title="Building Projects" />
          </Grid>

          {/* ✅ Polar Chart */}
          <Grid item xs={12} md={6} lg={4}>
            <ApexPolarChart labels={['Commercial', 'Residence', 'Mixed Use', 'Office', 'Health Center']} title="Building Projects" />
          </Grid>

          {/* ✅ Category Bar Chart */}
          <Grid item xs={12} lg={8}>
            <GeneralCategoriesBarChart
              series={[
                {
                  name: 'Commercial',
                  data: [90, 120, 55, 100, 80, 125, 175, 70, 88]
                },
                {
                  name: 'Residence',
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
                },
                {
                  name: 'Mixed Use',
                  data: [75, 90, 45, 60, 80, 100, 70, 95, 55]
                },
                {
                  name: 'Office',
                  data: [60, 85, 50, 65, 90, 105, 80, 120, 70]
                },
                {
                  name: 'Health Center',
                  data: [70, 95, 40, 55, 85, 110, 95, 115, 80]
                }
              ]}
            />
          </Grid>

          {/* ✅ Subcategories */}
          <Grid item xs={12} md={6} lg={4}>
            <GeneralSubCategories data={subCategories} />
          </Grid>

          {/* ✅ Regional Distribution */}
          <Grid item xs={12} md={6} lg={8}>
            <ReginalDistributionBarChart title="Condominium" />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </ProjectAnalyticsLayout>
  );
};

export default CrmDashboard;
