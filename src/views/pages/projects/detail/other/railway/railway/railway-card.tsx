import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { Railway } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayCardProps {
  railway: Railway;
  refetch: () => void;
  onEdit: (railway: Railway) => void;
  onDelete: (id: string) => void;
  onDetail: (railway: Railway) => void;
}

const RailwayCard: React.FC<RailwayCardProps> = ({ railway, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(railway)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railway.major_operator || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway.details.energy-source')}: {railway.energy_source || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway.details.system-length')}:{' '}
            {railway.system_length ? `${railway.system_length} km` : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway.details.total-stations')}: {railway.total_station_no || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway.details.freight-cargo-no')}: {railway.fright_cargo_no || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway.details.transport-cargo-no')}: {railway.transport_cargo_no || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {railway.created_at ? formatCreatedAt(railway.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={railway.id} type={uploadableProjectFileTypes.other.railway} />
        <ModelAction model="Railway" model_id={railway.id} refetchModel={refetch} resubmit={refetch} title="" postAction={refetch} />
        <RowOptions onEdit={() => onEdit(railway)} onDelete={() => onDelete(railway.id)} item={railway} options={[]} />
      </CardActions>
    </Card>
  );
};

export default RailwayCard;
