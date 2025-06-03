import { Grid, Typography } from '@mui/material';
import type { RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

const RailwayTrackRehabilitationOrRenewalCard = ({
  item,
  onEdit,
  onDelete,
  refetch,
  t
}: {
  onDetail: (item: RailwayTrackRehabilitationOrRenewal) => void;
  item: RailwayTrackRehabilitationOrRenewal;
  onEdit: (item: RailwayTrackRehabilitationOrRenewal) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      t={t}
      actions={
        <>
          <FileDrawer id={item.id} type="RAILWAY_TRACK_REHABILITATION_OR_RENEWAL" />
          <ModelActionComponent
            model="RailwayTrackRehabilitationOrRenewal"
            model_id={item.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={() => onEdit(item)}
            onDelete={() => onDelete(item.id)}
            item={item}
            deletePermissionRule={{ action: 'delete', subject: 'railwaytrackrehabilitationorrenewal' }}
            editPermissionRule={{ action: 'update', subject: 'railwaytrackrehabilitationorrenewal' }}
            options={[]}
          />
        </>
      }
    >
      <Typography variant="h5" component="div">
        {item?.rehabilitation_type || item?.id?.slice(0, 8) + '...'}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.details.project-id')}: {item?.project_id ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-type')}: {item?.rehabilitation_type ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.details.renewal-date')}: {item?.renewal_date ?? t('common.not-available')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.details.remark')}: {item?.remark ?? t('common.not-available')}
          </Typography>
        </Grid>
      </Grid>
    </SharedItemViewCard>
  );
};

export default RailwayTrackRehabilitationOrRenewalCard;