import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleOperationalPerformance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayVehicleOperationalPerformanceCardProps {
  railwayVehicleOperationalPerformance: RailwayVehicleOperationalPerformance;
  refetch: () => void;
  onEdit: (specs: RailwayVehicleOperationalPerformance) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayVehicleOperationalPerformance) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleOperationalPerformanceCard: React.FC<RailwayVehicleOperationalPerformanceCardProps> = ({
  railwayVehicleOperationalPerformance,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayVehicleOperationalPerformance)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayVehicleOperationalPerformance?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.railway_vehicle_identification_id')}:{' '}
            {railwayVehicleOperationalPerformance?.railwayVehicleIdentification
              ? railwayVehicleOperationalPerformance?.railwayVehicleIdentification +
              ' - ' +
              railwayVehicleOperationalPerformance?.railwayVehicleIdentification.manufacturer_supplier_name +
              ' - ' +
              railwayVehicleOperationalPerformance?.railwayVehicleIdentification.manufacture_year
              : railwayVehicleOperationalPerformance?.id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.fuel_or_energy_consumption')}:{' '}
            {railwayVehicleOperationalPerformance.fuel_or_energy_consumption || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.mileage_or_operating_hours')}:{' '}
            {railwayVehicleOperationalPerformance.mileage_or_operating_hours || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.reliability_and_availability')}:{' '}
            {railwayVehicleOperationalPerformance.reliability_and_availability || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.performance_indicators')}:{' '}
            {railwayVehicleOperationalPerformance.performance_indicators || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-operational-performance.details.remark')}:{' '}
            {railwayVehicleOperationalPerformance.remark || 'N/A'}
          </Typography>
          {railwayVehicleOperationalPerformance.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayVehicleOperationalPerformance.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayVehicleOperationalPerformance.id && (
          <FileDrawer id={railwayVehicleOperationalPerformance.id} type={otherSubMenu?.fileType || ''} />
        )}

        {railwayVehicleOperationalPerformance.id && (
          <ModelAction
            model="RailwayVehicleOperationalPerformance"
            model_id={railwayVehicleOperationalPerformance.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayvehicleoperationalperformance'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayvehicleoperationalperformance'
          }}
          onEdit={() => onEdit(railwayVehicleOperationalPerformance)}
          onDelete={() => onDelete(railwayVehicleOperationalPerformance.id as string)}
          item={railwayVehicleOperationalPerformance}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayVehicleOperationalPerformanceCard;
