import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayStationPlatformLayout, RailwayStationPlatformStructuralElement } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayStationPlatformStructuralElementFormProps {
  formik: FormikProps<RailwayStationPlatformStructuralElement>;
  defaultFile: File | null;
  onDefaultFileChange: (file: File | null) => void;
  // New props for secondary file upload
  canopyDetailFile: File | null;
  onCanopyDetailFileChange: (file: File | null) => void;
}

const RailwayStationPlatformStructuralElementForm: React.FC<RailwayStationPlatformStructuralElementFormProps> = ({
  formik,
  defaultFile,
  onDefaultFileChange,
  canopyDetailFile, // Use new prop
  onCanopyDetailFileChange // Use new prop
}) => {
  const { t } = useTranslation();

  const { data: platformIdentifications } = useQuery({
    queryKey: ['platform-identifications'],
    queryFn: () => projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll('railway-station-platform-layouts', dropDownConfig())
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          required
          label={t('project.other.railway-station-platform-structural-element.details.railway_station_platform_layout_id')}
          name="railway_station_platform_layout_id"
          options={
            platformIdentifications?.payload.map((item) => ({
              label: item.name,
              value: item.id
            })) || []
          }
          value={formik.values.railway_station_platform_layout_id}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-structural-element.details.materials_used')}
          placeholder="e.g. Steel, Reinforced Concrete, Brick"
          name="materials_used"
          value={formik.values.materials_used}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-structural-element.details.roofing_type_and_design')}
          placeholder="e.g. Barrel vault, Flat roof, Glass canopy"
          name="roofing_type_and_design"
          value={formik.values.roofing_type_and_design}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSwitch
          label={t('project.other.railway-station-platform-structural-element.details.lighting_fixtures')}
          name="lighting_fixtures"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-structural-element.details.accessibility_features')}
          placeholder="e.g. Ramps, Handrails, Tactile Paving"
          name="accessibility_features"
          value={formik.values.accessibility_features}
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-station-platform-structural-element.details.remark')}
          placeholder={t('project.other.railway-station-platform-structural-element.details.remark')}
          name="remark"
          value={formik.values.remark}
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={defaultFile} onFileChange={onDefaultFileChange} />
        {/* NEW SECONDARY FILE UPLOAD */}
        <CustomFileUpload
          label={t('project.other.railway-station-platform-structural-element.details.canopy-or-shelter-detail-upload')}
          file={canopyDetailFile}
          onFileChange={onCanopyDetailFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayStationPlatformStructuralElementForm;
