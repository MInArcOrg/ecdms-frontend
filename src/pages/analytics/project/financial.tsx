// src/views/analytics/projects/financial/Financial.tsx

import { Grid, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import departmentApiService from 'src/services/department/department-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import { formatCurrency } from 'src/utils/formatter/currency'

import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import AnalyticsViewTabs from 'src/views/analytics/projects/financial/AnalyticsViewTabs'
import ProjectTypeFinanceAnalystics from 'src/views/analytics/projects/financial/ProjectTypeAnalystics'

const Financial = () => {
  const [view, setView] = useState('Graph')
  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeType, setActiveType] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState<any>(null)




  // Fetch project types
  const { data: fetchedTypes } = useQuery({
    queryKey: ['masterType', 'project'],
    queryFn: () => masterTypeApiService.getAll('project', {})
  })

  // Fetch categories by selected type
  const { data: fetchedCategories, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['masterCategory', 'project', activeType?.id],
    queryFn: () =>
      masterCategoryApiService.getAll('project', {
        filter: { projecttype_id: activeType?.id }
      }),
    enabled: !!activeType?.id
  })






  return (
    <ProjectAnalyticsLayout>
      {/* Project Type Analytics */}
      <Grid container spacing={3} pb={7}>
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            rawData={fetchedTypes?.payload}
            title="Project Types"
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>
        <Grid item xs={12} md={8.8}>
          <ProjectTypeFinanceAnalystics selectedType={activeType} />
        </Grid>
      </Grid>

      {/* Category Analytics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            rawData={fetchedCategories?.payload}
            title="Project Categories"
            setActiveType={setActiveCategory}
            activeType={activeCategory}
            maxHeight="20rem"
          />
        </Grid>

        <Grid item xs={12} md={8.8}>
          <AnalyticsViewTabs
            value={view}
            onChange={setView}
            selectedCategory={activeCategory}
            categories={categories}
            isCategoryLoading={isCategoryLoading}
          />
        </Grid>
      </Grid>
    </ProjectAnalyticsLayout>
  )
}

export default Financial
