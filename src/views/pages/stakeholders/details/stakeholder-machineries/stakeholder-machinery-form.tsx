import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import moment from 'moment';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderMachinery } from 'src/types/stakeholder/stakeholder-machinery';
import { generateYears } from 'src/utils/genertor/date';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface MachineryFormProps {
  formik: FormikProps<StakeholderMachinery>;
}

const MachineryForm: React.FC<MachineryFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const years = generateYears(1990, moment().year()).map((year) => ({ label: year.toString(), value: year.toString() }));
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.plate-no')} name="plate_no" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.brand-name')} name="brand_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.model')} name="model" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomSelectBox options={years} fullWidth label={t('stakeholder.machinery.year')} name="year" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox allowSpecialChars={true} fullWidth label={t('stakeholder.machinery.chassis-number')} name="chassis_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.engine-number')} name="engine_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.capacity')} name="capacity" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.purpose')} name="purpose" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.quantity')} name="quantity" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.machinery.current-situation')}
          name="current_situation"
          size="small"
          sx={{ mb: 2 }}
          multiline={true}
          rows={4}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.latitude')} name="latitude" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.machinery.longitude')} name="longitude" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default MachineryForm;
