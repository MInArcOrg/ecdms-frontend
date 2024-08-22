import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { RoadInfo } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RoadInfoFormProps {
  formik: FormikProps<RoadInfo>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RoadInfoForm: React.FC<RoadInfoFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.material')}
          placeholder={transl('project.other.road-info.details.material')}
          name="material"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.location-function')}
          placeholder={transl('project.other.road-info.details.location-function')}
          name="location_function"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.traffic-volume')}
          placeholder={transl('project.other.road-info.details.traffic-volume')}
          name="traffic_volume"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.traffic-type')}
          placeholder={transl('project.other.road-info.details.traffic-type')}
          name="traffic_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.economy')}
          placeholder={transl('project.other.road-info.details.economy')}
          name="economy"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.rigidity')}
          placeholder={transl('project.other.road-info.details.rigidity')}
          name="rigidity"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.road-info.details.topography')}
          placeholder={transl('project.other.road-info.details.topography')}
          name="topography"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RoadInfoForm;
