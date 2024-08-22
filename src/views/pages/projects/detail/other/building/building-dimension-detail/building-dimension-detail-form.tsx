import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { BuildingDimensionDetail } from 'src/types/project/other';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface BuildingDimensionDetailFormProps {
  formik: FormikProps<BuildingDimensionDetail>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const BuildingDimensionDetailForm: React.FC<BuildingDimensionDetailFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-dimension-detail.form.site-area')}
          placeholder={transl('project.other.building-dimension-detail.form.site-area')}
          name="site_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-dimension-detail.form.site-above-sea-level')}
          placeholder={transl('project.other.building-dimension-detail.form.site-above-sea-level')}
          name="site_above_sea_level"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-dimension-detail.form.ground-floor-area')}
          placeholder={transl('project.other.building-dimension-detail.form.ground-floor-area')}
          name="ground_floor_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-dimension-detail.form.total-floor-area')}
          placeholder={transl('project.other.building-dimension-detail.form.total-floor-area')}
          name="total_floor_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} lg={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.building-dimension-detail.form.basement-stories-no')}
              placeholder={transl('project.other.building-dimension-detail.form.basement-stories-no')}
              name="basement_stories_no"
              size="small"
              type="number"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.building-dimension-detail.form.above-ground-floor-stories-no')}
              placeholder={transl('project.other.building-dimension-detail.form.above-ground-floor-stories-no')}
              name="above_ground_floor_stories_no"
              size="small"
              type="number"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.building-dimension-detail.form.height-above-natural-ground')}
              placeholder={transl('project.other.building-dimension-detail.form.height-above-natural-ground')}
              name="height_above_natural_ground"
              size="small"
              type="number"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <CustomTextBox
              fullWidth
              label={transl('project.other.building-dimension-detail.form.depth-below-natural-ground')}
              placeholder={transl('project.other.building-dimension-detail.form.depth-below-natural-ground')}
              name="depth_below_natural_ground"
              size="small"
              type="number"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <CustomTextBox
          fullWidth
          label={transl('project.other.building-dimension-detail.form.remark')}
          placeholder={transl('project.other.building-dimension-detail.form.remark')}
          multiline
          rows={3}
          name="remark"
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

export default BuildingDimensionDetailForm;
