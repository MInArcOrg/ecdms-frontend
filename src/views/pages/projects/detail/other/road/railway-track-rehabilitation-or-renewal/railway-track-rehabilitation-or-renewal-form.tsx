import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import type { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import type { RailwayTrackData, RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import CustomSelectBox from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface RailwayTrackRehabilitationOrRenewalFormProps {
  formik: FormikProps<RailwayTrackRehabilitationOrRenewal>;
  projectId: string;
}

const RailwayTrackRehabilitationOrRenewalForm: React.FC<RailwayTrackRehabilitationOrRenewalFormProps> = ({ formik, projectId }) => {
  const { t } = useTranslation();
  const { data: railwayTrackData } = useQuery({
    queryKey: ['railway-track-data', projectId],
    queryFn: () =>
      projectOtherApiSecondService<RailwayTrackData>().getAll('railway-track-data', {
        filter: { project_id: projectId }
      })
  });

  const { data: rehabilitationRenewalMethods } = useQuery({
    queryKey: [projectMasterModels.rehabilitationRenewalMethodUsed.title],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: {
          model: projectMasterModels.rehabilitationRenewalMethodUsed.model
        }
      })
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.railway-track-data-id')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.railway-track-data-id')}
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
        <CustomSelectBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-methods-used-id')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-methods-used-id')}
          name="rehabilitation_renewal_methods_used_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            rehabilitationRenewalMethods?.payload.map((type) => ({
              label: type.title,
              value: type.id
            })) ||
            [] ||
            []
          }
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.track-renewal-history')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.track-renewal-history')}
          name="track_renewal_history"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.plans-or-schedules')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.plans-or-schedules')}
          name="plans_or_schedules"
          size="small"
          sx={{ mb: 2 }}
        />
        {/* Dropdown for rehabilitation_renewal_methods_used_id */}
        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-types')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-types')}
          name="rehabilitation_renewal_types"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={t('project.other.railway-track-rehabilitation-or-renewal.details.remark')}
          placeholder={t('project.other.railway-track-rehabilitation-or-renewal.details.remark')}
          name="remark"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default RailwayTrackRehabilitationOrRenewalForm;
