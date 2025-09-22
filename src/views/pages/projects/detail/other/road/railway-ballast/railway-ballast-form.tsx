import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwayBallast } from 'src/types/project/other';

interface RailwayBallastFormProps {
  formik: FormikProps<RailwayBallast>;
}

const RailwayBallastForm: React.FC<RailwayBallastFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* railway_ballast_name */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast.details.railway-ballast-name')}
          placeholder={t('project.other.railway-ballast.details.railway-ballast-name')}
          name="railway_ballast_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_id_no */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast.details.ballast-id-no')}
          placeholder={t('project.other.railway-ballast.details.ballast-id-no')}
          name="ballast_id_no"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_construction_cost */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast.details.ballast-construction-cost')}
          placeholder={t('project.other.railway-ballast.details.ballast-construction-cost')}
          name="ballast_construction_cost"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* remark */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-ballast.details.remark')}
          placeholder={t('project.other.railway-ballast.details.remark')}
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

export default RailwayBallastForm;
