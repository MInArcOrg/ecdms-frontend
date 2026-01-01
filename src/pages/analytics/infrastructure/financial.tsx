// src/views/analytics/projects/financial/Financial.tsx

import { Grid } from '@mui/material'
import { useState } from 'react'
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data'

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
  } = useProjectTypeCategory('project')


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
