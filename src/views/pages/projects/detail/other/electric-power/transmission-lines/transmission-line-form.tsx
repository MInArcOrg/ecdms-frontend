import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { TransmissionLine } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TransmissionLineFormProps {
  formik: FormikProps<TransmissionLine>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const TransmissionLineForm: React.FC<TransmissionLineFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.line-type')}
          placeholder={t('project.other.transmission-line.details.line-type')}
          name="line_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.transmission-capacity')}
          placeholder={t('project.other.transmission-line.details.transmission-capacity')}
          name="transmission_capacity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.transmitting-power')}
          placeholder={t('project.other.transmission-line.details.transmitting-power')}
          name="transmitting_power"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.transmitting-current')}
          placeholder={t('project.other.transmission-line.details.transmitting-current')}
          name="transmitting_current"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.transmitting-voltage')}
          placeholder={t('project.other.transmission-line.details.transmitting-voltage')}
          name="transmitting_voltage"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.transmission-towers-number')}
          placeholder={t('project.other.transmission-line.details.transmission-towers-number')}
          name="transmission_towers_number"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.start-northing')}
          placeholder={t('project.other.transmission-line.details.start-northing')}
          name="start_northing"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.start-easting')}
          placeholder={t('project.other.transmission-line.details.start-easting')}
          name="start_easting"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.end-northing')}
          placeholder={t('project.other.transmission-line.details.end-northing')}
          name="end_northing"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.transmission-line.details.end-easting')}
          placeholder={t('project.other.transmission-line.details.end-easting')}
          name="end_easting"
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

export default TransmissionLineForm;
