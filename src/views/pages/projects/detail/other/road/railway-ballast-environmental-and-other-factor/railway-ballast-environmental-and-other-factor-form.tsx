import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import { RailwayBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';

interface RailwayBallastEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwayBallastEnvironmentalAndOtherFactor>;
}

const RailwayBallastEnvironmentalAndOtherFactorForm: React.FC<RailwayBallastEnvironmentalAndOtherFactorFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-environmental-and-other-factor.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast-environmental-and-other-factor.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-compliance-measures')}
          placeholder={t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-compliance-measures')}
          name="environmental_compliance_measures"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-impact-assessment')}
          placeholder={t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-impact-assessment')}
          name="environmental_impact_assessment"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-environmental-and-other-factor.details.remark')}
          placeholder={t('project.other.railway-ballast-environmental-and-other-factor.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayBallastEnvironmentalAndOtherFactorForm;
