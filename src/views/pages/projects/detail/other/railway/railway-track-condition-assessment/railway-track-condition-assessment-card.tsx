'use client';

import { Grid, Typography } from '@mui/material';
import type { RailwayTrackConditionAssessment } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

const RailwayTrackConditionAssessmentCard = ({
  assessment,
  onEdit,
  onDelete,
  refetch,
  t
}: {
  onDetail: (assessment: RailwayTrackConditionAssessment) => void;
  assessment: RailwayTrackConditionAssessment;
  onEdit: (assessment: RailwayTrackConditionAssessment) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      t={t}
      actions={
        <>
          <FileDrawer id={assessment.id} type="RAILWAY_TRACK_CONDITION_ASSESSMENT" />
          <ModelActionComponent
            model="RailwayTrackConditionAssessment"
            model_id={assessment.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={() => onEdit(assessment)}
            onDelete={() => onDelete(assessment.id)}
            item={assessment}
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwaytrackconditionassessment'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaytrackconditionassessment'
            }}
            options={[]}
          />
        </>
      }
    >
      <Typography variant="h5" component="div">
        {assessment?.track_condition_rating_id || assessment?.id?.slice(0, 8) + '...'}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.project-id')}:{' '}
            {assessment?.project_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.inspection-dates')}:{' '}
            {assessment?.inspection_dates ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.track-condition-rating-id')}:{' '}
            {assessment?.track_condition_rating_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.observed-defects-id')}:{' '}
            {assessment?.observed_defects_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.track-settlement-irregularities')}:{' '}
            {assessment?.track_settlement_irregularities ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-condition-assessment.details.remark')}: {assessment?.remark ?? t('common.not-available')}
          </Typography>
        </Grid>
      </Grid>
    </SharedItemViewCard>
  );
};

export default RailwayTrackConditionAssessmentCard;
