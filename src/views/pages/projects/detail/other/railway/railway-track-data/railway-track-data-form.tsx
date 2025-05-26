import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { RailwayTrackData } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface RailwayTrackDataFormProps {
  formik: FormikProps<RailwayTrackData>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RailwayTrackDataForm: React.FC<RailwayTrackDataFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();
  const { data: railwayTrackInfrastructureTypes } = useQuery({
    queryKey: ['railway-track-infrastructure-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.railwayTrackInfrastructure.model }
        })
      )
  });
  const { data: railwayTrackType } = useQuery({
    queryKey: ['railway-track-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.trackGauge.model }
        })
      )
  });
  const { data: railwayTrackGuages } = useQuery({
    queryKey: ['railway-track-gauges'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.trackGauge.model }
        })
      )
  });
  console.log('formik errors', formik.errors);
  // TODO: Add railwayTrackInfrastructureTypes to the form
  console.log('railwayTrackInfrastructureTypes', railwayTrackInfrastructureTypes);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelectBox
              fullWidth
              label={t('project.other.railway-track-data.details.railway-track-infrastructure-type-id')}
              name="railway_track_infrastructure_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                railwayTrackInfrastructureTypes?.payload?.map((item) => ({
                  label: item.title,
                  value: item.id
                })) || []
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelectBox
              fullWidth
              label={t('project.other.railway-track-data.details.track-type-id')}
              name="track_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                railwayTrackType?.payload?.map((item) => ({
                  label: item.title,
                  value: item.id
                })) || []
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelectBox
              fullWidth
              label={t('project.other.railway-track-data.details.track-gauge-id')}
              name="track_gauge_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                railwayTrackGuages?.payload?.map((item) => ({
                  label: item.title,
                  value: item.id
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.track-length')}
              name="track_length"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.rail-type-and-size')}
              name="rail_type_and_size"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.sleepers-type-and-spacing')}
              name="sleepers_type_and_spacing"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.fastening-systems')}
              name="fastening_systems"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.ballast-type-and-depth')}
              name="ballast_type_and_depth"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={t('project.other.railway-track-data.details.track-connection-method')}
              name="track_connection_method"
              size="small"
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={t('project.other.railway-track-data.details.track-type')}
            name="track_type"
            size="small"
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomTextBox
            fullWidth
            label={t('project.other.railway-track-data.details.remark')}
            name="remark"
            size="small"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayTrackDataForm;
