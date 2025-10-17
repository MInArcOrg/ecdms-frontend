import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySubBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';

interface RailwaySubBallastEnvironmentalAndOtherFactorFormProps {
  formik: FormikProps<RailwaySubBallastEnvironmentalAndOtherFactor>;
}

const RailwaySubBallastEnvironmentalAndOtherFactorForm: React.FC<RailwaySubBallastEnvironmentalAndOtherFactorFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_compliance_measures')}
          placeholder={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_compliance_measures')}
          name="environmental_compliance_measures"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_impact_assessment')}
          placeholder={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_impact_assessment')}
          name="environmental_impact_assessment"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.remark')}
          placeholder={t('project.other.railway-sub-ballast-environmental-and-other-factor.details.remark')}
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

export default RailwaySubBallastEnvironmentalAndOtherFactorForm;
