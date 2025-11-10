// src/views/analytics/projects/financial/Financial.tsx

import { Grid, useTheme } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data'
import { useAuth } from 'src/hooks/useAuth'
import departmentApiService from 'src/services/department/department-service'
import masterCategoryApiService from 'src/services/master-data/master-category-service'
import masterTypeApiService from 'src/services/master-data/master-type-service'
import { MasterType } from 'src/types/master/master-types'
import { formatCurrency } from 'src/utils/formatter/currency'

import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import AnalyticsViewTabs from 'src/views/analytics/projects/financial/AnalyticsViewTabs'
import ProjectTypeFinanceAnalystics from 'src/views/analytics/projects/financial/ProjectTypeAnalystics'

const Financial = () => {
  const [view, setView] = useState('Graph')
  const {
    types,
    categories,
    activeType,
    setActiveType,
    activeCategory,
    setActiveCategory,
    isCategoryLoading
  } = useProjectTypeCategory()


  return (
    <ProjectAnalyticsLayout>
      {/* Project Type Analytics */}
      <Grid container spacing={3} pb={7}>
        <Grid item xs={12} md={3.2}>
          <ProjectTypes
            rawData={types || []}
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
            rawData={categories || []}
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
