import { Box, Card, CardContent, Grid, Switch, Typography, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import { formatCurrency } from 'src/utils/formatter/currency'
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import EVAPerformanceTable from 'src/views/analytics/Charts/Performance/EVAPerformanceTable'
import PerformanceLayout from 'src/views/analytics/Charts/Performance/PerformanceLayout'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'

const Performance = () => {
  const theme = useTheme()

  // -------------------- CONSTANTS --------------------
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  const series = [
    { name: 'Registered', data: [90, 120, 55, 50, 40, 60, 30, 40, 20, 30, 40, 20] },
    { name: 'Checked', data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30] },
    { name: 'Approved', data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30] },
    { name: 'Authorized', data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30] }
  ]

  const performanceSeries = [
    { name: 'Planned', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
    { name: 'Actual', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }
  ]

  const evaSeries = [
    { name: 'CV', data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101] },
    { name: 'SV', data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 35, 41, 36] }
  ]

  // -------------------- APEX OPTIONS --------------------
  const chartOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: {
      categories: months,
      labels: { style: { colors: theme.palette.text.disabled } }
    },
    yaxis: { labels: { style: { colors: theme.palette.text.disabled } } },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} ETB`
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: theme.palette.text.secondary }
    }
  }

  // -------------------- STATE --------------------
  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeType, setActiveType] = useState<any>(null)

  // -------------------- QUERIES --------------------
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  })

  const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['masterCategory', 'project', activeType?.id],
    queryFn: () =>
      masterCategoryApiService.getAll('project', {
        filter: { projecttype_id: activeType?.id }
      }),
    enabled: !!activeType
  })

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    if (!fetchedTypes?.payload?.length) return

    const mapped = fetchedTypes.payload.map((type: any) => ({
      id: type.id,
      title: type.title,
      progress: Math.floor(Math.random() * 50),
      percentage: `${Math.floor(Math.random() * 50)}%`,
      progressColor: 'primary',
      amount: formatCurrency(Math.floor(Math.random() * 1_000_000)).toString()
    }))

    setTypes(mapped)
    if (!activeType) setActiveType(mapped[0])
  }, [fetchedTypes])

  useEffect(() => {
    if (!fetchedCategories?.payload?.length || !activeType) return

    const mappedCategories = fetchedCategories.payload.map((category: any) => ({
      id: category.id,
      title: category.title,
      progress: Math.floor(Math.random() * 50),
      percentage: `${Math.floor(Math.random() * 50)}%`,
      progressColor: 'primary',
      amount: formatCurrency(Math.floor(Math.random() * 1_000_000)).toString()
    }))

    setCategories(mappedCategories)
  }, [activeType, fetchedCategories])

  // -------------------- RENDER --------------------
  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={2}>
        {/* Project Types */}
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            data={types}
            title='Project Types'
            maxHeight='20.9rem'
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>

        {/* Project Category Chart */}
        <Grid item xs={12} md={8.8}>
          <ProjectCategoryChart
            labels={months}
            series={series}
            title='Project Report'
            height={300}
          />
        </Grid>

        {/* Performance Sections */}
        {['Financial Performance', 'Expense', 'Physical Performance'].map((title) => (
          <Grid item xs={12} key={title}>
            <PerformanceLayout data={performanceSeries} title={title} options={chartOptions} />
          </Grid>
        ))}

        {/* EVA Table */}
        <Grid item xs={12} md={6}>
          <EVAPerformanceTable title='EVA Performance' />
        </Grid>

        {/* SPI vs CPI / SV vs CV Switch */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' justifyContent='center' mb={2}>
                <Typography variant='subtitle2' sx={{ mr: 1 }}>
                  SPI vs CPI
                </Typography>
                <Switch color='primary' />
                <Typography variant='subtitle2' sx={{ ml: 1 }}>
                  SV vs CV
                </Typography>
              </Box>
              <ReactApexcharts
                options={chartOptions as any}
                series={evaSeries}
                type='bar'
                height={290}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProjectAnalyticsLayout>
  )
}

export default Performance
