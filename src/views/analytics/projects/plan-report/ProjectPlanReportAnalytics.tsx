import { Box, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data'
import projectPlanReportAnalticsService from 'src/services/analytics/project/plan-report-service'
import { MasterCategory } from 'src/types/master/master-types'
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'

interface ProjectPlanReportAnalyticsProps {
  mode: 'plan' | 'report'
}

const ProjectPlanReportAnalytics = ({ mode }: ProjectPlanReportAnalyticsProps) => {

  const {
    types,
    categories,
    activeType,
    setActiveType,
    activeCategory,
    setActiveCategory,
    isCategoryLoading
  } = useProjectTypeCategory('project')

  // ✅ Fetch analytics data (plan/report)
  const {
    data: analyticsData,
    isLoading
  } = useQuery({
    queryKey: ['getTypeCategoryDepartmentPlanReport', mode, activeCategory?.id, activeType?.id],
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



  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={3} pb={7}>
        {/* ✅ Project Types */}
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            rawData={types || []}
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
                <Typography variant="h6">{ }</Typography>

                <Select
                  size='small'
                  displayEmpty
                  value={activeCategory?.id || ''}
                  onChange={e => {
                    const selected = categories.find(cat => cat.id === (e.target.value)) || null
                    setActiveCategory(selected as MasterCategory)
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
