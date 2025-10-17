import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { RailwayStation } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayFormProps {
  formik: FormikProps<RailwayStation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const RailwayForm: React.FC<RailwayFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.name')}
          placeholder={t('project.other.railway-station.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.specifications')}
          placeholder={t('project.other.railway-station.details.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.northing')}
          placeholder={t('project.other.railway-station.details.northing')}
          name="northing"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.easting')}
          placeholder={t('project.other.railway-station.details.easting')}
          name="easting"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayForm;
