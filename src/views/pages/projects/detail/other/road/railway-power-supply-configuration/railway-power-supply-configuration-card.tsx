import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerSupplyConfiguration } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayPowerSupplyConfigurationCardProps {
  railwayPowerSupplyConfiguration: RailwayPowerSupplyConfiguration;
  refetch: () => void;
  onEdit: (specs: RailwayPowerSupplyConfiguration) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayPowerSupplyConfiguration) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayPowerSupplyConfigurationCard: React.FC<RailwayPowerSupplyConfigurationCardProps> = ({
  railwayPowerSupplyConfiguration: data,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu
}) => {
  const { t } = useTranslation();
  const fileType = otherSubMenu?.fileType || 'RAILWAY_POWER_SUPPLY_CONFIGURATION';
  const entitySubject = 'railwaypowersupplyconfiguration';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(data)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {data?.id?.toString().slice(0, 5)}... ({t('project.other.railway-power-supply-configuration.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>

          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-power-supply-configuration.details.power_supply_system_type_id')}:{' '}
            {data.power_supply_system_type_id || 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-power-supply-configuration.details.voltage_level_and_frequency')}:{' '}
            {data.voltage_level_and_frequency || 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-power-supply-configuration.details.power_supply_capacity_and_load_requirements')}:{' '}
            <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {data.power_supply_capacity_and_load_requirements || 'N/A'}
            </span>
          </Typography>

          {data.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {data.created_at}
            </Typography>
          )}

        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {data.id && <FileDrawer id={data.id} type={fileType} />}

        {data.id && (
          <ModelAction
            model="RailwayPowerSupplyConfiguration"
            model_id={data.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: entitySubject
          }}
          editPermissionRule={{
            action: 'update',
            subject: entitySubject
          }}
          onEdit={() => onEdit(data)}
          onDelete={() => onDelete(data.id as string)}
          item={data}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayPowerSupplyConfigurationCard;