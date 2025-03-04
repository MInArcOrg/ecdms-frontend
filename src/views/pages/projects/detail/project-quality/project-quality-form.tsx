import { Box } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ProjectQuality } from 'src/types/project/project-quality';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectQualityFormProps {
  formik: FormikProps<ProjectQuality>;
  defaultLocaleData?: ProjectQuality;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ProjectQualityForm: React.FC<ProjectQualityFormProps> = ({
  formik,
  file,
  onFileChange,
  projectId,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.quality.major-quality-problem-encountered')}
          name="major_quality_problem_encountered"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.quality.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.quality.measures-taken')}
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
          label={t('project.quality.lesson-learned')}
          name="lesson_learned"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
      <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
    </>
  );
};

export default ProjectQualityForm;