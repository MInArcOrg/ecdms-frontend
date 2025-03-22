import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HydrologicalInformation } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface HydrologicalInformationFormProps {
  formik: FormikProps<HydrologicalInformation>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const HydrologicalInformationForm: React.FC<HydrologicalInformationFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.water-source')}
          placeholder={transl('project.other.hydrological-information.details.water-source')}
          name="water_source"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.catchment-area')}
          placeholder={transl('project.other.hydrological-information.details.catchment-area')}
          name="catchment_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.elevation-change')}
          placeholder={transl('project.other.hydrological-information.details.elevation-change')}
          name="elevation_change"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.head')}
          placeholder={transl('project.other.hydrological-information.details.head')}
          name="head"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.total-inflow')}
          placeholder={transl('project.other.hydrological-information.details.total-inflow')}
          name="total_inflow"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.active-storage-volume')}
          placeholder={transl('project.other.hydrological-information.details.active-storage-volume')}
          name="active_storage_volume"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.water-stored')}
          placeholder={transl('project.other.hydrological-information.details.water-stored')}
          name="water_stored"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.hydrological-information.details.remark')}
          placeholder={transl('project.other.hydrological-information.details.remark')}
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

export default HydrologicalInformationForm;
