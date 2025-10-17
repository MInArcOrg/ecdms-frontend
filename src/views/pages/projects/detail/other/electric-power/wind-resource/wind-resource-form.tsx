'use client';

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { WindResource } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
// import { CustomCheckbox } from "src/views/shared/form/custom-radio-box"

interface WindResourceFormProps {
  formik: FormikProps<WindResource>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const WindResourceForm: React.FC<WindResourceFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.wind-resource.resource-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.wind-resource.details.wind-speed-at-hub-height')}
              placeholder={transl('project.other.wind-resource.details.wind-speed-at-hub-height')}
              name="wind_speed_at_hub_height"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl('common.meters-per-second')}
            />
          </Grid>

          {/* <Grid item xs={12}>
            <CustomCheckbox
              name="weibull_shape_factor"
              label={transl("project.other.wind-resource.details.weibull-shape-factor")}
            />
          </Grid> */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.weibull_shape_factor || false}
                  onChange={(e) => formik.setFieldValue('weibull_shape_factor', e.target.checked)}
                  name="weibull_shape_factor"
                />
              }
              label={transl('project.other.wind-resource.details.weibull-shape-factor')}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.wind-resource.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.wind-resource.details.remark')}
          placeholder={transl('project.other.wind-resource.details.remark')}
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

export default WindResourceForm;
