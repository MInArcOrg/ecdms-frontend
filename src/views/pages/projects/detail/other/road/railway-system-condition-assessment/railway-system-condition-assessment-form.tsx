import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwaySystemConditionAssessment } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSwitch from 'src/views/shared/form/custom-switch';

interface RailwaySystemConditionAssessmentFormProps {
  formik: FormikProps<RailwaySystemConditionAssessment>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
}

const RailwaySystemConditionAssessmentForm: React.FC<RailwaySystemConditionAssessmentFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange
}) => {
  const { t } = useTranslation();
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-system-condition-assessment.details.railway_line_section_name')}
          placeholder={t('project.other.railway-system-condition-assessment.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-system-condition-assessment.details.system_condition_rating_or_assessment')}
          placeholder={t('project.other.railway-system-condition-assessment.details.system_condition_rating_or_assessment')}
          name="system_condition_rating_or_assessment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          name="defect_presence"
          label={t('project.other.railway-system-condition-assessment.details.defect_presence')}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-system-condition-assessment.details.system_performance_indicators')}
          placeholder={t('project.other.railway-system-condition-assessment.details.system_performance_indicators')}
          name="system_performance_indicators"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-system-condition-assessment.details.power_supply_systems_and_communication')}
          placeholder={t('project.other.railway-system-condition-assessment.details.power_supply_systems_and_communication')}
          name="power_supply_systems_and_communication"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={2}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-system-condition-assessment.details.remark')}
          placeholder={t('project.other.railway-system-condition-assessment.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwaySystemConditionAssessmentForm;
