import { Icon } from '@iconify/react'
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { dropDownConfig } from 'src/configs/api-constants'
import { useAuth } from 'src/hooks/useAuth'
import departmentApiService from 'src/services/department/department-service'
import generalMasterDataApiService from 'src/services/general/general-master-data-service'
import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout'
import SalaryChart from 'src/views/analytics/layouts/ResourceAnalyticsLayout/SalaryChart'
import StickyHeaderTable from 'src/views/components/custom/table/sticky-header-table'

// Sample years list
const years = Array.from({ length: 10 }, (_, i) => ({
  id: 2021 + i,
  name: (2021 + i).toString()
}))

function Salary() {
  const { user } = useAuth()

  // --- Fetch master data ---
  const { data: departments } = useQuery({
    queryKey: ['departments', user?.department_id],
    queryFn: () =>
      departmentApiService.getAll({ filter: { parent_department_id: user?.department_id } }),
    enabled: !!user?.department_id
  })

  const { data: studyFields, isLoading: fieldsLoading } = useQuery({
    queryKey: ['study-fields'],
    queryFn: () => generalMasterDataApiService.getAll('study-fields', dropDownConfig())
  })

  const { data: studyLevels, isLoading: studyLevelsLoading } = useQuery({
    queryKey: ['study-levels'],
    queryFn: () => generalMasterDataApiService.getAll('study-levels', dropDownConfig())
  })

  const { data: workExp, isLoading: workExpLoading } = useQuery({
    queryKey: ['work-experiences'],
    queryFn: () => generalMasterDataApiService.getAll('work-experiences', dropDownConfig())
  })

  const { data: resourceSubCategories, isLoading: subCatLoading } = useQuery({
    queryKey: ['resource-subcategories'],
    queryFn: () => generalMasterDataApiService.getAll('resource-subcategories', dropDownConfig())
  })

  // --- States ---
  const [baseYear, setBaseYear] = useState<{ id: number; name: string } | null>(null)
  const [selectedStudyField, setSelectedStudyField] = useState<any>(null)
  const [selectedStudyLevel, setSelectedStudyLevel] = useState<any>(null)
  const [selectedWorkExp, setSelectedWorkExp] = useState<any>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null)
  const [tableView, setTableView] = useState(true)

  const baseYearIndex = years.findIndex(y => y.id === baseYear?.id)

  return (
    <ResourceAnalyticsLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            {/* Resource Subcategory */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Resource Subcategory
              </Typography>
              <Autocomplete
                size='small'
                options={resourceSubCategories?.payload || []}
                value={selectedSubCategory}
                onChange={(_, v) => setSelectedSubCategory(v)}
                getOptionLabel={option => option.title || ''}
                loading={subCatLoading}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select subcategory'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {subCatLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Study Field */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Study Field
              </Typography>
              <Autocomplete
                size='small'
                options={studyFields?.payload || []}
                value={selectedStudyField}
                onChange={(_, v) => setSelectedStudyField(v)}
                getOptionLabel={option => option.title || ''}
                loading={fieldsLoading}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select field'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {fieldsLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Study Level */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Study Level
              </Typography>
              <Autocomplete
                size='small'
                options={studyLevels?.payload || []}
                value={selectedStudyLevel}
                onChange={(_, v) => setSelectedStudyLevel(v)}
                getOptionLabel={option => option.title || ''}
                loading={studyLevelsLoading}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select level'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {studyLevelsLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Work Experience */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Work Experience
              </Typography>
              <Autocomplete
                size='small'
                options={workExp?.payload || []}
                value={selectedWorkExp}
                onChange={(_, v) => setSelectedWorkExp(v)}
                getOptionLabel={option => option.title || ''}
                loading={workExpLoading}
                renderInput={params => (
                  <TextField
                    {...params}
                    placeholder='Select experience'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {workExpLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      )
                    }}
                  />
                )}
              />
            </Grid>

            {/* Year */}
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Year
              </Typography>
              <Autocomplete
                size='small'
                options={years}
                value={baseYear}
                onChange={(_, v) => setBaseYear(v)}
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={params => <TextField {...params} placeholder='Select year' />}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Toggle between Table and Graph */}
      <Box display='flex' gap={2} my={3} alignItems='center'>
        <IconButton
          aria-label='table view'
          color={tableView ? 'primary' : 'secondary'}
          onClick={() => setTableView(true)}
        >
          <Icon icon='mdi:table' />
          <Typography variant='body1' sx={{ ml: 1 }}>
            Table
          </Typography>
        </IconButton>

        <IconButton
          aria-label='chart view'
          color={!tableView ? 'primary' : 'secondary'}
          onClick={() => setTableView(false)}
        >
          <Icon icon='mdi:chart-bar' />
          <Typography variant='body1' sx={{ ml: 1 }}>
            Graph
          </Typography>
        </IconButton>
      </Box>

      {/* Table or Chart view */}
      <Box>
        {tableView ? (
          <Card>
            <CardContent>
              <StickyHeaderTable regions={departments?.payload || []} baseYear={baseYearIndex} years={years} />
            </CardContent>
          </Card>
        ) : (
          <DatePickerWrapper>
            <SalaryChart years={years} regions={departments?.payload || []} baseYear={baseYearIndex} />
          </DatePickerWrapper>
        )}
      </Box>
    </ResourceAnalyticsLayout>
  )
}

export default Salary
