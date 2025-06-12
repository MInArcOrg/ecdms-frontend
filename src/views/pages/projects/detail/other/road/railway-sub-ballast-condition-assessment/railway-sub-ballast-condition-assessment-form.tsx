import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

import {
  RailwaySubBallastConditionAssessment
} from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { useQuery } from '@tanstack/react-query';
import { dropDownConfig } from 'src/configs/api-constants';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwaySubBallastConditionAssessmentFormProps {
  formik: FormikProps<RailwaySubBallastConditionAssessment>;
}

const RailwaySubBallastConditionAssessmentForm: React.FC<RailwaySubBallastConditionAssessmentFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  const { data: subBallastMaterialTypeOptions } = useQuery({
    queryKey: [projectMasterModels.subBallastMaterialType.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: projectMasterModels.subBallastMaterialType.model
          }
        })
      )
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.railway_line_section_name')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_material_type_id')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_material_type_id')}
          name="sub_ballast_material_type_id"
          size="small"
          options={subBallastMaterialTypeOptions?.payload.map(item => ({ value: item.id, label: item.title })) || []}
          sx={{ mb: 2 }}
        />

        <CustomDynamicDatePicker
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.inspection_dates')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.inspection_dates')}
          name="inspection_dates"
          size="small"
          sx={{ mb: 2 }}
          customInput={<CustomTextBox name="inspection_dates" />}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_condition_rating')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_condition_rating')}
          name="sub_ballast_condition_rating"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.cracking_observations')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.cracking_observations')}
          name="cracking_observations"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.erosion_issues')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.erosion_issues')}
          name="erosion_issues"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.unwanted_vegetation_presence')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.unwanted_vegetation_presence')}
          name="unwanted_vegetation_presence"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          type="number"
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.testing_frequency_per_year')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.testing_frequency_per_year')}
          name="testing_frequency_per_year"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_resistance')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_resistance')}
          name="sub_ballast_resistance"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_degradation_rate')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_degradation_rate')}
          name="sub_ballast_degradation_rate"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.drainage_performance')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.drainage_performance')}
          name="drainage_performance"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          formik={formik}
          fullWidth
          label={t('project.other.railway-sub-ballast-condition-assessment.details.remark')}
          placeholder={t('project.other.railway-sub-ballast-condition-assessment.details.remark')}
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

export default RailwaySubBallastConditionAssessmentForm;