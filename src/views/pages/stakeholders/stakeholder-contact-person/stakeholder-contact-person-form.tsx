import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { genderList } from 'src/configs/app-constants';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderContactPersonFormProps {
  formik: FormikProps<StakeholderContactPerson>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderContactPersonForm: React.FC<StakeholderContactPersonFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* First Name Field */}
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-contact-person.form.first-name')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.first-name')}
          name="first_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Middle Name Field */}
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-contact-person.form.middle-name')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.middle-name')}
          name="middle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Last Name Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-contact-person.form.last-name')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.last-name')}
          name="last_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Gender Field */}
      <Grid item xs={12}>
        <CustomRadioBox
          label={transl('stakeholder.stakeholder-contact-person.form.gender')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.gender')}
          name="gender"
          options={genderList(transl)}
        />
      </Grid>

      {/* Email Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-contact-person.form.email')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.email')}
          name="email"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Phone Number Field */}
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={transl('stakeholder.stakeholder-contact-person.form.phone-number')}
          placeholder={transl('stakeholder.stakeholder-contact-person.form.phone-number')}
          name="phone_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StakeholderContactPersonForm;
