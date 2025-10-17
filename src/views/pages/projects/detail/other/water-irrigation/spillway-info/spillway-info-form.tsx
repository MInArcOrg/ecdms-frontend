import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { SpillwayInfo } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ReservoirFormProps {
  formik: FormikProps<SpillwayInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ReservoirForm: React.FC<ReservoirFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      {/* Name */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.spillway-info.details.name')}
          placeholder={t('project.other.spillway-info.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Type */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.spillway-info.details.type')}
          placeholder={t('project.other.spillway-info.details.type')}
          name="type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Quantity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.spillway-info.details.quantity')}
          placeholder={t('project.other.spillway-info.details.quantity')}
          name="quantity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Specifications */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.spillway-info.details.specifications')}
          placeholder={t('project.other.spillway-info.details.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.spillway-info.details.capacity')}
          placeholder={t('project.other.spillway-info.details.capacity')}
          name="capacity"
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
