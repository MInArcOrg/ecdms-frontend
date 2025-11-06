import { Box, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import projectPlanReportAnalticsService from 'src/services/analytics/project/plan-report-service'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import { formatCurrency } from 'src/utils/formatter/currency'
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'

interface ProjectPlanReportAnalyticsProps {
  mode: 'plan' | 'report'
}

const ProjectPlanReportAnalytics = ({ mode }: ProjectPlanReportAnalyticsProps) => {
  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeType, setActiveType] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<any>(null)

  // ✅ Fetch project types
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  })

  // ✅ Fetch categories
  const { data: fetchedCategories } = useQuery({
    queryKey: ['masterCategory', 'project',activeType?.id],
    queryFn: () => masterCategoryApiService.getAll('project', {
        filter:{
            projecttype_id:activeType?.id
        }
    }),
    enabled: !!activeType?.id
  })


  // ✅ Fetch analytics data (plan/report)
  const {
    data: analyticsData,
    isLoading
  } = useQuery({
    queryKey: ['getTypeCategoryDepartmentPlanReport', mode,activeCategory?.id,activeType?.id],
    queryFn: () =>
      projectPlanReportAnalticsService.getTypeCategoryDepartmentPlanReport(
        activeCategory?.id || activeType?.id,
        mode,
        activeCategory?.id ? 'category' : 'type',
        {}
      ),
    enabled: !!(activeType?.id || activeCategory?.id)
  })

  // ✅ Extract chart data safely
  const chartPayload = analyticsData?.payload || {}
  const labels = chartPayload?.chart ?? []
  const series = chartPayload?.series ?? []

  // ✅ Prepare types list
  useEffect(() => {
    if (fetchedTypes?.payload?.length) {
      const mapped = fetchedTypes.payload.map((type: any) => ({
        id: type.id,
        progress: Math.floor(Math.random() * 50),
        percentage: `${Math.floor(Math.random() * 50)}%`,
        title: type.title,
        progressColor: 'primary',
        amount: formatCurrency(Math.floor(Math.random() * 1_000_000))
      }))
      setTypes(mapped)
      if (!activeType) setActiveType(mapped[0])
    }
  }, [fetchedTypes])

  // ✅ Prepare categories list
  useEffect(() => {
    if (fetchedCategories?.payload?.length) {
      setCategories(fetchedCategories.payload)
      if (!activeCategory) setActiveCategory(null) // keep unselected initially
    }
  }, [fetchedCategories])



  useEffect(() => {
    if (activeType) setActiveCategory(null)
  }, [activeType])

  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={3} pb={7}>
        {/* ✅ Project Types */}
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            data={types}
            title="Project Types"
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>

        {/* ✅ Chart + Category Filter */}
        <Grid item xs={12} md={8.8}>
          <div className='flex justify-between items-center mb-3'>
            <Typography variant='h6' fontWeight='bold'>
              {mode === 'plan' ? 'Plan Analytics' : 'Report Analytics'}{' '}
              {activeType ? `: ${activeType.title}` : activeCategory ? `: ${activeCategory.title}` : ''}
            </Typography>

         
          </div>
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{}</Typography>

          <Select
              size='small'
              displayEmpty
              value={activeCategory?.id || ''}
              onChange={e => {
                const selected = categories.find(cat => cat.id === (e.target.value)) || null
                setActiveCategory(selected)
              }}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value=''>
                <em>Filter by Category</em>
              </MenuItem>
              {categories.map(cat => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
        </Box>

          <ProjectCategoryChart
            labels={labels}
            series={series}
            height={400}
          />
          </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ProjectAnalyticsLayout>
  )
}

export default ProjectPlanReportAnalytics
