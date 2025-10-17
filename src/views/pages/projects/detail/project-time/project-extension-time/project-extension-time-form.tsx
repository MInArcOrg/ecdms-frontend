import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ProjectExtensionTime } from 'src/types/project/project-time';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectExtensionTimeFormProps {
  formik: FormikProps<ProjectExtensionTime>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectExtensionTimeForm: React.FC<ProjectExtensionTimeFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-extension-time.form.number-of-days')}
          placeholder={transl('project.project-extension-time.form.number-of-days')}
          name="number_of_days"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-extension-time.form.reason')}
          placeholder={transl('project.project-extension-time.form.reason')}
          name="reason"
          multiline
          rows="4"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectExtensionTimeForm;
