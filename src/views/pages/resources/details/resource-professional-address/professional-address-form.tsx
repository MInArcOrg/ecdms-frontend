import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { ProfessionalAddress } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface AddressFormProps {
  formik: FormikProps<ProfessionalAddress>;
}

const AddressForm: React.FC<AddressFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.country')} name="country" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.region')} name="region" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.city')} name="city" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.sub_city')} name="sub_city" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.woreda')} name="woreda" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.street')} name="street" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.block_no')} name="block_no" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.website')} name="website" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.northing')} name="northing" type="number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomTextBox fullWidth label={t('professional.address.easting')} name="easting" type="number" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default AddressForm;
