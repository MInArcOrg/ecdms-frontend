import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiService from 'src/services/project/project-other-service';
import { Transformer, TransformerType } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TransformerFormProps {
  formik: FormikProps<Transformer>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const TransformerForm: React.FC<TransformerFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();
  const { data: transformerTypes } = useQuery({
    queryKey: ['transformertype', projectId],
    queryFn: () =>
      projectOtherApiService<TransformerType>().getAll('transformertype', {
        filter: { project_id: projectId }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          size="small"
          name="transformertype_id"
          label={t('project.other.transformer.details.transformertype')}
          options={
            transformerTypes?.payload?.map((projectCategory) => ({
              value: projectCategory.id,
              label: projectCategory.name
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.specifications')}
          placeholder={t('project.other.transformer.details.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.input-current')}
          placeholder={t('project.other.transformer.details.input-current')}
          name="input_current"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.input-voltage')}
          placeholder={t('project.other.transformer.details.input-voltage')}
          name="input_voltage"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.output-current')}
          placeholder={t('project.other.transformer.details.output-current')}
          name="output_current"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.output-voltage')}
          placeholder={t('project.other.transformer.details.output-voltage')}
          name="output_voltage"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.northing')}
          placeholder={t('project.other.transformer.details.northing')}
          name="northing"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transformer.details.easting')}
          placeholder={t('project.other.transformer.details.easting')}
          name="easting"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default TransformerForm;
