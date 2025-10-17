import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import type { RailwaySleeperConditionAssessment } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwaySleeperConditionAssessmentFormProps {
  formik: FormikProps<RailwaySleeperConditionAssessment>;
}

const RailwaySleeperConditionAssessmentForm: React.FC<RailwaySleeperConditionAssessmentFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-track-condition-assessment.details.inspection-dates')}
          name="inspection_dates"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="inspection_dates" />}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.sleeper_condition_rating')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.sleeper_condition_rating')}
          name="sleeper_condition_rating"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.defect_presence')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.defect_presence')}
          name="defect_presence"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.sleeper_stability_and_alignment')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.sleeper_stability_and_alignment')}
          name="sleeper_stability_and_alignment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.sleepers_required_number')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.sleepers_required_number')}
          name="sleepers_required_number"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.supplier_name')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.supplier_name')}
          name="supplier_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.supplier_phone')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.supplier_phone')}
          name="supplier_phone"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-sleeper-condition-assessment.details.remark')}
          placeholder={t('project.other.railway-sleeper-condition-assessment.details.remark')}
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

export default RailwaySleeperConditionAssessmentForm;
