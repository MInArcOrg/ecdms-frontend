import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayTrackRehabilitationOrRenewalCardProps {
  railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal;
  refetch: () => void;
  onEdit: (railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayTrackRehabilitationOrRenewal: RailwayTrackRehabilitationOrRenewal) => void;
}

const RailwayTrackRehabilitationOrRenewalCard: React.FC<RailwayTrackRehabilitationOrRenewalCardProps> = ({
  railwayTrackRehabilitationOrRenewal,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayTrackRehabilitationOrRenewal)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayTrackRehabilitationOrRenewal?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.track_renewal_history')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.track_renewal_history || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.plans_or_schedules')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.plans_or_schedules || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.rehabilitation_renewal_methods_used_id')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.rehabilitation_renewal_methods_used_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.rehabilitation_renewal_types')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.rehabilitation_renewal_types || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.remark')}: {railwayTrackRehabilitationOrRenewal?.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.created_at')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.created_at || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-rehabilitation-or-renewal.updated_at')}:{' '}
            {railwayTrackRehabilitationOrRenewal?.updated_at || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayTrackRehabilitationOrRenewal"
          model_id={railwayTrackRehabilitationOrRenewal.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaytrackrehabilitationorrenewal'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaytrackrehabilitationorrenewal'
          }}
          onEdit={() => onEdit(railwayTrackRehabilitationOrRenewal)}
          onDelete={() => onDelete(railwayTrackRehabilitationOrRenewal.id)}
          item={railwayTrackRehabilitationOrRenewal}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default RailwayTrackRehabilitationOrRenewalCard;
