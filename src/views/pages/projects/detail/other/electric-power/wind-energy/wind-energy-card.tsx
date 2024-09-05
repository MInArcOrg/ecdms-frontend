import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { WindEnergy } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface WindEnergyCardProps {
  windEnergy: WindEnergy;
  refetch: () => void;
  onEdit: (windEnergy: WindEnergy) => void;
  onDelete: (id: string) => void;
  onDetail: (windEnergy: WindEnergy) => void;
}

const WindEnergyCard: React.FC<WindEnergyCardProps> = ({ windEnergy, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(windEnergy)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {windEnergy.title}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.wind-energy.details.description')}: {windEnergy.description || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.wind-energy.details.specifications')}: {windEnergy.specifications || t('common.not-available')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {windEnergy.created_at ? formatCreatedAt(windEnergy.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {windEnergy.updated_at ? formatCreatedAt(windEnergy.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={windEnergy.id} type={uploadableProjectFileTypes.other.windEnergy} />
        <ModelAction model="WindEnergy" model_id={windEnergy.id} refetchModel={refetch} resubmit={refetch} title="" postAction={refetch} />
        <RowOptions onEdit={() => onEdit(windEnergy)} onDelete={() => onDelete(windEnergy.id)} item={windEnergy} options={[]} />
      </CardActions>
    </Card>
  );
};

export default WindEnergyCard;
