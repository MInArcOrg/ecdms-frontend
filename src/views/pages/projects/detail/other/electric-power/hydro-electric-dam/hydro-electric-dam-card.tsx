import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { HydroElectricDam } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface HydroElectricDamCardProps {
  hydroElectricDam: HydroElectricDam;
  refetch: () => void;
  onEdit: (hydroElectricDam: HydroElectricDam) => void;
  onDelete: (id: string) => void;
  onDetail: (hydroElectricDam: HydroElectricDam) => void;
}

const HydroElectricDamCard: React.FC<HydroElectricDamCardProps> = ({ hydroElectricDam, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(hydroElectricDam)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {hydroElectricDam?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.river-name')}: {hydroElectricDam?.river_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.elevation-from-sea-level')}: {hydroElectricDam?.elevation_from_sea_level || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.elevation-from-ngl')}: {hydroElectricDam?.elevation_from_ngl || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.dam-type')}: {hydroElectricDam?.dam_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.dam-volume')}: {hydroElectricDam?.dam_volume || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.gated-spillway-no')}: {hydroElectricDam?.gated_spillway_no || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.none-gated-spillway-no')}: {hydroElectricDam?.none_gated_spillway_no || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydro-electric-dam.details.revision-no')}: {hydroElectricDam?.revision_no || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {hydroElectricDam?.created_at ? formatCreatedAt(hydroElectricDam.created_at) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}: {hydroElectricDam?.updated_at ? formatCreatedAt(hydroElectricDam.updated_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={hydroElectricDam.id} type={uploadableProjectFileTypes.other.hydroElectricDam} />
        <ModelAction
          model="HydroElectricDam"
          model_id={hydroElectricDam.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(hydroElectricDam)}
          onDelete={() => onDelete(hydroElectricDam.id)}
          deletePermissionRule={{
            action: 'delete',
            subject: 'hydroElectricDam'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'hydroElectricDam'
          }}
          item={hydroElectricDam}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default HydroElectricDamCard;
