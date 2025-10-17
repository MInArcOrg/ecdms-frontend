'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { SolarResourceInformation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SolarResourceInformationFormProps {
  formik: FormikProps<SolarResourceInformation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const SolarResourceInformationForm: React.FC<SolarResourceInformationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.solar-resource-information.resource-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-resource-information.details.annual-solar-radiation')}
              placeholder={transl('project.other.solar-resource-information.details.annual-solar-radiation')}
              name="annual_solar_radiation"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.kwh-per-m2')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-resource-information.details.solar-panel-efficiency')}
              placeholder={transl('project.other.solar-resource-information.details.solar-panel-efficiency')}
              name="solar_panel_efficiency"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.percentage')}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-resource-information.details.annual-energy-production')}
              placeholder={transl('project.other.solar-resource-information.details.annual-energy-production')}
              name="annual_energy_production"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.mwh')}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.solar-resource-information.details.plant-life')}
              placeholder={transl('project.other.solar-resource-information.details.plant-life')}
              name="plant_life"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.years')}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.solar-resource-information.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.solar-resource-information.details.remark')}
          placeholder={transl('project.other.solar-resource-information.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default SolarResourceInformationForm;
