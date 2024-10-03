import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ReservoirInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ReservoirInfoCardProps {
  reservoirInfo: ReservoirInfo;
  refetch: () => void;
  onEdit: (reservoirInfo: ReservoirInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (reservoirInfo: ReservoirInfo) => void;
}

const ReservoirInfoCard: React.FC<ReservoirInfoCardProps> = ({ reservoirInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(reservoirInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {reservoirInfo.id || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.dam-volume')}: {reservoirInfo.dam_volume || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.total-capacity')}: {reservoirInfo.total_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.active-capacity')}: {reservoirInfo.active_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.inactive-capacity')}: {reservoirInfo.inactive_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.catchment-area')}:{' '}
            {reservoirInfo.catchment_area !== undefined ? reservoirInfo.catchment_area : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.reservoir-info.details.surface-area')}:{' '}
            {reservoirInfo.surface_area !== undefined ? reservoirInfo.surface_area : t('common.not-available')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {reservoirInfo.created_at ? formatCreatedAt(reservoirInfo.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={reservoirInfo.id} type={uploadableProjectFileTypes.other.reservoirInfo} />
        <ModelAction
          model="ReservoirInfo"
          model_id={reservoirInfo.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(reservoirInfo)} onDelete={() => onDelete(reservoirInfo.id)} item={reservoirInfo} options={[]} />
      </CardActions>
    </Card>
  );
};

export default ReservoirInfoCard;
