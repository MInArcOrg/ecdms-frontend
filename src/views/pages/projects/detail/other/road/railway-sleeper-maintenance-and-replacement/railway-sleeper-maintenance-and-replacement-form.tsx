import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySleeperMaintenanceAndReplacement } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwaySleeperMaintenanceAndReplacementFormProps {
  formik: FormikProps<RailwaySleeperMaintenanceAndReplacement>;
}

const RailwaySleeperMaintenanceAndReplacementForm: React.FC<RailwaySleeperMaintenanceAndReplacementFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.scheduled_maintenance_activities')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.scheduled_maintenance_activities')}
          name="scheduled_maintenance_activities"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.recent_maintenance_date')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.recent_maintenance_date')}
          name="recent_maintenance_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="recent_maintenance_date" />}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.inspection_reports')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.inspection_reports')}
          name="inspection_reports"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.sleeper_replacement_history')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.sleeper_replacement_history')}
          name="sleeper_replacement_history"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-maintenance-and-replacement.details.remark')}
          placeholder={t('project.other.railway-sleeper-maintenance-and-replacement.details.remark')}
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

export default RailwaySleeperMaintenanceAndReplacementForm;
