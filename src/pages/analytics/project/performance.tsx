import {
  Box,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
  useTheme
} from '@mui/material'
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
import axios from 'axios'
import projectPerformanceAnalticsService from 'src/services/analytics/project/performance-service'



// -------------------- MAIN COMPONENT --------------------
const Performance = () => {
  const theme = useTheme()

  const projectId = '1234e72e-951f-45f8-a0dd-fa2eaa4c1e0b' // TODO: make dynamic if needed
  const departmentId = '8a0a21ce-44a8-462b-a07d-3d55ed3ab089'
  const currentYear = 2025

  // -------------------- STATE --------------------
  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeType, setActiveType] = useState<any>(null)
  const [showAlt, setShowAlt] = useState(false)

  // -------------------- QUERIES --------------------
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  })

  const { data: fetchedCategories } = useQuery({
    queryKey: ['masterCategory', 'project', activeType?.id],
    queryFn: () =>
      masterCategoryApiService.getAll('project', {
        filter: { projecttype_id: activeType?.id }
      }),
    enabled: !!activeType
  })

  const { data: financialPerformance } = useQuery({
    queryKey: ['financialPerformance', projectId, currentYear, departmentId],
    queryFn: () =>
      projectPerformanceAnalticsService.getFinancialPhysicalPerformanceExpense(projectId,{
        filter: {
          department_id:departmentId,
          attr: 'financial_performance',
          year: currentYear
        }
      })
  })

  const { data: physicalPerformance } = useQuery({
    queryKey: ['physicalPerformance', projectId, currentYear, departmentId],
    queryFn: () =>
      projectPerformanceAnalticsService.getFinancialPhysicalPerformanceExpense(projectId)
  })

  const { data: projectExpense } = useQuery({
    queryKey: ['projectExpense', projectId, currentYear, departmentId],
    queryFn: () =>
      projectPerformanceAnalticsService.getFinancialPhysicalPerformanceExpense(projectId)
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

  // -------------------- DATA PREPARATION --------------------
  const months =
    financialPerformance?.payload?.months ||
    ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']

  const seriesFinancial =
    financialPerformance?.payload?.series || [{ name: 'Financial', data: [] }]

  const seriesPhysical =
    physicalPerformance?.payload?.series || [{ name: 'Physical', data: [] }]

  const seriesExpense =
    projectExpense?.payload?.series || [{ name: 'Expense', data: [] }]

  // -------------------- APEX OPTIONS --------------------
  const chartOptions = {
    chart: { type: 'bar', height: 350 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: months, labels: { style: { colors: theme.palette.text.disabled } } },
    yaxis: { labels: { style: { colors: theme.palette.text.disabled } } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => `${formatCurrency(val)}` } },
    colors: [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.warning.main
    ],
    legend: { show: true, position: 'bottom', labels: { colors: theme.palette.text.secondary } }
  }

  // -------------------- RENDER --------------------
  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={2}>
        {/* Project Types */}
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            data={types}
            title="Project Types"
            maxHeight="20.9rem"
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>

        {/* Overview Chart */}
        <Grid item xs={12} md={8.8}>
          <ProjectCategoryChart
            labels={months}
            series={seriesExpense}
            title="Project Expense Overview"
            height={300}
          />
        </Grid>

        {/* Performance Sections */}
        <Grid item xs={12}>
          <PerformanceLayout
            data={seriesFinancial}
            title="Financial Performance"
            options={chartOptions}
          />
        </Grid>

        <Grid item xs={12}>
          <PerformanceLayout
            data={seriesPhysical}
            title="Physical Performance"
            options={chartOptions}
          />
        </Grid>

        {/* EVA Table */}
        <Grid item xs={12} md={6}>
          <EVAPerformanceTable title="EVA Performance" />
        </Grid>

        {/* SPI vs CPI / SV vs CV Switch */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  SPI vs CPI
                </Typography>
                <Switch
                  color="primary"
                  checked={showAlt}
                  onChange={() => setShowAlt(prev => !prev)}
                />
                <Typography variant="subtitle2" sx={{ ml: 1 }}>
                  SV vs CV
                </Typography>
              </Box>

              <ReactApexcharts
                options={chartOptions as any}
                series={showAlt ? seriesPhysical : seriesFinancial}
                type="bar"
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
