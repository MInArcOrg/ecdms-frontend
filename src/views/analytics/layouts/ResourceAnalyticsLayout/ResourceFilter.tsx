import { Card, CardContent, Grid, Typography, TextField, CircularProgress, Autocomplete } from '@mui/material';
import { Fragment } from 'react';

const ResourceFilter = ({
  type,
  setType,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  item,
  setItem,
  resourceTypes,
  resourceTypesLoading,
  resourceCategories,
  isCategoryLoading,
  resourceSubCategories,
  isSubCategoryLoading,
  resources,
  loading,
  years,
  baseYear,
  setBaseYear,
  inflation
}: any) => {
  const AutocompleteField = ({ label, options, value, onChange, loading, getOptionLabel = (option: any) => option.title }: any) => (
    <Autocomplete
      size="small"
      options={options ?? []}
      value={value ?? null}
      getOptionLabel={(option: any) => String(getOptionLabel(option) ?? '')}
      isOptionEqualToValue={(option: any, value: any) => option?.id === value?.id}
      loading={loading}
      onChange={(event, newValue) => onChange(newValue ?? null)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </Fragment>
            )
          }}
        />
      )}
    />
  );
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={2.4}>
            <Typography sx={{ fontWeight: 'bolder' }} variant="body1">
              Type
            </Typography>
            <AutocompleteField
              options={resourceTypes}
              value={type}
              loading={resourceTypesLoading}
              onChange={(newVal: any) => {
                setType(newVal);
                setCategory(null);
                setSubCategory(null);
                setItem(null);
              }}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <Typography sx={{ pl: 1 }} variant="body1">
              Category
            </Typography>
            <AutocompleteField
              options={resourceCategories}
              value={category}
              loading={isCategoryLoading}
              onChange={(newVal: any) => {
                setCategory(newVal);
                setSubCategory(null);
                setItem(null);
              }}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <Typography sx={{ pl: 1 }} variant="body1">
              Subcategory
            </Typography>
            <AutocompleteField
              options={resourceSubCategories || []}
              loading={isSubCategoryLoading}
              value={subCategory}
              onChange={(newVal: any) => {
                setSubCategory(newVal);
                setItem(null);
              }}
            />
          </Grid>

          <Grid item xs={12} md={2.4}>
            <Typography sx={{ pl: 1 }} variant="body1">
              Item
            </Typography>
            <AutocompleteField
              options={(resources ?? []).map((resource: any) => ({
                id: resource.id,
                title: resource.name
              }))}
              value={item}
              loading={loading}
              onChange={setItem}
            />
          </Grid>
            {
              baseYear&&
 <Grid item xs={12} md={2.4}>
            <Typography sx={{ pl: 1 }} variant="body1">
              {inflation ? 'Starting Cost Year' : 'Base Year'}
            </Typography>
            <AutocompleteField
              options={years}
              value={baseYear}
              onChange={setBaseYear}
              getOptionLabel={(option: any) => option.name}
            />
          </Grid>
            }
         
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ResourceFilter;
