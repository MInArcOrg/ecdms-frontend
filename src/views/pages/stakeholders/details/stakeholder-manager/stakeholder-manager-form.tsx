import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';

interface ManagerFormProps {
  formik: FormikProps<StakeholderManager>;
}

const ManagerForm: React.FC<ManagerFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.firstName')} name="first_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.middleName')} name="middle_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.lastName')} name="last_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.department')} name="department" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.position')} name="position" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.nationality')} name="nationality" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholderManager.nationalIdNo')} name="national_id_no" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('stakeholderManager.birthDate')} name="birth_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox
          label={t('stakeholder.stakeholder-contact-person.form.gender')}
          placeholder={t('stakeholder.stakeholder-contact-person.form.gender')}
          name="gender"
          options={genderList(t)}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={t('stakeholder.stakeholder-contact-person.form.phone-number')}
          placeholder={t('stakeholder.stakeholder-contact-person.form.phone-number')}
          name="phone_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholderManager.email')} name="email" type="email" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholderManager.type')} name="type" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default ManagerForm;
