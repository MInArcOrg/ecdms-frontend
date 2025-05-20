import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface VehicleFormProps {
  formik: FormikProps<StakeholderVehicle>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.vehicle-name')} name="vehicle_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.plate-number')} name="plate_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.brand-name')} name="brand_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.model')} name="model" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.year')} name="year" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.chassis-number')} name="chassis_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.engine-number')} name="engine_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.capacity')} name="capacity" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.purpose')} name="purpose" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.quantity')} name="quantity" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.current-situation')} name="current_situation" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.location')} name="location" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default VehicleForm;
