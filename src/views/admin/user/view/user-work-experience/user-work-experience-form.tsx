import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import { UserWorkExperience } from 'src/types/admin/user';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { useQuery } from '@tanstack/react-query';
import { dropDownConfig } from 'src/configs/api-constants';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface WorkExperienceFormProps {
  formik: FormikProps<UserWorkExperience>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.work-experience.company-name')} name="company_name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.work-experience.department')} name="department" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.work-experience.position')} name="position" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('department.user.work-experience.task-description')} rows="3" multiline={true} name="task_description" size="small" sx={{ mb: 2 }} />
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
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default WorkExperienceForm;
