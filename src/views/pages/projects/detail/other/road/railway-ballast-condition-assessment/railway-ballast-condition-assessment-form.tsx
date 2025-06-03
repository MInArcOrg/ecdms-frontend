import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import {
  BallastConditionRating,
  BallastDegradationIndicators,
  BallastDegradationRate,
  BallastQualityTestingMethod,
  DrainagePerformance,
  FoulingPresence,
  RailwayBallastConditionAssessment, // Updated type import
} from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwayBallastConditionAssessmentFormProps { // Renamed interface
  formik: FormikProps<RailwayBallastConditionAssessment>; // Updated prop type
}

const RailwayBallastConditionAssessmentForm: React.FC<RailwayBallastConditionAssessmentFormProps> = ({ formik }) => { // Renamed component
  const { t } = useTranslation();

  const enumToOptions = (enumObject: Record<string, string>) =>
    Object.values(enumObject).map((value) => ({ label: value, value: value }));
  console.log('formik errors', formik.errors);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        {/* railway_line_section_name */}
        <CustomTextBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.railway-line-section-name')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.railway-line-section-name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* inspection_dates */}
        <CustomDynamicDatePicker
          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.inspection-dates')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.inspection-dates')}
          name="inspection_dates"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="inspection_dates" />}
        />

        {/* ballast_condition_rating */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.ballast-condition-rating')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.ballast-condition-rating')}
          name="ballast_condition_rating"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(BallastConditionRating)}
        />

        {/* fouling_presence */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.fouling-presence')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.fouling-presence')}
          name="fouling_presence"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(FoulingPresence)}
        />

        {/* ballast_degradation_indicators */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-indicators')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-indicators')}
          name="ballast_degradation_indicators"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(BallastDegradationIndicators)}
        />

        {/* ballast_quality_testing_method */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.ballast-quality-testing-method')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.ballast-quality-testing-method')}
          name="ballast_quality_testing_method"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(BallastQualityTestingMethod)}
        />

        {/* testing_frequency */}
        <CustomTextBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.testing-frequency')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.testing-frequency')}
          name="testing_frequency"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />

        {/* ballast_resistance */}
        <CustomTextBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.ballast-resistance')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.ballast-resistance')}
          name="ballast_resistance"
          size="small"
          sx={{ mb: 2 }}
        />

        {/* ballast_degradation_rate */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-rate')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-rate')}
          name="ballast_degradation_rate"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(BallastDegradationRate)}
        />

        {/* drainage_performance */}
        <CustomSelectBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.drainage-performance')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.drainage-performance')}
          name="drainage_performance"
          size="small"
          sx={{ mb: 2 }}
          options={enumToOptions(DrainagePerformance)}
        />

        {/* remark */}
        <CustomTextBox

          fullWidth
          label={t('project.other.railway-ballast-condition-assessment.details.remark')}
          placeholder={t('project.other.railway-ballast-condition-assessment.details.remark')}
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

export default RailwayBallastConditionAssessmentForm; 