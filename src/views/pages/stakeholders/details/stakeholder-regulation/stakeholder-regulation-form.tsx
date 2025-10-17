import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderRegulation } from 'src/types/stakeholder/stakeholder-regulation';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderRegulationFormProps {
  formik: FormikProps<StakeholderRegulation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderRegulationForm: React.FC<StakeholderRegulationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Title Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-regulation.form.title')}
          placeholder={transl('stakeholder.stakeholder-regulation.form.title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Provider Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-regulation.form.prepared-by')}
          placeholder={transl('stakeholder.stakeholder-regulation.form.prepared-by')}
          name="prepared_by" // Changed to prepared_by
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Effective Start Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-regulation.form.effective_start_date')}
          name="effective_start_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="effective_start_date" />}
        />
      </Grid>

      {/* Effective End Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-regulation.form.effective_end_date')}
          name="effective_end_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="effective_end_date" />}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-regulation.form.description')}
          placeholder={transl('stakeholder.stakeholder-regulation.form.description')}
          name="description"
          multiline
          rows="4"
          sx={{ mb: 2 }}
          value={formik.values.description}
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

export default StakeholderRegulationForm;
