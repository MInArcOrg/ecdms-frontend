import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import {
  RailwaySubBallastMaintenanceAndRenewal // Updated type import
} from 'src/types/project/other';
// Removed unused CustomSelectBox import as there are no enums for select for this model in the form
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwaySubBallastMaintenanceAndRenewalFormProps { // Renamed interface
  formik: FormikProps<RailwaySubBallastMaintenanceAndRenewal>; // Updated prop type
}

const RailwaySubBallastMaintenanceAndRenewalForm: React.FC<RailwaySubBallastMaintenanceAndRenewalFormProps> = ({ formik }) => { // Renamed component
  const { t } = useTranslation();

  // Removed enumToOptions as it's no longer used with the new model's fields
  // console.log('formik errors', formik.errors); // Consider removing this console.log in production

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* scheduled_maintenance_activities */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.scheduled_maintenance_activities')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.scheduled_maintenance_activities')}
          name="scheduled_maintenance_activities"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* sub_ballast_renewal_history */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.sub_ballast_renewal_history')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.sub_ballast_renewal_history')}
          name="sub_ballast_renewal_history"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        {/* recent_maintenance_dates */}
        <CustomDynamicDatePicker
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.recent_maintenance_dates')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.recent_maintenance_dates')}
          name="recent_maintenance_dates"
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="recent_maintenance_dates" />}
        />

        {/* inspection_reports_findings */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.inspection_reports_findings')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.inspection_reports_findings')}
          name="inspection_reports_findings"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />

        {/* remark */}
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.remark')}
          placeholder={t('project.other.railway-sub-ballast-maintenance-and-renewal.details.remark')}
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

export default RailwaySubBallastMaintenanceAndRenewalForm; // Renamed export