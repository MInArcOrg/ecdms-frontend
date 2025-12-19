import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { generateYears } from 'src/utils/genertor/date';
import moment from 'moment';

interface VehicleFormProps {
  formik: FormikProps<StakeholderVehicle>;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const years = generateYears(1990, moment().year()).map((year) => ({ label: year.toString(), value: year.toString() }));
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-vehicle.form.vehicle-name')}
          name="vehicle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-vehicle.form.plate-number')}
          name="plate_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-vehicle.form.brand-name')}
          name="brand_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.model')} name="model" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomSelectBox options={years} fullWidth label={t('stakeholder.stakeholder-vehicle.form.year')} name="year" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          allowSpecialChars={true}
          fullWidth
          label={t('stakeholder.stakeholder-vehicle.form.chassis-number')}
          name="chassis_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          allowSpecialChars={true}
          label={t('stakeholder.stakeholder-vehicle.form.engine-number')}
          name="engine_number"
          size="small"
          sx={{ mb: 2 }}
        />
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
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-vehicle.form.current-situation')}
          name="current_situation"
          size="small"
          sx={{ mb: 2 }}
          multiline={true}
          rows={4}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.latitude')} name="latitude" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-vehicle.form.longitude')} name="longitude" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default VehicleForm;
