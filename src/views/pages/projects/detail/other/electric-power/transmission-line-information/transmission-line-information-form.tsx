import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TransmissionLineInformation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TransmissionLineInformationFormProps {
  formik: FormikProps<TransmissionLineInformation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const TransmissionLineInformationForm: React.FC<TransmissionLineInformationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.name')}
          placeholder={transl('project.other.transmission-line-information.details.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
          required
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.transmission-voltage')}
          placeholder={transl('project.other.transmission-line-information.details.transmission-voltage')}
          name="transmission_voltage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.transmission-line-route-length')}
          placeholder={transl('project.other.transmission-line-information.details.transmission-line-route-length')}
          name="transmission_line_route_length"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.circuit-number')}
          placeholder={transl('project.other.transmission-line-information.details.circuit-number')}
          name="circuit_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.starting-point-northing')}
          placeholder={transl('project.other.transmission-line-information.details.starting-point-northing')}
          name="starting_point_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.starting-point-easting')}
          placeholder={transl('project.other.transmission-line-information.details.starting-point-easting')}
          name="starting_point_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.ending-point-northing')}
          placeholder={transl('project.other.transmission-line-information.details.ending-point-northing')}
          name="ending_point_northing"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.ending-point-easting')}
          placeholder={transl('project.other.transmission-line-information.details.ending-point-easting')}
          name="ending_point_easting"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.lifetime')}
          placeholder={transl('project.other.transmission-line-information.details.lifetime')}
          name="lifetime"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl('project.other.transmission-line-information.details.remark')}
          placeholder={transl('project.other.transmission-line-information.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default TransmissionLineInformationForm;
