import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { WaterIrrigationDam } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface WaterIrrigationDamFormProps {
  formik: FormikProps<WaterIrrigationDam>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const WaterIrrigationDamForm: React.FC<WaterIrrigationDamFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      {/* Designed Irrigation Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.dam-volume')}
          placeholder={t('project.other.water-irrigation-dam.details.dam-volume')}
          name="dam_volume" // Changed to dam_volume according to the interface
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Actual Irrigation Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.total-capacity')}
          placeholder={t('project.other.water-irrigation-dam.details.total-capacity')}
          name="total_capacity" // Changed to total_capacity according to the interface
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Active Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.active-capacity')}
          placeholder={t('project.other.water-irrigation-dam.details.active-capacity')}
          name="active_capacity" // Added field for active_capacity
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Inactive Capacity */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.inactive-capacity')}
          placeholder={t('project.other.water-irrigation-dam.details.inactive-capacity')}
          name="inactive_capacity" // Added field for inactive_capacity
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Catchment Area */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.catchment-area')}
          placeholder={t('project.other.water-irrigation-dam.details.catchment-area')}
          name="catchment_area" // Added field for catchment_area
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      {/* Surface Area */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.water-irrigation-dam.details.surface-area')}
          placeholder={t('project.other.water-irrigation-dam.details.surface-area')}
          name="surface_area" // Added field for surface_area
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

export default WaterIrrigationDamForm;
