import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { TransformerType } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TransformerTypeFormProps {
  formik: FormikProps<TransformerType>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const TransformerTypeForm: React.FC<TransformerTypeFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer-type.details.name')}
          placeholder={t('project.other.transformer-type.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer-type.details.description')}
          placeholder={t('project.other.transformer-type.details.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default TransformerTypeForm;
