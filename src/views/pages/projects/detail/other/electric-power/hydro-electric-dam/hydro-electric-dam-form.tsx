import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { HydroElectricDam } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface HydroElectricDamFormProps {
  formik: FormikProps<HydroElectricDam>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const HydroElectricDamForm: React.FC<HydroElectricDamFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.river-name')}
          placeholder={t('project.other.hydro-electric-dam.details.river-name')}
          name="river_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.elevation-from-sea-level')}
          placeholder={t('project.other.hydro-electric-dam.details.elevation-from-sea-level')}
          name="elevation_from_sea_level"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.elevation-from-ngl')}
          placeholder={t('project.other.hydro-electric-dam.details.elevation-from-ngl')}
          name="elevation_from_ngl"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.dam-type')}
          placeholder={t('project.other.hydro-electric-dam.details.dam-type')}
          name="dam_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.dam-volume')}
          placeholder={t('project.other.hydro-electric-dam.details.dam-volume')}
          name="dam_volume"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.gated-spillway-no')}
          placeholder={t('project.other.hydro-electric-dam.details.gated-spillway-no')}
          name="gated_spillway_no"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.hydro-electric-dam.details.none-gated-spillway-no')}
          placeholder={t('project.other.hydro-electric-dam.details.none-gated-spillway-no')}
          name="none_gated_spillway_no"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default HydroElectricDamForm;
