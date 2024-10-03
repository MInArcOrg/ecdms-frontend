import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { WaterIrrigationDam } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface WaterIrrigationDamCardProps {
  waterIrrigationDam: WaterIrrigationDam;
  refetch: () => void;
  onEdit: (waterIrrigationDam: WaterIrrigationDam) => void;
  onDelete: (id: string) => void;
  onDetail: (waterIrrigationDam: WaterIrrigationDam) => void;
}

const WaterIrrigationDamCard: React.FC<WaterIrrigationDamCardProps> = ({ waterIrrigationDam, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(waterIrrigationDam)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {waterIrrigationDam.id || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.projectId')}: {waterIrrigationDam.project_id || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.damVolume')}:{' '}
            {waterIrrigationDam.dam_volume !== undefined ? waterIrrigationDam.dam_volume : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.totalCapacity')}:{' '}
            {waterIrrigationDam.total_capacity !== undefined ? waterIrrigationDam.total_capacity : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.activeCapacity')}:{' '}
            {waterIrrigationDam.active_capacity !== undefined ? waterIrrigationDam.active_capacity : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.inactiveCapacity')}:{' '}
            {waterIrrigationDam.inactive_capacity !== undefined ? waterIrrigationDam.inactive_capacity : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.catchmentArea')}:{' '}
            {waterIrrigationDam.catchment_area !== undefined ? waterIrrigationDam.catchment_area : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.surfaceArea')}:{' '}
            {waterIrrigationDam.surface_area !== undefined ? waterIrrigationDam.surface_area : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.water-irrigation-dam.details.revision-no')}:{' '}
            {waterIrrigationDam.revision_no !== undefined ? waterIrrigationDam.revision_no : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {waterIrrigationDam.created_at ? formatCreatedAt(waterIrrigationDam.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {waterIrrigationDam.updated_at ? formatCreatedAt(waterIrrigationDam.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={waterIrrigationDam.id} type={uploadableProjectFileTypes.other.waterIrrigationDam} />
        <ModelAction
          model="WaterIrrigationDam"
          model_id={waterIrrigationDam.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          onEdit={() => onEdit(waterIrrigationDam)}
          onDelete={() => onDelete(waterIrrigationDam.id)}
          item={waterIrrigationDam}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default WaterIrrigationDamCard;
