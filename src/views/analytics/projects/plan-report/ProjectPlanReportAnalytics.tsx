import { Box, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data'
import projectPlanReportAnalticsService from 'src/services/analytics/project/plan-report-service'
import { MasterCategory } from 'src/types/master/master-types'
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import useLocalStorage from 'src/hooks/use-local-storage'
import { ANALYTICS_DUMMY_DATA_STORAGE_KEY } from 'src/configs/app-constants'

interface ProjectPlanReportAnalyticsProps {
  mode: 'plan' | 'report'
}

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

const ProjectPlanReportAnalytics = ({ mode }: ProjectPlanReportAnalyticsProps) => {
  const [dummyEnabled] = useLocalStorage<boolean>(ANALYTICS_DUMMY_DATA_STORAGE_KEY, false)

  const {
    types,
    categories,
    activeType,
    setActiveType,
    activeCategory,
    setActiveCategory,
    isCategoryLoading
  } = useProjectTypeCategory('project')

  const regions = [
    'FDRE',
    'Dire Dawa',
    'Southwest Ethiopia',
    'Benishangul',
    'Somali',
    'Harari',
    'Afar',
    'Sidama',
    'Addis Ababa',
    'Tigray',
    'Amhara',
    'Central Ethiopia',
    'South Ethiopia',
    'Oromia'
  ]

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
    enabled: !!(activeType?.id || activeCategory?.id) && !dummyEnabled
  })

  // ✅ Extract chart data safely
  const seed = hashString(`${mode}:${activeType?.id || ''}:${activeCategory?.id || ''}:${activeCategory?.title || ''}`)
  const makeSeries = (name: string, min: number, max: number, zeroChance = 0.06) => {
    const baseRand = mulberry32(hashString(`${seed}:${name}`))
    const center = min + baseRand() * (max - min)
    const spread = 0.08 + baseRand() * 0.18
    return {
      name,
      data: regions.map((region, idx) => {
        const r = mulberry32(hashString(`${seed}:${name}:${region}:${idx}`))
        if (r() < zeroChance) return 0
        const drift = (idx / Math.max(1, regions.length - 1)) * (0.12 + r() * 0.18)
        const noise = (r() - 0.5) * spread
        const value = Math.max(0, Number((center + noise + drift).toFixed(2)))
        return value
      })
    }
  }

  const dummyAnalyticsData = {
    payload: {
      chart: regions,
      series: [
        makeSeries('Registered', 0.25, 0.7, 0.05),
        makeSeries('Checked', 0.12, 0.45, 0.08),
        makeSeries('Approved', 0.15, 0.55, 0.08),
        makeSeries('Authorized', 0.06, 0.35, 0.12)
      ]
    }
  }

  const resolvedAnalyticsData = (dummyEnabled ? dummyAnalyticsData : analyticsData) as any
  const chartPayload = resolvedAnalyticsData?.payload || {}
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
