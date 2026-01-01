import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import useProjectTypeCategory from 'src/hooks/analytics/use-master-data'
import { useAuth } from 'src/hooks/useAuth'
import projectPerformanceAnalticsService from 'src/services/analytics/project/performance-service'
import departmentApiService from 'src/services/department/department-service'
import Department from 'src/types/department/department'
import ProjectTypes from 'src/views/analytics/Charts/Financial/ProjectTypes'
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout'
import FinancialPhysicalPerformanceExpense from 'src/views/analytics/projects/performance/financial-physical-performance-expense'



const availableYears = [2023, 2024, 2025]

const usePerformanceData = (typeId: string, departmentId?: string, year?: number) => {
  const buildFilter = (attr?: string) => {
    const filter: Record<string, any> = {}
    if (departmentId) filter.department_id = departmentId
    if (year) filter.year = year
    if (attr) filter.attr = attr
    return filter
  }

  const fetchPerformance = (attr: 'financial_performance' | 'physical_performance' | 'expense') =>
    useQuery({
      queryKey: ['performance', attr, typeId, departmentId, year],
      queryFn: () =>
        projectPerformanceAnalticsService.getFinancialPhysicalPerformanceExpense(typeId, {
          filter: buildFilter(attr)
        }),
      enabled: !!typeId
    })

  const fetchEVAPerformance = () =>
    useQuery({
      queryKey: ['eva-performance', typeId, departmentId, year],
      queryFn: () =>
        projectPerformanceAnalticsService.getEVAperformance(typeId, {
          filter: buildFilter()
        }),
      enabled: !!typeId
    })

  const evaPerformance = fetchEVAPerformance()
  const financial = fetchPerformance('financial_performance')
  const physical = fetchPerformance('physical_performance')
  const expense = fetchPerformance('expense')

  return {
    financial: financial.data?.payload || [{ name: 'Financial', data: [] }],
    physical: physical.data?.payload || [{ name: 'Physical', data: [] }],
    expense: expense.data?.payload || [{ name: 'Expense', data: [] }],
    evaPerformance: evaPerformance.data?.payload || [{ name: 'Financial', data: [] }]
  }
}

// -------------------- FILTERS COMPONENT --------------------
const Filters = ({
  departments,
  years,
  selectedDepartment,
  setSelectedDepartment,
  selectedYear,
  setSelectedYear
}: {
  departments: Department[]
  years: number[]
  selectedDepartment?: string
  setSelectedDepartment: (id: string) => void
  selectedYear?: number
  setSelectedYear: (year: number) => void
}) => (
  <Grid container spacing={2} sx={{ mb: 4 }} justifyContent='flex-end'>
    <Grid item xs={12} md={4}>

      <FormControl sx={{ mr: 2 }}>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
          labelId="department-select-label"
          value={selectedDepartment}
          label="Department"
          onChange={e => setSelectedDepartment(e.target.value)}
        >
          {departments.map(d => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl >
        <InputLabel id="year-select-label">Year</InputLabel>
        <Select
          labelId="year-select-label"
          value={selectedYear}
          label="Year"
          onChange={e => setSelectedYear(Number(e.target.value))}
        >
          {years.map(y => (
            <MenuItem key={y} value={y}>
              {y}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  </Grid>
)

// -------------------- MAIN COMPONENT --------------------
const Performance = () => {
  const {
    types,
    activeType,
    setActiveType
  } = useProjectTypeCategory('project')
  const { user } = useAuth()
  const { data: departments, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['departments', user?.department_id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: { parent_department_id: user?.department_id }
      }),
  })
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(user?.department_id)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { financial, physical, expense, evaPerformance } = usePerformanceData(
    activeType.id,
    selectedDepartmentId || "",
    selectedYear
  )

  const seriesData = [
    { title: 'Financial Performance', data: financial },
    { title: 'Physical Performance', data: physical },
    { title: 'Project Expense', data: expense },
    { title: 'EVA Performance', data: evaPerformance }
  ]

  return (
    <ProjectAnalyticsLayout>
      <Filters
        departments={departments?.payload || []}
        years={availableYears}
        selectedDepartment={selectedDepartmentId || ""}
        setSelectedDepartment={setSelectedDepartmentId}
        selectedYear={selectedYear}
        setSelectedYear={(year: number) => setSelectedYear(year)}
      />

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <ProjectTypes
            rawData={types}
            title="Project Types"
            maxHeight="20.9rem"
            setActiveType={setActiveType}
            activeType={activeType}
          />
        </Grid>

        <Grid item xs={12} md={9}>

        </Grid>

        {seriesData.map((s, idx) => (
          <Grid key={idx} item xs={12}>
            <FinancialPhysicalPerformanceExpense data={s.data} title={s.title} />
          </Grid>
        ))}
      </Grid>
    </ProjectAnalyticsLayout>
  )
}

export default Performance
