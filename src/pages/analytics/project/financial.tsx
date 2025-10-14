import { Icon } from '@iconify/react'
import { Box, Grid, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ProjectCategoryAnalyticsTable from 'src/views/analytics/Charts/Financial/ProjectCategoryAnalyticsTable'
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart'
import ProjectTypeAnalystics from 'src/views/analytics/Charts/Financial/ProjectTypeAnalystics'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import LocationCard from 'src/views/analytics/LocationCard'
import departmentApiService from 'src/services/department/department-service'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import { useAuth } from 'src/hooks/useAuth'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import { formatCurrency } from 'src/utils/formatter/currency'

function Financial() {
  const Graph = 'Graph'
  const Table = 'Table'
  const Location = 'Location'

  const [graphView, setGraphView] = useState(Graph)
  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeType, setActiveType] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<any>(null)

  const theme = useTheme()
  const { user } = useAuth()

  // Fetch departments (used as labels)
  const { data: labels } = useQuery({
    queryKey: ['departments', user?.id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: { parent_department_id: user?.department_id }
      }),
    enabled: !!user?.id
  })

  // Fetch project types
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  })

  const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['masterCategory', 'project', activeType?.id],
    queryFn: () => masterCategoryApiService.getAll('project', {
      filter: {
        projecttype_id: activeType?.id
      }
    })
  })

  // Mock chart series
  const series = [
    {
      name: 'Main Contract Price',
      data: [90, 120, 55, 100, 80, 125, 175, 70, 88]
    },
    {
      name: 'Supplement',
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
    },
    {
      name: 'Variation',
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
    },
    {
      name: 'Omission',
      data: [85, 100, 30, 40, 95, 90, 30, 110, 62]
    }
  ]

  // Map fetched types to random data
  useEffect(() => {
    if (fetchedTypes && fetchedTypes?.payload?.length > 0) {
      const mapped = fetchedTypes?.payload.map((type: any) => ({
        id: type.id,
        progress: Math.floor(Math.random() * 50),
        percentage: Math.floor(Math.random() * 50) + '%',
        title: type.title,
        progressColor: 'primary',
        amount: formatCurrency(Math.floor(Math.random() * 1000000)).toString()
      }))
      setTypes(mapped)
      if (!activeType) setActiveType(mapped[0])
    }
  }, [fetchedTypes])

  // Generate categories when activeType changes
  useEffect(() => {
    if (fetchedCategories && fetchedCategories.payload?.length > 0 && activeType) {
      const mappedCategories = fetchedCategories?.payload?.map((category, i: number) => ({
        id: category.id,
        progress: Math.floor(Math.random() * 50),
        percentage: Math.floor(Math.random() * 50) + '%',
        title: category.title,
        progressColor: 'primary',
        amount: formatCurrency(Math.floor(Math.random() * 1000000)).toString()
      }))
      console.log('mapped', mappedCategories)
      if (mappedCategories?.length > 0) setActiveCategory(mappedCategories[0])
      setCategories(mappedCategories)
    }
  }, [activeType, fetchedCategories])

  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={3} pb={7}>
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            data={types}
            title='Project Types'
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>
        <Grid item xs={12} md={8.8}>
          <ProjectTypeAnalystics />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            data={categories}
            title='Project Categories'
            setActiveType={setActiveCategory}
            activeType={activeCategory}
            maxHeight='20rem'
          />
        </Grid>

        <Grid item xs={12} md={8.8}>
          {/* View selector */}
          <Box display='flex' gap={2} my={3} alignItems='center'>
            <IconButton
              aria-label='chart view'
              color={graphView === Graph ? 'primary' : 'secondary'}
              onClick={() => setGraphView(Graph)}
              sx={{ display: 'flex', gap: 2, borderRadius: 1 }}
            >
              <Icon icon='mdi:chart-bar' />
              <Typography component='span' variant='body1'>
                Graph
              </Typography>
            </IconButton>

            <IconButton
              aria-label='table view'
              color={graphView === Table ? 'primary' : 'secondary'}
              onClick={() => setGraphView(Table)}
              sx={{ display: 'flex', gap: 2, borderRadius: 1 }}
            >
              <Icon icon='mdi:table' />
              <Typography component='span' variant='body1'>
                Table
              </Typography>
            </IconButton>

            <IconButton
              aria-label='Location view'
              color={graphView === Location ? 'primary' : 'secondary'}
              onClick={() => setGraphView(Location)}
              sx={{ display: 'flex', gap: 2, borderRadius: 1 }}
            >
              <Icon icon='mdi:map-marker' />
              <Typography component='span' variant='body1'>
                Location
              </Typography>
            </IconButton>
          </Box>

          {/* Conditional Views */}
          {graphView === Graph && (
            <ProjectCategoryChart
              series={series}
              labels={labels?.payload || []}
              title='Regional Distribution'
              height={400}
            />
          )}
          {graphView === Table && <ProjectCategoryAnalyticsTable regions={labels?.payload || []} />}
          {graphView === Location && <LocationCard categories={categories} loading={isCategoryLoading} baseUrl={''} />}
        </Grid>
      </Grid>
    </ProjectAnalyticsLayout>
  )
}

export default Financial
