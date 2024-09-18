import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { SolarEnergy } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface SolarEnergyCardProps {
  solarEnergy: SolarEnergy;
  refetch: () => void;
  onEdit: (solarEnergy: SolarEnergy) => void;
  onDelete: (id: string) => void;
  onDetail: (solarEnergy: SolarEnergy) => void;
}

const SolarEnergyCard: React.FC<SolarEnergyCardProps> = ({ solarEnergy, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(solarEnergy)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {solarEnergy.title}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.solar-energy.details.description')}: {solarEnergy.description || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.solar-energy.details.specifications')}: {solarEnergy.specifications || t('common.not-available')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {solarEnergy.created_at ? formatCreatedAt(solarEnergy.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {solarEnergy.updated_at ? formatCreatedAt(solarEnergy.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={solarEnergy.id} type={uploadableProjectFileTypes.other.solarEnergy} />
        <ModelAction
          model="SolarEnergy"
          model_id={solarEnergy.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(solarEnergy)} onDelete={() => onDelete(solarEnergy.id)} item={solarEnergy} options={[]} />
      </CardActions>
    </Card>
  );
};

export default SolarEnergyCard;
