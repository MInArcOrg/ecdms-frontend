import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { stakeholderMasterModels } from 'src/constants/master-data/stakeholder-general-master-constants';
import stakeholderGeneralMasterDataApiService from 'src/services/general/stakeholder-general-master-data-service';
import type { ProfessionalEducation } from 'src/types/resource';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EducationFormProps {
  formik: FormikProps<ProfessionalEducation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  const { data: studyFields } = useQuery({
    queryKey: ['study-fields', stakeholderMasterModels.studyfield.model],
    queryFn: () =>
      stakeholderGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: {
            model: stakeholderMasterModels.studyfield.model
          }
        })
      )
  });


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('resources.professional.education.study-field')}
          name="study_field_id"
          options={
            studyFields?.payload?.map((field) => ({
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
        <CustomSelectBox
          fullWidth
          label={t('resources.professional.education.program-type')}
          name="program_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            studyFields?.payload?.map((field) => ({
              value: field.id,
              label: field.title
            })) || []
          }
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
