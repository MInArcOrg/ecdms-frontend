import { Box } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { ProjectChallenge } from 'src/types/project/project-challenge';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ProjectChallengeFormProps {
  formik: FormikProps<ProjectChallenge>;
  defaultLocaleData?: ProjectChallenge;
  projectId: string;
}

const ProjectChallengeForm: React.FC<ProjectChallengeFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <CustomTextBox fullWidth label={t('project.challenges.title')} name="title" size="small" sx={{ mb: 2 }} />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.challenges.description')}
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
          label={t('project.challenges.measures_taken')}
          name="measures_taken"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
    </>
  );
};

export default ProjectChallengeForm;
