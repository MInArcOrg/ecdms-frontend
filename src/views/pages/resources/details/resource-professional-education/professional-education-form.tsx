import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ProfessionalEducation } from 'src/types/resource';
import type { StudyField } from 'src/types/general/general-master';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EducationFormProps {
  formik: FormikProps<ProfessionalEducation>;
  studyFields: StudyField[];
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ formik, studyFields, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('resources.professional.education.study-field')}
          name="study_field"
          options={
            studyFields?.map((field) => ({
              value: field.id,
              label: field.title
            })) || []
          }
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.education.school-name')} name="school_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('resources.professional.education.education-level')}
          name="education_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('resources.professional.education.program-type')}
          name="program_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('resources.professional.education.start-date')} name="start_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('resources.professional.education.end-date')} name="end_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('resources.professional.education.gpa')} name="gpa" type="number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default EducationForm;
