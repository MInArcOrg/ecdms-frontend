// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import { useQuery } from '@tanstack/react-query'

// ** Custom Components Imports
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import projectFinanceAnalyticsService from 'src/services/analytics/project/finanace'
import { MasterType } from 'src/types/master/master-types'

// ** Styled Component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingTop: '0 !important'
  }
}))

const ProjectTypeFinanceAnalystics = ({ selectedType }: { selectedType: MasterType }) => {
  const theme = useTheme()

  // ** Fetch Analytics Data
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectTypeProjectFinance', selectedType?.id],
    queryFn: () => projectFinanceAnalyticsService.projectTypeProjectFinance(selectedType?.id, {}),
    enabled: !!selectedType?.id
  })

  // ** Handle Loading or Error
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography>Loading analytics...</Typography>
        </CardContent>
      </Card>
    )
  }

  if (isError || !data) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Failed to load analytics data.</Typography>
        </CardContent>
      </Card>
    )
  }

  // Assume API returns { summary, series, details }
  const { data: details, series, summary } = data.payload

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '30%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: Array(12)
      .fill(hexToRGBA(theme.palette.primary.main, 0.16))
      .map((color, index) => (index === 4 ? hexToRGBA(theme.palette.primary.main, 1) : color)),
    grid: {
      show: false,
      padding: {
        top: -28,
        left: -9,
        right: -10,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      categories: series?.categories || [],
      labels: {
        style: {
          fontSize: '12px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        sx={{ pb: 0 }}
        title="Project Type Finance Analytics"
        subheader={summary?.subtitle || 'Yearly Overview'}
      />
      <CardContent>
        <Grid container spacing={6}>
          <StyledGrid
            item
            sm={4.8}
            xs={12}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end' }}
          >
            <Box sx={{ mb: 3, rowGap: 1, columnGap: 2.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="h6">{summary?.total || '0'} ETB</Typography>
              {summary?.growth && (
                <CustomChip
                  rounded
                  size="small"
                  skin="light"
                  color={summary.growth > 0 ? 'success' : 'error'}
                  label={`${summary.growth > 0 ? '+' : ''}${summary.growth.toFixed(2)}%`}
                />
              )}
            </Box>
            <Typography variant="body2">
              {summary?.description || 'This year compared to last year'}
            </Typography>
          </StyledGrid>

          <StyledGrid item xs={12} sm={7.2}>
            {series?.data?.length ? (
              <ReactApexcharts type="bar" height={180} series={[{ data: series.data }]} options={options as any} />
            ) : (
              <Typography variant="body2" sx={{ color: 'text.disabled', mt: 6 }}>
                No data available for the selected type.
              </Typography>
            )}
          </StyledGrid>
        </Grid>

        {Array.isArray(details) && details.length > 0 && (
          <Box sx={{ mt: 6, borderRadius: 1, p: theme.spacing(4, 5), border: `1px solid ${theme.palette.divider}` }}>
            <Grid container spacing={6}>
              {details.map((item: any, index: number) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Box sx={{ mb: 2.5, display: 'flex', alignItems: 'center' }}>
                    <CustomAvatar
                      skin="light"
                      variant="rounded"
                      color={item.avatarColor || 'primary'}
                      sx={{ mr: 2, width: 26, height: 26 }}
                    >
                      <Icon fontSize="1.125rem" icon={item.avatarIcon || 'tabler:chart-bar'} />
                    </CustomAvatar>
                    <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2.5 }}>
                    {item.stats}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.progress || 0}
                    color={item.progressColor || 'primary'}
                    sx={{ height: 4 }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectTypeFinanceAnalystics
