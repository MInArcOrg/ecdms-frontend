import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import stakeholderOtherApiService from 'src/services/stakeholder/stakeholder-other-service';
import { StakeholderStudyField, StudyPeriodCost } from 'src/types/stakeholder/other';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface StudyPeriodCostFormProps {
  formik: FormikProps<StudyPeriodCost>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StudyPeriodCostForm: React.FC<StudyPeriodCostFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  const { data: studyFields } = useQuery({
    queryKey: ['general-master', 'study-fields'],
    queryFn: () =>
      stakeholderOtherApiService<StakeholderStudyField>().getAll('stakeholderstudyfield', { pagination: { page: 1, pageSize: 100 } })
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomSelect
          size="small"
          sx={{ mb: 2 }}
          name="stakeholderstudyfield_id"
          label={transl('stakeholder.other.study-period-cost.details.study-field')}
          placeholder={transl('stakeholder.other.study-period-cost.details.study-field')}
          options={
            studyFields?.payload.map((field) => ({
              value: field.id,
              label: field.studyfield?.title
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.study-period-cost.details.total-month')}
          placeholder={transl('stakeholder.other.study-period-cost.details.total-month')}
          name="total_month"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.study-period-cost.details.study-cost')}
          placeholder={transl('stakeholder.other.study-period-cost.details.study-cost')}
          name="study_cost"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.other.study-period-cost.details.description')}
          placeholder={transl('stakeholder.other.study-period-cost.details.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StudyPeriodCostForm;
