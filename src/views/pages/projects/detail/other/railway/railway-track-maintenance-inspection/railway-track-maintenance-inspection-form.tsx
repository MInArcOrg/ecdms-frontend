import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { dropDownConfig } from 'src/configs/api-constants';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import type { RailwayTrackMaintenanceAndInspection } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';


interface RailwayTrackMaintenanceAndInspectionFormProps {
  formik: FormikProps<RailwayTrackMaintenanceAndInspection>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const RailwayTrackMaintenanceAndInspectionForm: React.FC<RailwayTrackMaintenanceAndInspectionFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation();
  const { data: scheduledMaintenanceActivities } = useQuery({
    queryKey: [projectMasterModels.scheduledMaintenanceActivity.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.scheduledMaintenanceActivity.model }
        })
      )
  });
  const { data: trackMaintenanceFrequencies } = useQuery({
    queryKey: [projectMasterModels.trackMaintenanceFrequency.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll(
        dropDownConfig({
          filter: { model: projectMasterModels.trackMaintenanceFrequency.model }
        })
      )
  });
  console.log('formik error', formik.errors);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomSelectBox
            fullWidth
            label={t('project.other.railway-track-maintenance-and-inspection.details.scheduled-maintenance-activity-id')}
            name="scheduled_maintenance_activity_id"
            size="small"
            sx={{ mb: 2 }}
            options={
              scheduledMaintenanceActivities?.payload?.map((item) => ({
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
            label={t('project.other.railway-track-maintenance-and-inspection.details.track-maintenance-frequency-id')}
            name="track_maintenance_frequency_id"
            size="small"
            sx={{ mb: 2 }}
            options={
              trackMaintenanceFrequencies?.payload?.map((item) => ({
                label: item.title,
                value: item.id
              })) || []
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-maintenance-and-inspection.details.maintenance-method')}
          name="maintenance_method"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-maintenance-and-inspection.details.recent-maintenance-date')}
          name="recent_maintenance_date"
          type="date"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-maintenance-and-inspection.details.inspection-reports-and-findings')}
          name="inspection_reports_and_findings"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-maintenance-and-inspection.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={t('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default RailwayTrackMaintenanceAndInspectionForm;
