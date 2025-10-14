// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports

// ** Custom Component Imports
import { useTheme } from '@mui/material/styles'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import ApexPolarChart from 'src/views/analytics/Charts/ApexPolarChart'
import GeneralTypeGrowthRate from 'src/views/analytics/Charts/General/GeneralTypeGrowthRate GeneralTypeGrowthRate'
import ReginalDistributionBarChart from 'src/views/analytics/Charts/General/ReginalDistributionBarChart'
import GeneralCategoriesBarChart from 'src/views/analytics/Charts/GeneralCategories'
import GeneralSubCategories from 'src/views/analytics/General/SubCategories'
import TypeCardStat from 'src/views/analytics/General/TypeCards'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import { Box, useMediaQuery } from '@mui/material'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useQuery } from '@tanstack/react-query'
import masterTypeApiService from 'src/services/master-data/master-type-service'

const CrmDashboard = () => {

  const theme = useTheme()

  const desktop = useMediaQuery(theme.breakpoints.up('md'))
  const {
    data: types,
    isLoading,
    refetch,
  } = useQuery(
    {
      queryKey: ['masterType', 'project'],
      enabled: true,
      queryFn: () => masterTypeApiService.getAll('project', {}),
    }
  );
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
      title: 'Condeminuim',
      progressColor: 'success'
    },
    {
      progress: 30,
      percentage: '6.1%',
      title: 'Realstate',
      progressColor: 'secondary'
    },
    {
      progress: 20,
      percentage: '8.0%',
      title: 'Cooperation',
      progressColor: 'info'
    }
  ]

  return (
    <ProjectAnalyticsLayout>
      <ApexChartWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8} spacing={6}>
            <div style={{ width: '100%', height: '250px' }}>
              <PerfectScrollbar options={{}}>
                <Box
                  sx={
                    desktop
                      ? {
                        display: 'flex',
                        flexDirection: 'row', // horizontal stacking
                        alignItems: 'center', // vertical centering
                        gap: '20px' // gap between components
                      }
                      : {
                        display: 'flex',
                        flexDirection: 'column', // vertical stacking
                        gap: '20px' // gap between components
                      }
                  }
                  container
                  direction='row'
                  spacing={6}
                >
                  {types?.payload.map((type, index) => {
                    return index ? (
                      <div key={index}>
                        <TypeCardStat
                          sx={{
                            width: desktop ? '210px' : '100%'
                          }}
                          stats='24.67k'
                          chipText='+25.2%'
                          avatarColor='info'
                          chipColor='default'
                          title={type.title}
                          subtitle='Last week'
                          avatarIcon='tabler:chart-bar'
                        />
                      </div>
                    ) : null
                  })}
                </Box>
              </PerfectScrollbar>
            </div>
          </Grid>
          <Grid item xs={12} sm={8} lg={4}>
            <GeneralTypeGrowthRate title={'Building Projects'} />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <ApexPolarChart
              labels={['Comericial', 'Residence', 'Mixed Use', 'Office', 'Health Center']}
              title={'Building Projects'}
            />
          </Grid>
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
                  name: 'Mixeduse',
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
                },
                {
                  name: 'Office',
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
                },
                {
                  name: 'Health Center',
                  data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
                }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <GeneralSubCategories data={subCategories} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <ReginalDistributionBarChart title={'Condominuim'} />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </ProjectAnalyticsLayout>
  )
}

export default CrmDashboard
