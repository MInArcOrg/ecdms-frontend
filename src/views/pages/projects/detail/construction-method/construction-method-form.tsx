import type React from 'react';
import { Box, Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import type { ConstructionMethod } from 'src/types/project/construction-method';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomSelect from 'src/views/shared/form/custom-select';
import { useQuery } from '@tanstack/react-query';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

interface ConstructionMethodFormProps {
  formik: FormikProps<ConstructionMethod>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ConstructionMethodForm: React.FC<ConstructionMethodFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();
  const { touched, errors } = formik;

  const { data: constructionMethods } = useQuery({
    queryKey: ['construction-methods-master'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.constructionMethod.model }
      })
  });

  const methodOptions = constructionMethods?.payload?.map((item) => ({
    value: item.id,
    label: item.title || ''
  })) || [];

  const showError = (fieldName: keyof ConstructionMethod) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('project.construction-method.method')}
          name="project_method_id"
          options={methodOptions}
          size="small"
          error={showError('project_method_id')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.construction-method.description')}
          name="description"
          size="small"
          multiline
          rows={3}
          error={showError('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ConstructionMethodForm;
