import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { ReservoirInfo } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ReservoirFormProps {
  formik: FormikProps<ReservoirInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ReservoirForm: React.FC<ReservoirFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      {/* Dam Volume */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.dam-volume')}
          placeholder={t('project.other.reservoir-info.details.dam-volume')}
          name="dam_volume"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Total Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.total-capacity')}
          placeholder={t('project.other.reservoir-info.details.total-capacity')}
          name="total_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Active Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.active-capacity')}
          placeholder={t('project.other.reservoir-info.details.active-capacity')}
          name="active_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Inactive Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.inactive-capacity')}
          placeholder={t('project.other.reservoir-info.details.inactive-capacity')}
          name="inactive_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Catchment Area */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.catchment-area')}
          placeholder={t('project.other.reservoir-info.details.catchment-area')}
          name="catchment_area"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Surface Area */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.reservoir-info.details.surface-area')}
          placeholder={t('project.other.reservoir-info.details.surface-area')}
          name="surface_area"
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

export default ReservoirForm;
