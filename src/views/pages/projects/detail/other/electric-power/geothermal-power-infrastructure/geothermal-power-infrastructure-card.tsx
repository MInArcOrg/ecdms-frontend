import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { GeothermalPowerInfrastructure } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface GeothermalPowerInfrastructureCardProps {
  geothermalPowerInfrastructure: GeothermalPowerInfrastructure;
  refetch: () => void;
  onEdit: (geothermalPowerInfrastructure: GeothermalPowerInfrastructure) => void;
  onDelete: (id: string) => void;
  onDetail: (geothermalPowerInfrastructure: GeothermalPowerInfrastructure) => void;
}

const GeothermalPowerInfrastructureCard: React.FC<GeothermalPowerInfrastructureCardProps> = ({
  geothermalPowerInfrastructure,
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
              onClick={() => onDetail(geothermalPowerInfrastructure)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {geothermalPowerInfrastructure?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geothermal-power-infrastructure.details.turbine-manufacturer')}:{' '}
            {geothermalPowerInfrastructure?.turbine_manufacturer || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geothermal-power-infrastructure.details.turbine-model')}:{' '}
            {geothermalPowerInfrastructure?.turbine_model || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geothermal-power-infrastructure.details.turbine-type-id')}:{' '}
            {geothermalPowerInfrastructure?.turbine_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geothermal-power-infrastructure.details.each-turbine-capacity')}:{' '}
            {geothermalPowerInfrastructure?.each_turbine_capacity?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geothermal-power-infrastructure.details.remark')}: {geothermalPowerInfrastructure?.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {geothermalPowerInfrastructure?.created_at ? formatCreatedAt(geothermalPowerInfrastructure.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={geothermalPowerInfrastructure.id} type={uploadableProjectFileTypes.other.geothermalPowerInfrastructure} />
        <ModelAction
          model="GeothermalPowerInfrastructure"
          model_id={geothermalPowerInfrastructure.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(geothermalPowerInfrastructure)}
          onDelete={() => onDelete(geothermalPowerInfrastructure.id)}
          item={geothermalPowerInfrastructure}
          deletePermissionRule={{
            action: 'delete',
            subject: 'geothermalPowerInfrastructure'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'geothermalPowerInfrastructure'
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default GeothermalPowerInfrastructureCard;
