import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';
import { UserContactPerson } from 'src/types/admin/user';

interface UserContactPersonFormProps {
  formik: FormikProps<UserContactPerson>;
}

const UserContactPersonForm: React.FC<UserContactPersonFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('department.user.contact-person.firstName')} name="first_name"
          formatAsName={true} size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('department.user.contact-person.middleName')} name="middle_name"
          formatAsName={true} size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('department.user.contact-person.lastName')} name="last_name"
          formatAsName={true} size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('department.user.contact-person.nationalIdNo')} name="national_id_no" size="small" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomRadioBox fullWidth label={t('department.user.contact-person.gender')} name="gender" options={genderList(t)} size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput fullWidth label={t('department.user.contact-person.phoneNo')} name="phone_no" size="small" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.contact-person.email')} name="email" type='email' size="small" />
      </Grid>
    </Grid>
  );
};

export default UserContactPersonForm;
