import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { RailwayTrackSafety } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomSwitch from 'src/views/shared/form/custom-switch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface RailwayTrackSafetyFormProps {
  formik: FormikProps<RailwayTrackSafety>;
}

const RailwayTrackSafetyForm: React.FC<RailwayTrackSafetyFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  const { data: trackSafetyMeasures } = useQuery({
    queryKey: [projectMasterModels.trackSafetyMeasure.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.trackSafetyMeasure.model }
      })
  });
  const { data: trackInspectionFrequencies } = useQuery({
    queryKey: [projectMasterModels.trackInspectionFrequency.model],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.trackInspectionFrequency.model }
      })
  });


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>

        {/* railway_track_safety_measures_id - Assuming this is a required UUID, use a Select box */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-track-safety.details.railway-track-safety-measures-id')}
          placeholder={t('project.other.railway-track-safety.details.railway-track-safety-measures-id')}
          name="railway_track_safety_measures_id"
          size="small"
          sx={{ mb: 2 }}
          options={trackSafetyMeasures?.payload?.map(item => {
            return {
              label: item.title,
              value: item.id
            }
          }) || []} // Add options for safety measures here
        />

        {/* track_inspection_frequency_id - Assuming this is a required UUID, use a Select box */}
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-track-safety.details.track-inspection-frequency-id')}
          placeholder={t('project.other.railway-track-safety.details.track-inspection-frequency-id')}
          name="track_inspection_frequency_id"
          size="small"
          sx={{ mb: 2 }}
          options={trackInspectionFrequencies?.payload?.map(item => {
            return {
              label: item.title,
              value: item.id
            }
          }) || []} // Add options for safety measures here
        />

        {/* is_compliant_with_safety_regulations_standards - Boolean, use a Checkbox */}
        <CustomSwitch
          label={t('project.other.railway-track-safety.details.is-compliant-with-safety-regulations-standards')}
          name="is_compliant_with_safety_regulations_standards"
          sx={{ mb: 2 }}
        />



        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.remark')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.remark')}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          multiline
          rows={4}
        />

      </Grid>
    </Grid>
  );
};

export default RailwayTrackSafetyForm;