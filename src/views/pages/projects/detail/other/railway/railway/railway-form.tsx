import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { Railway } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayFormProps {
  formik: FormikProps<Railway>;
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
          label={t('project.other.railway.details.major-operator')}
          placeholder={t('project.other.railway.details.major-operator')}
          name="major_operator"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway.details.energy-source')}
          placeholder={t('project.other.railway.details.energy-source')}
          name="energy_source"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway.details.system-length')}
          placeholder={t('project.other.railway.details.system-length')}
          name="system_length"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway.details.total-stations')}
          placeholder={t('project.other.railway.details.total-stations')}
          name="total_station_no"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway.details.freight-cargo-no')}
          placeholder={t('project.other.railway.details.freight-cargo-no')}
          name="fright_cargo_no"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway.details.transport-cargo-no')}
          placeholder={t('project.other.railway.details.transport-cargo-no')}
          name="transport_cargo_no"
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
