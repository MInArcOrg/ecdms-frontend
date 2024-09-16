import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { TurbineInfo } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TurbineInfoFormProps {
  formik: FormikProps<TurbineInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const TurbineInfoForm: React.FC<TurbineInfoFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.name')}
          placeholder={t('project.other.turbine-info.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.turbine-type')}
          placeholder={t('project.other.turbine-info.details.turbine-type')}
          name="turbine_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.generating-capacity')}
          placeholder={t('project.other.turbine-info.details.generating-capacity')}
          name="generating_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.designed-quantity')}
          placeholder={t('project.other.turbine-info.details.designed-quantity')}
          name="designed_quantity"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.installed-quantity')}
          placeholder={t('project.other.turbine-info.details.installed-quantity')}
          name="installed_quantity"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.functional-quantity')}
          placeholder={t('project.other.turbine-info.details.functional-quantity')}
          name="functional_quantity"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.turbine-info.details.detail')}
          placeholder={t('project.other.turbine-info.details.detail')}
          name="detail"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default TurbineInfoForm;
