import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayTrackConditionAssessment, RailwayTrackData } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface RailwayTrackConditionAssessmentFormProps {
  formik: FormikProps<RailwayTrackConditionAssessment>;
  file: File | null;
  onFileChange: (file: File | null) => void;
  projectId: string;
}

const RailwayTrackConditionAssessmentForm: React.FC<RailwayTrackConditionAssessmentFormProps> = ({ formik, file, onFileChange, projectId }) => {
  const { t } = useTranslation();
  const { data: railwayTrackData } = useQuery({
    queryKey: ['railway-track-data', projectId],
    queryFn: () =>
      projectOtherApiSecondService<RailwayTrackData>().getAll('railway-track-data', {
        filter: { project_id: projectId }
      })
  });
  const { data: trackConditionRatings } = useQuery({
    queryKey: [projectMasterModels.trackConditionRating.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.trackConditionRating.model }
        })
      )
  });
  const { data: observedDefects } = useQuery({
    queryKey: [projectMasterModels.observedDefects.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.observedDefects.model }
        })
      )
  });

  return (
    <Grid container spacing={gridSpacing}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomSelectBox
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.railway-track-data-id')}
            name="railway_track_data_id"
            size="small"
            sx={{ mb: 2 }}
            options={
              railwayTrackData?.payload?.map((item) => ({
                label: item?.name || item?.railwayTrackInfrastructureType?.title || `${item.id.slice(0, 5)}...`,
                value: item.id
              })) || []
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelectBox
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.track-condition-rating-id')}
            name="track_condition_rating_id"
            size="small"
            sx={{ mb: 2 }}
            options={
              trackConditionRatings?.payload?.map((item) => ({
                label: item.title,
                value: item.id
              })) || []
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomSelectBox
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.observed-defects-id')}
            name="observed_defects_id"
            size="small"
            sx={{ mb: 2 }}
            options={
              observedDefects?.payload?.map((item) => ({
                label: item.title,
                value: item.id
              })) || []
            }
          />
        </Grid>
        <Grid item xs={12}>
          <CustomDynamicDatePicker
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.inspection-dates')}
            name="inspection_dates"
            required
            showYearDropdown
            showMonthDropdown
            customInput={<CustomTextBox name="inspection_dates" />}
          />
        </Grid>

      </Grid>
     
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.track-settlement-irregularities')}
            name="track_settlement_irregularities"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={t('project.other.railway-track-condition-assessment.details.remark')}
            name="remark"
            size="small"
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RailwayTrackConditionAssessmentForm;
