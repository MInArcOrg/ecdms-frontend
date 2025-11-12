import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { Professional } from 'src/types/resource/index';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';

interface ProfessionalFormProps {
  formik: FormikProps<Professional>;
}

const ProfessionalForm: React.FC<ProfessionalFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.firstName')} name="first_name" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.middleName')} name="middle_name" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.lastName')} name="last_name" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.nationalIdNo')} name="national_id_no" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomDatePicker fullWidth label={t('resources.professional.dateOfBirth')} name="date_of_birth" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox fullWidth label={t('resources.professional.gender')} name="gender" options={genderList(t)} size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput fullWidth label={t('resources.professional.phoneNo')} name="phone_no" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.email')} name="email" type='email' size="small" />
      </Grid>
    </Grid>
  );
};

export default ProfessionalForm;
