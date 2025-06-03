import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayTrackSafety } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayTrackSafetyCardProps {
  railwayTrackSafety: RailwayTrackSafety;
  refetch: () => void;
  onEdit: (railwayTrackSafety: RailwayTrackSafety) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayTrackSafety: RailwayTrackSafety) => void;
}

const RailwayTrackSafetyCard: React.FC<RailwayTrackSafetyCardProps> = ({
  railwayTrackSafety,
  refetch,
  onEdit,
  onDelete,
  onDetail,
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
              onClick={() => onDetail(railwayTrackSafety)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {railwayTrackSafety?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-safety.details.railway-track-safety-measures-id')}:{' '}
            {railwayTrackSafety?.railway_track_safety_measures_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-safety.details.track-inspection-frequency-id')}:{' '}
            {railwayTrackSafety?.track_inspection_frequency_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-safety.details.is-compliant-with-safety-regulations-standards')}:{' '}
            {railwayTrackSafety?.is_compliant_with_safety_regulations_standards === true
              ? t('common.yes')
              : railwayTrackSafety?.is_compliant_with_safety_regulations_standards === false
                ? t('common.no')
                : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-track-safety.details.remark')}:{' '}
            {railwayTrackSafety?.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {railwayTrackSafety?.created_at || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {railwayTrackSafety?.updated_at || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayTrackSafety"
          model_id={railwayTrackSafety.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaytracksafety',
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaytracksafety',
          }}
          onEdit={() => onEdit(railwayTrackSafety)}
          onDelete={() => onDelete(railwayTrackSafety.id)}
          item={railwayTrackSafety}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayTrackSafetyCard;
