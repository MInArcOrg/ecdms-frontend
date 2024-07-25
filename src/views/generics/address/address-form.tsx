import React, { useEffect, useState } from 'react';
import { Box, Grid, FormControl, FormLabel, FormHelperText, Autocomplete, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import countriesList from 'src/constants/countries';
import Address from 'src/types/general/address';

interface AddressFormProps {
  formik: FormikProps<Address>;
}

const AddressForm: React.FC<AddressFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation();
  const [country, setCountry] = useState<{ value: string; label: string } | null>(null);

  useEffect(() => {
    const selectedCountry = countriesList.find(c => c.title === formik.values.country);
    if (selectedCountry) {
      setCountry({ value: selectedCountry.title, label: selectedCountry.title });
    } else {
      setCountry(null); 
    }
  }, [formik.values.country]);

  return (
    <>
    <Box mb={2}>
      <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
        <FormLabel>{transl('location.form.country')}</FormLabel>
        <Autocomplete
          options={countriesList.map(country => ({ value: country.title, label: country.title }))}
          size='small'
          disableClearable
          id='autocomplete-outlined'
          value={country||{value:"",label:""}}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          onChange={(event, newValue) => {
            setCountry(newValue);
            formik.setFieldValue('country', newValue?.value || '');
          }}
          renderInput={params => <TextField {...params} />}
          onBlur={formik.handleBlur}
        />
        {formik.touched.country && formik.errors.country ? (
          <FormHelperText error>{formik.errors.country}</FormHelperText>
        ) : null}
      </FormControl>
      </Box>

      <Grid container columnSpacing={5} rowSpacing={3}>
        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.state-region')}
            placeholder={transl('location.form.state-region')}
            name="region"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.city')}
            placeholder={transl('location.form.city')}
            name="city"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.subcity')}
            placeholder={transl('location.form.subcity')}
            name="subcity"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.street')}
            placeholder={transl('location.form.street')}
            name="street"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.block_number')}
            placeholder={transl('location.form.block_number')}
            name="block_number"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.house_number')}
            placeholder={transl('location.form.house_number')}
            name="house_number"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.northing')}
            placeholder={transl('location.form.northing')}
            name="northing"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextBox
            fullWidth
            label={transl('location.form.easting')}
            placeholder={transl('location.form.easting')}
            name="easting"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddressForm;
