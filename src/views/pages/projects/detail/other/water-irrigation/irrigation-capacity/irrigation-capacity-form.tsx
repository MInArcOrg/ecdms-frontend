import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { IrrigationCapacity } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface IrrigationCapacityFormProps {
  formik: FormikProps<IrrigationCapacity>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const IrrigationCapacityForm: React.FC<IrrigationCapacityFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      {/* Designed Irrigation Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.irrigation-capacity.details.designed-irrigation-capacity')}
          placeholder={t('project.other.irrigation-capacity.details.designed-irrigation-capacity')}
          name="designed_irrigation_capacity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Actual Irrigation Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.irrigation-capacity.details.actual-irrigation-capacity')}
          placeholder={t('project.other.irrigation-capacity.details.actual-irrigation-capacity')}
          name="actual_irrigation_capacity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default IrrigationCapacityForm;
