import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { SolarEnergy } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface SolarEnergyFormProps {
  formik: FormikProps<SolarEnergy>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const SolarEnergyForm: React.FC<SolarEnergyFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.solar-energy.details.title')}
          placeholder={t('project.other.solar-energy.details.title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.solar-energy.details.description')}
          placeholder={t('project.other.solar-energy.details.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={3}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.solar-energy.details.specifications')}
          placeholder={t('project.other.solar-energy.details.specifications')}
          name="specifications"
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

export default SolarEnergyForm;
