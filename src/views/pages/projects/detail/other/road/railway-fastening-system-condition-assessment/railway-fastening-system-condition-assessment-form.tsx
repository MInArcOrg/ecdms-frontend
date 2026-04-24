import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import type { RailwayFasteningSystemConditionAssessment } from 'src/types/project/other';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface RailwayFasteningSystemConditionAssessmentFormProps {
  formik: FormikProps<RailwayFasteningSystemConditionAssessment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RailwayFasteningSystemConditionAssessmentForm: React.FC<RailwayFasteningSystemConditionAssessmentFormProps> = ({
  formik,
  file,
  onFileChange
}) => {
  const { t } = useTranslation();

  const conditionRatingOptions = ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'].map((value) => ({
    value,
    label: t(`common.options.${value.toLowerCase()}`)
  }));

  const defectPresenceOptions = ['Cracks', 'Corrosion', 'Loose', 'Missing', 'Deformed', 'Other'].map((value) => ({
    value,
    label: t(`common.options.${value.toLowerCase()}`)
  }));

  const booleanOptions = [
    { value: true, label: t('common.options.yes') },
    { value: false, label: t('common.options.no') }
  ];

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.railway_line_section_name')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.railway_line_section_name')}
          name="railway_line_section_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomDynamicDatePicker
          label={t('project.other.railway-fastening-system-condition-assessment.details.inspection_date')}
          name="inspection_date"
          fullWidth
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="inspection_date" />}
        />
        <CustomSelect
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.fastening_system_condition_rating')}
          name="fastening_system_condition_rating"
          options={conditionRatingOptions}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.defect_presence')}
          name="defect_presence"
          options={defectPresenceOptions}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.fastening_system_stability_and_alignment')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.fastening_system_stability_and_alignment')}
          name="fastening_system_stability_and_alignment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_model_number')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_model_number')}
          name="rail_fastening_model_number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_needed_quantity')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_needed_quantity')}
          name="rail_fastening_needed_quantity"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_expected_lifespan')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_expected_lifespan')}
          name="rail_fastening_expected_lifespan"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_availability')}
          name="rail_fastening_availability"
          options={booleanOptions}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-fastening-system-condition-assessment.details.remark')}
          placeholder={t('project.other.railway-fastening-system-condition-assessment.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayFasteningSystemConditionAssessmentForm;
