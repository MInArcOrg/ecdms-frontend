import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { TracksGeometryData } from 'src/types/project/other'; // Ensure the type is correct
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayFormProps {
  formik: FormikProps<TracksGeometryData>;
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
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.project-id')}
          placeholder={t('project.other.railway-station.details.project-id')}
          name="project_id"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.alignment')}
          placeholder={t('project.other.railway-station.details.alignment')}
          name="alignment"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.gradient')}
          placeholder={t('project.other.railway-station.details.gradient')}
          name="gradient"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.curvature-radius')}
          placeholder={t('project.other.railway-station.details.curvature-radius')}
          name="curvature_radius"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.cant')}
          placeholder={t('project.other.railway-station.details.cant')}
          name="cant"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.track-gauge')}
          placeholder={t('project.other.railway-station.details.track-gauge')}
          name="track_gauge"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.cross-level')}
          placeholder={t('project.other.railway-station.details.cross-level')}
          name="cross_level"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.track-surface-profile')}
          placeholder={t('project.other.railway-station.details.track-surface-profile')}
          name="track_surface_profile"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.twist')}
          placeholder={t('project.other.railway-station.details.twist')}
          name="twist"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station.details.remark')}
          placeholder={t('project.other.railway-station.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          minRows={2}
        />
      </Grid>
      <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayForm;
