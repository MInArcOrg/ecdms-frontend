import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderPhone } from 'src/types/stakeholder';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderPhoneFormProps {
  formik: FormikProps<StakeholderPhone>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderPhoneForm: React.FC<StakeholderPhoneFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  console.log('values', formik.values);
  return (
    <Grid container spacing={3}>
      {/* Pone Field */}
      <Grid item xs={12}>
        <CustomPhoneInput
          name="phone"
          size="small"
          label={transl('stakeholder.stakeholder-phone.form.phone')}
          placeholder={transl('stakeholder.stakeholder-phone.form.phone')}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StakeholderPhoneForm;
