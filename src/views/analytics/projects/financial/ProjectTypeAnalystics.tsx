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
import useLocalStorage from 'src/hooks/use-local-storage'
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants'

const hashString = (value: string) => {
  let hash = 0
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) | 0
  return Math.abs(hash)
}

const mulberry32 = (seed: number) => {
  let t = seed >>> 0
  return () => {
    t += 0x6d2b79f5
    let x = Math.imul(t ^ (t >>> 15), t | 1)
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61)
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

const formatInt = (value: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(value))

// ** Styled Component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    paddingTop: '0 !important'
  }
}))

const ProjectTypeFinanceAnalystics = ({ selectedType }: { selectedType: MasterType }) => {
  const theme = useTheme()
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false)

  // ** Fetch Analytics Data
  const { data: apiResponse, isLoading, isError } = useQuery({
    queryKey: ['projectTypeProjectFinance', selectedType?.id],
    queryFn: () => projectFinanceAnalyticsService.projectTypeProjectFinance(selectedType?.id, {}),
    enabled: !!selectedType?.id && !dummyEnabled
  })

  const seed = hashString(`${selectedType?.id || 'none'}:${selectedType?.title || ''}`)
  const r = mulberry32(seed)
  const main = 250_000 + r() * 1_250_000
  const supplement = main * (0.12 + r() * 0.18)
  const variation = main * (0.08 + r() * 0.22)
  const omission = main * (r() * 0.06)
  const total = main + supplement + variation - omission
  const growth = -2 + r() * 18

  const dummyResponse = {
    payload: {
      summary: {
        total: formatInt(total),
        growth,
        subtitle: 'Q4 Overview',
        description: 'This year compared to last year'
      },
      series: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        data: Array.from({ length: 8 }).map((_, i) => {
          const rr = mulberry32(hashString(`${seed}:m:${i}`))
          const v = (total / 8) * (0.75 + rr() * 0.6)
          return Math.round(v / 10_000)
        })
      },
      data: [
        {
          title: 'Main Contract',
          stats: `ETB ${formatInt(main)}`,
          progress: Math.min(100, Math.max(5, Math.round((main / total) * 100))),
          avatarColor: 'primary',
          avatarIcon: 'tabler:file-invoice'
        },
        {
          title: 'Supplement',
          stats: `ETB ${formatInt(supplement)}`,
          progress: Math.min(100, Math.max(5, Math.round((supplement / total) * 100))),
          avatarColor: 'warning',
          avatarIcon: 'tabler:plus'
        },
        {
          title: 'Variation',
          stats: `ETB ${formatInt(variation)}`,
          progress: Math.min(100, Math.max(5, Math.round((variation / total) * 100))),
          avatarColor: 'success',
          avatarIcon: 'tabler:adjustments'
        },
        {
          title: 'Omission',
          stats: `ETB ${formatInt(omission)}`,
          progress: Math.min(100, Math.max(5, Math.round((omission / total) * 100))),
          avatarColor: 'info',
          avatarIcon: 'tabler:minus'
        }
      ]
    }
  }

  const resolvedResponse = (dummyEnabled ? dummyResponse : apiResponse) as any

  // ** Handle Loading or Error
  if (!dummyEnabled && isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography>Loading analytics...</Typography>
        </CardContent>
      </Card>
    )
  }

  if (!dummyEnabled && (isError || !resolvedResponse)) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">Failed to load analytics data.</Typography>
        </CardContent>
      </Card>
    )
  }

  // Assume API returns { summary, series, details }
  const { data: details, series, summary } = resolvedResponse.payload

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
