'use client';

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { RegulationAndPolicy } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RegulationAndPolicyFormProps {
  formik: FormikProps<RegulationAndPolicy>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RegulationAndPolicyForm: React.FC<RegulationAndPolicyFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl('project.other.regulation-and-policy.regulatory-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.regulation-and-policy.details.regulatory-body-overseeing-the-facility')}
              placeholder={transl('project.other.regulation-and-policy.details.regulatory-body-overseeing-the-facility')}
              name="regulatory_body_overseeing_the_facility"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.regulation-and-policy.compliance-details')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid item xs={12}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.regulatory_compliance_monitoring || false}
                  onChange={(e) => formik.setFieldValue('regulatory_compliance_monitoring', e.target.checked)}
                  name="regulatory_compliance_monitoring"
                />
              }
              label={transl('project.other.regulation-and-policy.details.regulatory-compliance-monitoring')}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.environmental_and_social_regulation_compliance_monitoring || false}
                  onChange={(e) => formik.setFieldValue('environmental_and_social_regulation_compliance_monitoring', e.target.checked)}
                  name="environmental_and_social_regulation_compliance_monitoring"
                />
              }
              label={transl('project.other.regulation-and-policy.details.environmental-and-social-regulation-compliance-monitoring')}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.licensing_and_permit_requirements || false}
                onChange={(e) => formik.setFieldValue('licensing_and_permit_requirements', e.target.checked)}
                name="licensing_and_permit_requirements"
              />
            }
            label={transl('project.other.regulation-and-policy.details.licensing-and-permit-requirements')}
          />
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl('project.other.regulation-and-policy.additional-information')}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl('project.other.regulation-and-policy.details.remark')}
          placeholder={transl('project.other.regulation-and-policy.details.remark')}
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

export default RegulationAndPolicyForm;
