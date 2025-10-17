import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileModel } from 'src/types/general/file';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectFileFormProps {
  formik: FormikProps<FileModel>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectFileForm: React.FC<ProjectFileFormProps> = ({ file, onFileChange }) => {
  const { t: transl } = useTranslation();
  // Handle value change and update the corresponding field

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-file.form.description')}
          placeholder={transl('project.project-file.form.description')}
          name="description"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectFileForm;
