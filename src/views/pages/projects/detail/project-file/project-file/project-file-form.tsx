import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ProjectFile } from 'src/types/project/project-file';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectFileFormProps {
  formik: FormikProps<ProjectFile>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectFileForm: React.FC<ProjectFileFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('Title')}
          placeholder={t('Title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('Description')}
          placeholder={t('Description')}
          name="description"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('Upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectFileForm;

