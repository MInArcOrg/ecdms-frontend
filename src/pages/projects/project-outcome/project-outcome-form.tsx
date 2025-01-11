import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectOutcomeFormProps {
  formik: FormikProps<ProjectOutcome>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectOutcomeForm: React.FC<ProjectOutcomeFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.outcome.construction-type')}
          placeholder={transl('project.outcome.construction-type')}
          name="construction_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.outcome.function')}
          placeholder={transl('project.outcome.function')}
          name="function"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.outcome.lesson-learned')}
          placeholder={transl('project.outcome.lesson-learned')}
          name="lesson_learned"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectOutcomeForm;