import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Port } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface PortFormProps {
  formik: FormikProps<Port>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const PortForm: React.FC<PortFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.port.form.owner')}
          placeholder={transl('project.other.port.form.owner')}
          name="owner"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.port.form.operator')}
          placeholder={transl('project.other.port.form.operator')}
          name="operator"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.port.form.port-type')}
          placeholder={transl('project.other.port.form.port-type')}
          name="port_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.port.form.site-area')}
          placeholder={transl('project.other.port.form.site-area')}
          name="site_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.port.form.annual-traffic-size')}
          placeholder={transl('project.other.port.form.annual-traffic-size')}
          name="annual_traffic_size"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default PortForm;
