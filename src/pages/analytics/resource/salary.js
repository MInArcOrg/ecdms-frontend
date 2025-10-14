import ResourceAnalyticsLayout from 'src/views/analytics/layouts/ResourceAnalyticsLayout'
import {
  Card,
  Typography,
  Autocomplete,
  TextField,
  Grid,
  CardContent,
  CircularProgress,
  Box,
  IconButton
} from '@mui/material'
import { Fragment, useState } from 'react'
import StickyHeaderTable from 'src/views/components/custom/StickyHeaderTable'
import { getSubdepartments } from 'src/services/department/department-service'
import { getLoggedInUser } from 'src/helpers/token_helper'
import { getStudyFields } from 'src/services/master/studyFields'
import { getStudyLevels } from 'src/services/master/studyLevels'
import { getWorkExpLevel } from 'src/services/master/workExpLevels'
import { Icon } from '@iconify/react'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import 'chart.js/auto'
import { indexOf } from 'lodash'
import SalaryChart from 'src/views/analytics/layouts/ResourceAnalyticsLayout/SalaryChart'

const years = [
  { id: 0, name: '2021' },
  { id: 1, name: '2022' },
  { id: 2, name: '2023' },
  { id: 3, name: '2024' },
  { id: 4, name: '2025' },
  { id: 5, name: '2026' },
  { id: 6, name: '2027' },
  { id: 7, name: '2028' },
  { id: 8, name: '2029' },
  { id: 9, name: '2030' }
]
function Salary() {
  const [{ data: labels }] = getSubdepartments(getLoggedInUser().department_id)
  const [{ data: studyFields, loading: fieldsLoading }] = getStudyFields()
  const [{ data: studyLevels, loading: studyLevelsLoading }] = getStudyLevels()
  const [{ data: workExp, loading: workExpLoading }] = getWorkExpLevel()

  const [baseYear, setBaseYear] = useState(null)
  const [selectedStudyField, setSelectedStudyField] = useState(null)
  const [selectedStudyLevel, setSelectedStudyLevel] = useState(null)
  const [selectedWorkExp, setSelectedWorkExp] = useState(null)
  const [tableView, setTableView] = useState(true)

  return (
    <ResourceAnalyticsLayout>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Position
              </Typography>
              <Autocomplete
                size='small'
                options={[]}
                id='autocomplete-outlined'
                value={null}
                getOptionLabel={option => option.title}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                loading={false}
                onChange={(event, newValue) => { }}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {false ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Grid {...props} container gridColumn alignItems='center' key={option.id}>
                    <Grid item xs>
                      <Typography variant='body1' color='text.secondary'>
                        {option.title}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Study Field
              </Typography>
              <Autocomplete
                size='small'
                options={studyFields?.data || []}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={selectedStudyField}
                id='autocomplete-outlined'
                getOptionLabel={option => option.title}
                loading={false}
                onChange={(event, newValue) => {
                  setSelectedStudyField(newValue)
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {fieldsLoading ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Grid {...props} container gridColumn alignItems='center' key={option.id}>
                    <Grid item xs>
                      <Typography variant='body1' color='text.secondary'>
                        {option.title}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Study level
              </Typography>
              <Autocomplete
                size='small'
                options={studyLevels?.data || []}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={selectedStudyLevel}
                id='autocomplete-outlined'
                getOptionLabel={option => option.title}
                onChange={(event, newValue) => {
                  setSelectedStudyLevel(newValue)
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {studyLevelsLoading ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Grid {...props} container gridColumn alignItems='center' key={option.id}>
                    <Grid item xs>
                      <Typography variant='body1' color='text.secondary'>
                        {option.title}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Years of Experience
              </Typography>
              <Autocomplete
                size='small'
                options={workExp?.data || []}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={selectedWorkExp}
                id='autocomplete-outlined'
                getOptionLabel={option => option.title}
                loading={false}
                onChange={(event, newValue) => {
                  setSelectedWorkExp(newValue)
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {workExpLoading ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <Grid {...props} container gridColumn alignItems='center' key={option.id}>
                    <Grid item xs>
                      <Typography variant='body1' color='text.secondary'>
                        {option.title}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>

            <Grid item xs={12} md={2.4}>
              <Typography sx={{ pl: 1 }} variant='body1'>
                Year
              </Typography>
              <Autocomplete
                size='small'
                options={years}
                value={baseYear}
                disableClearable
                id='autocomplete-outlined'
                getOptionLabel={option => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  setBaseYear(newValue)
                }}
                renderInput={params => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box display='flex' gap={2} my={3} alignItems='center'>
        <IconButton
          aria-label='table view'
          color={`${tableView ? 'primary' : 'secondary'}`}
          onClick={() => setTableView(true)}
          sx={{ display: 'flex', gap: 2, borderRadius: 1 }}
        >
          <Icon icon='mdi:table' />
          <Typography component='span' variant='body1'>
            Table
          </Typography>
        </IconButton>

        <IconButton
          aria-label='chart view'
          color={`${!tableView ? 'primary' : 'secondary'}`}
          onClick={() => setTableView(false)}
          sx={{ display: 'flex', gap: 2, borderRadius: 1 }}
        >
          <Icon icon='mdi:chart-bar' />
          <Typography component='span' variant='body1'>
            Graph
          </Typography>
        </IconButton>
      </Box>

      <Box>
        {tableView ? (
          <Card>
            <CardContent>
              <StickyHeaderTable reagions={labels} baseYear={0} years={years} />
            </CardContent>
          </Card>
        ) : (
          <DatePickerWrapper>
            <SalaryChart years={years} reagions={labels ? labels : []} baseYear={indexOf(years, baseYear)} />
          </DatePickerWrapper>
        )}
      </Box>
    </ResourceAnalyticsLayout>
  )
}

export default Salary
