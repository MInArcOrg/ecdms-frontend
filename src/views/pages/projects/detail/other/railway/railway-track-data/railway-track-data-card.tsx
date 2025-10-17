'use client';

import { Typography, Grid } from '@mui/material';
import type { RailwayTrackData } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

const RailwayTrackDataCard = ({
  railwayTrackData,
  onEdit,
  onDelete,
  refetch,
  t
}: {
  onDetail: (railwayTrackData: RailwayTrackData) => void;
  railwayTrackData: RailwayTrackData;
  onEdit: (railwayTrackData: RailwayTrackData) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      createdAt={railwayTrackData.created_at}
      t={t}
      actions={
        <>
          <FileDrawer id={railwayTrackData.id} type="RAILWAY_TRACK_DATA" />
          <ModelActionComponent
            model="RailwayTrackData"
            model_id={railwayTrackData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={() => onEdit(railwayTrackData)}
            onDelete={() => onDelete(railwayTrackData.id)}
            item={railwayTrackData}
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwaytrackdata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaytrackdata'
            }}
            options={[]}
          />
        </>
      }
    >
      <Typography variant="h5" component="div">
        {railwayTrackData?.railway_track_infrastructure_type_id || railwayTrackData?.id?.slice(0, 8) + '...'}
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.railway-track-infrastructure-type-id')}:{' '}
            {railwayTrackData?.railway_track_infrastructure_type_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.track-type-id')}: {railwayTrackData?.track_type_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.track-gauge-id')}: {railwayTrackData?.track_gauge_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.track-length')}: {railwayTrackData?.track_length ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.rail-type-and-size')}:{' '}
            {railwayTrackData?.rail_type_and_size ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.sleepers-type-and-spacing')}:{' '}
            {railwayTrackData?.sleepers_type_and_spacing ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.fastening-systems')}:{' '}
            {railwayTrackData?.fastening_systems ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.ballast-type-and-depth')}:{' '}
            {railwayTrackData?.ballast_type_and_depth ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.track-connection-method')}:{' '}
            {railwayTrackData?.track_connection_method ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.track-type')}: {railwayTrackData?.track_type ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-data.details.remark')}: {railwayTrackData?.remark ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('common.created-at')}: {railwayTrackData?.created_at ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('common.updated-at')}: {railwayTrackData?.updated_at ?? t('common.not-available')}
          </Typography>
        </Grid>
      </Grid>
    </SharedItemViewCard>
  );
};

export default RailwayTrackDataCard;
