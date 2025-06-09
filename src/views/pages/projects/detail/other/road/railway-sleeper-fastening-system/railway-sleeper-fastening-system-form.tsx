import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySleeperFasteningSystem } from 'src/types/project/other';

interface RailwaySleeperFasteningSystemFormProps {
  formik: FormikProps<RailwaySleeperFasteningSystem>;
}

const RailwaySleeperFasteningSystemForm: React.FC<RailwaySleeperFasteningSystemFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-fastening-system.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sleeper-fastening-system.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-fastening-system.details.used_fastening_systems_type')}
          placeholder={t('project.other.railway-sleeper-fastening-system.details.used_fastening_systems_type')}
          name="used_fastening_systems_type"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-fastening-system.details.fastener_condition_assessment')}
          placeholder={t('project.other.railway-sleeper-fastening-system.details.fastener_condition_assessment')}
          name="fastener_condition_assessment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-fastening-system.details.remark')}
          placeholder={t('project.other.railway-sleeper-fastening-system.details.remark')}
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

export default RailwaySleeperFasteningSystemForm;