import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing, genderList } from 'src/configs/app-constants';
import type { Professional } from 'src/types/resource';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';

interface ManpowerFormProps {
  formik: FormikProps<Professional>;
}

const ManpowerForm: React.FC<ManpowerFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.fullName')} name="full_name" formatAsName={true} size="small" />
      </Grid>

      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.nationalIdNo')} name="national_id_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('resources.professional.dateOfBirth')} name="date_of_birth" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomRadioBox fullWidth label={t('resources.professional.gender')} name="gender" options={genderList(t)} size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomPhoneInput fullWidth label={t('resources.professional.phoneNo')} name="phone_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('resources.professional.email')} name="email" type="email" size="small" />
      </Grid>
    </Grid>
  );
};

export default ManpowerForm;
