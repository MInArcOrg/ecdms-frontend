import type React from 'react';
import { Box } from '@mui/material';
import type { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import type { ProjectConstructionType } from 'src/types/project/project-construction-type';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectConstructionTypeFormProps {
  formik: FormikProps<ProjectConstructionType>;
  defaultLocaleData?: ProjectConstructionType;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const ProjectConstructionTypeForm: React.FC<ProjectConstructionTypeFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.construction-type.construction-type')}
          name="construction_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t('project.construction-type.description')}
          name="description"
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

export default ProjectConstructionTypeForm;
