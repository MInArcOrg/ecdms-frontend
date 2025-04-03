import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { UserEducation } from 'src/types/admin/user';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface EducationFormProps {
  formik: FormikProps<UserEducation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();
  const { data: studyFields } = useQuery({
    queryKey: ['roles'],
    queryFn: () => generalMasterDataApiService.getAll('study-fields', dropDownConfig())
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

      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={t('department.user.education.start-date')}
          name="start_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="start_date" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={t('department.user.education.end-date')}
          name="end_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="end_date" />}
        />
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
