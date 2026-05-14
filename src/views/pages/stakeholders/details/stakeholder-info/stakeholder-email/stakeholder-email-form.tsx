import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderEmail } from 'src/types/stakeholder';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderEmailFormProps {
  formik: FormikProps<StakeholderEmail>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderEmailForm: React.FC<StakeholderEmailFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  console.log('values', formik.values);
  return (
    <Grid container spacing={3}>
      {/* Email Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.form.email')}
          placeholder={transl('stakeholder.form.email')}
          name="email"
          size="small"
          type="email"
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

export default StakeholderEmailForm;
