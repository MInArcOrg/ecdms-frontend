import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ElectricTower } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ElectricTowerCardProps {
  electricTower: ElectricTower;
  refetch: () => void;
  onEdit: (electricTower: ElectricTower) => void;
  onDelete: (id: string) => void;
  onDetail: (electricTower: ElectricTower) => void;
}

const ElectricTowerCard: React.FC<ElectricTowerCardProps> = ({ electricTower, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(electricTower)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {electricTower.id} {/* Assuming 'name' is not available; using 'id' instead */}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.columns')}: {electricTower.columns || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.braces')}: {electricTower.braces || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.beam-cross-arms')}: {electricTower.beam_cross_arms || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.brace-cross-arm')}: {electricTower.brace_cross_arm || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.elasticity-modulus')}: {electricTower.elasticity_modulus || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.poission-ratio')}: {electricTower.poission_ratio || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.overall-length')}:{' '}
            {electricTower.overall_length !== null ? electricTower.overall_length : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.embedded-length')}:{' '}
            {electricTower.embedded_length !== null ? electricTower.embedded_length : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {electricTower.created_at ? formatCreatedAt(electricTower.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {electricTower.updated_at ? formatCreatedAt(electricTower.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={electricTower.id} type={uploadableProjectFileTypes.other.electricTower} />
        <ModelAction
          model="ElectricTower"
          model_id={electricTower.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(electricTower)} onDelete={() => onDelete(electricTower.id)} item={electricTower} options={[]} />
      </CardActions>
    </Card>
  );
};

export default ElectricTowerCard;
