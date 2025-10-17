import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import countriesList from 'src/constants/countries';
import { StakeholderOperationLocation } from 'src/types/stakeholder/stakeholder-operation-location';
import CustomAutocomplete from 'src/views/shared/form/custom-autocomplete';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderOperationLocationFormProps {
  formik: FormikProps<StakeholderOperationLocation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderOperationLocationForm: React.FC<StakeholderOperationLocationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  console.log('values', formik.values);
  return (
    <Grid container spacing={3}>
      {/* Country Field */}
      <Grid item xs={12}>
        <CustomAutocomplete
          label={transl('stakeholder.stakeholder-operation-location.form.country')}
          placeholder={transl('stakeholder.stakeholder-operation-location.form.country')}
          name="country"
          size="small"
          options={countriesList.map((country) => ({
            value: country.title,
            label: country.title
          }))}
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Status Switch */}
      <Grid item xs={12}>
        <CustomSwitch
          label={transl('stakeholder.stakeholder-operation-location.form.status')}
          name="status"
          checked={formik.values.status || false}
          onChange={formik.handleChange}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StakeholderOperationLocationForm;
