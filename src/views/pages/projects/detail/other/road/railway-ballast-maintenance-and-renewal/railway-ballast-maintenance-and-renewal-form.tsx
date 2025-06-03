import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

import {
  RailwayBallastMaintenanceAndRenewal, // Updated type import
  ScheduledMaintenanceActivities, // Added enum import
} from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';

interface RailwayBallastMaintenanceAndRenewalFormProps { // Renamed interface
  formik: FormikProps<RailwayBallastMaintenanceAndRenewal>; // Updated prop type
}

const RailwayBallastMaintenanceAndRenewalForm: React.FC<RailwayBallastMaintenanceAndRenewalFormProps> = ({ formik }) => { // Renamed component
  const { t } = useTranslation();

  // Helper function to convert enum to select box options
  const enumToOptions = (enumObject: Record<string, string>) =>
    Object.values(enumObject).map((value) => ({ label: value, value: value }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-maintenance-and-renewal.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast-maintenance-and-renewal.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* scheduled_maintenance_activities */}
        <CustomSelectBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-maintenance-and-renewal.details.scheduled-maintenance-activities')}
          placeholder={t('project.other.railway-ballast-maintenance-and-renewal.details.scheduled-maintenance-activities')}
          name="scheduled_maintenance_activities"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(ScheduledMaintenanceActivities)}
        />

        {/* recent_maintenance_dates */}
        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-ballast-maintenance-and-renewal.details.recent-maintenance-dates')}
          placeholder={t('project.other.railway-ballast-maintenance-and-renewal.details.recent-maintenance-dates')}
          name="recent_maintenance_dates"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="recent_maintenance_dates" />}
        />

        {/* inspection_reports_findings */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-maintenance-and-renewal.details.inspection-reports-findings')}
          placeholder={t('project.other.railway-ballast-maintenance-and-renewal.details.inspection-reports-findings')}
          name="inspection_reports_findings"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

        {/* remark */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-ballast-maintenance-and-renewal.details.remark')}
          placeholder={t('project.other.railway-ballast-maintenance-and-renewal.details.remark')}
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

export default RailwayBallastMaintenanceAndRenewalForm; // Renamed component export