import { Card, Typography, Autocomplete, TextField, Grid, CardContent, CircularProgress } from '@mui/material'
import { Fragment } from 'react'

function ResourceFilter({
  resourceTypes,
  resourceTypesLoading,
  masterStore,
  loading,
  resources,
  type,
  setType,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  item,
  setItem,
  getData,
  subCategoryOptions,
  setSubcategoryOptions,
  years,
  baseYear,
  setBaseYear,
  inflation
}) {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2.4}>
            <Typography sx={{ fontWeight: 'bolder' }} variant='body1'>
              Type
            </Typography>
            <Autocomplete
              size='small'
              options={resourceTypes ? resourceTypes.data : []}
              id='autocomplete-outlined'
              value={type}
              getOptionLabel={option => option.title}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              loading={resourceTypesLoading}
              onChange={(event, newValue) => {
                setType(newValue)
                setCategory(null)
                getData(newValue?.id)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {resourceTypesLoading ? <CircularProgress color='inherit' size={20} /> : null}
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
              Category
            </Typography>
            <Autocomplete
              size='small'
              options={masterStore?.categories || []}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={category}
              id='autocomplete-outlined'
              getOptionLabel={option => option.title}
              loading={masterStore.isCatLoading}
              onChange={(event, newValue) => {
                setCategory(newValue)
                setSubcategoryOptions(newValue?.resourcesubcategories || [])
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {masterStore.isCatLoading ? <CircularProgress color='inherit' size={20} /> : null}
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
              Subcategory
            </Typography>
            <Autocomplete
              size='small'
              options={subCategoryOptions}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={subCategory}
              id='autocomplete-outlined'
              getOptionLabel={option => option.title}
              onChange={(event, newValue) => {
                setSubCategory(newValue)
              }}
              renderInput={params => <TextField {...params} />}
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
              Item
            </Typography>
            <Autocomplete
              size='small'
              options={resources?.data || []}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              value={item}
              id='autocomplete-outlined'
              getOptionLabel={option => option.title}
              loading={loading}
              onChange={(event, newValue) => {
                setItem(newValue)
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {loading ? <CircularProgress color='inherit' size={20} /> : null}
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
              {`${inflation ? 'Starting Cost' : 'Base'}`} Year
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
  )
}

export default ResourceFilter
