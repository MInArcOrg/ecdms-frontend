import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import moment from 'moment';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { SafetyEquipment } from 'src/types/stakeholder/stakeholder-safety-equipment';
import { generateYears } from 'src/utils/genertor/date';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface SafetyEquipmentFormProps {
  formik: FormikProps<SafetyEquipment>;
}

const SafetyEquipmentForm: React.FC<SafetyEquipmentFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  const years = generateYears(1990, moment().year()).map((year) => ({ label: year.toString(), value: year.toString() }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.serial-no')} name="serial_no" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.brand-name')} name="brand_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.model')} name="model" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomSelectBox options={years} fullWidth label={t('stakeholder.safety-equipment.year')} name="year" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.capacity')} name="capacity" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.purpose')} name="purpose" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.safety-equipment.quantity')}
          name="quantity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.safety-equipment.current-situation')}
          name="current_situation"
          size="small"
          sx={{ mb: 2 }}
          multiline={true}
          rows={4}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.latitude')} name="latitude" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t('stakeholder.safety-equipment.longitude')} name="longitude" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default SafetyEquipmentForm;
