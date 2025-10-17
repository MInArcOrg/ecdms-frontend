'use client';

import { Grid, Typography, Divider } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { GeothermalPowerWell } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';

interface GeothermalPowerWellFormProps {
  formik: FormikProps<GeothermalPowerWell>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const GeothermalPowerWellForm: React.FC<GeothermalPowerWellFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-well.details.wells-name')}
          placeholder={transl('project.other.geothermal-power-well.details.wells-name')}
          name="wells_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-well.details.wells-number')}
          placeholder={transl('project.other.geothermal-power-well.details.wells-number')}
          name="wells_number"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.geothermal-power-well.well-specifications')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.geothermal-power-well.details.depth')}
              placeholder={transl('project.other.geothermal-power-well.details.depth')}
              name="depth"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.geothermal-power-well.details.well-diameter')}
              placeholder={transl('project.other.geothermal-power-well.details.well-diameter')}
              name="well_diameter"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomDatePicker
              fullWidth
              label={transl('project.other.geothermal-power-well.details.drilling-period')}
              placeholder={transl('project.other.geothermal-power-well.details.drilling-period')}
              name="drilling_period"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.geothermal-power-well.details.temperature-at-bottom-hole')}
              placeholder={transl('project.other.geothermal-power-well.details.temperature-at-bottom-hole')}
              name="temperature_at_bottom_hole"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-well.details.plant-life')}
          placeholder={transl('project.other.geothermal-power-well.details.plant-life')}
          name="plant_life"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('project.other.geothermal-power-well.details.remark')}
          placeholder={transl('project.other.geothermal-power-well.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default GeothermalPowerWellForm;
