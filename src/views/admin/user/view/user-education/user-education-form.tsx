import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import { UserEducation } from 'src/types/admin/user';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { useQuery } from '@tanstack/react-query';
import { dropDownConfig } from 'src/configs/api-constants';

interface EducationFormProps {
  formik: FormikProps<UserEducation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();
      const { data: studyFields  } = useQuery({
        queryKey: ['roles'],
        queryFn: () => generalMasterDataApiService.getAll('study-fields',dropDownConfig())
      });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('department.user.education.study-field')}
          name="study_field_id"
          options={studyFields?.payload.map((field) => ({ value: field.id, label: field.title })) || []}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.education.school-name')} name="school_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('department.user.education.education-level')}
          name="education_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.education.program-type')} name="program_type" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('department.user.education.start-date')} name="start_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker fullWidth label={t('department.user.education.end-date')} name="end_date" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.education.gpa')} name="gpa" type="number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default EducationForm;
