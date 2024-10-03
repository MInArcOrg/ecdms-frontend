import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderTraining, TrainingType } from 'src/types/stakeholder/stakeholder-training';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StakeholderTrainingFormProps {
  formik: FormikProps<StakeholderTraining>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderTrainingForm: React.FC<StakeholderTrainingFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Title Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.title')}
          placeholder={transl('stakeholder.stakeholder-training.form.title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Training Field */}
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.type')}
          placeholder={transl('stakeholder.stakeholder-training.form.type')}
          name="type"
          size="small"
          sx={{ mb: 2 }}
          options={
            Object.values(TrainingType)?.map((trainingType) => ({
              value: trainingType,
              label: trainingType
            })) || []
          }
        />
      </Grid>

      {/* Provider Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.provider')}
          placeholder={transl('stakeholder.stakeholder-training.form.provider')}
          name="provider"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Date of Issue */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.provision-date')}
          name="provision_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="provision_date" />}
        />
      </Grid>

      {/* Quantity Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.quantity')}
          placeholder={transl('stakeholder.stakeholder-training.form.quantity')}
          name="quantity"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-training.form.description')}
          placeholder={transl('stakeholder.stakeholder-training.form.description')}
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

export default StakeholderTrainingForm;
