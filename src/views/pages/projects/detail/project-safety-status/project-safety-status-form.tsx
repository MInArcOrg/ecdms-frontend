import { Box } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ProjectSafetyStatus } from 'src/types/project/project-safety-status ';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectSafetyStatusFormProps {
  formik: FormikProps<ProjectSafetyStatus>;
  defaultLocaleData?: ProjectSafetyStatus;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ProjectSafetyStatusForm: React.FC<ProjectSafetyStatusFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.safety-status.fatal-injuries')}
          name="no_of_fatal_injuries"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.safety-status.major-injuries')}
          name="no_of_major_injuries"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.safety-status.minor-injuries')}
          name="no_of_minor_injuries"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.safety-status.measures-taken')}
          name="measures_taken"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.safety-status.lesson-learned')}
          name="lesson_learned"
          multiline
          rows={3}
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default ProjectSafetyStatusForm;
