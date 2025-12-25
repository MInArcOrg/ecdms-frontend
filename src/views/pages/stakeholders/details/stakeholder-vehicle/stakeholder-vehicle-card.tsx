import { Box, Button, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

interface VehicleCardProps {
  vehicle: StakeholderVehicle;
  refetch: () => void;
  onEdit: (vehicle: StakeholderVehicle) => void;
  onDelete: (id: string) => void;
  onDetail: (vehicle: StakeholderVehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  const actions = (
    <>
      <ModelAction
        model="StakeholderVehicle"
        model_id={vehicle?.id || ''}
        refetchModel={refetch}
        resubmit={() => refetch()}
        title=""
        postAction={() => refetch()}
      />
      <RowOptions
        deletePermissionRule={{
          action: 'delete',
          subject: 'stakeholdervehicle'
        }}
        editPermissionRule={{
          action: 'update',
          subject: 'stakeholdervehicle'
        }}
        onEdit={() => onEdit(vehicle)}
        onDelete={() => onDelete(vehicle?.id || '')}
        item={vehicle}
        options={[]}
      />
    </>
  );

  return (
    <SharedItemViewCard t={t} actions={actions}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h5" fontWeight="bold">
          <Typography
            noWrap
            component={Button}
            onClick={() => onDetail(vehicle)}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {vehicle.vehicle_name || vehicle.plate_number || 'N/A'}
          </Typography>
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" flexDirection="column" gap={1} mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.vehicle-name')}: {vehicle.vehicle_name || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.plate-number')}: {vehicle.plate_number || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.model')}: {vehicle.model || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.year')}: {vehicle.year || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.brand-name')}: {vehicle.brand_name || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.year')}: {vehicle.year || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.chassis-number')}: {vehicle.chassis_number || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.engine-number')}: {vehicle.engine_number || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.capacity')}: {vehicle.capacity || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.purpose')}: {vehicle.purpose || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.quantity')}: {vehicle.quantity || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.current-situation')}: {vehicle.current_situation || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.latitude')}: {vehicle.latitude || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('stakeholder.stakeholder-vehicle.form.longitude')}: {vehicle.longitude || 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('common.created-at')}: {vehicle.created_at ? new Date(vehicle.created_at).toLocaleDateString() : 'N/A'}
        </Typography>
        <Typography variant="body2" color="text.secondarya">
          {t('common.updated-at')}: {vehicle.updated_at ? new Date(vehicle.updated_at).toLocaleDateString() : 'N/A'}
        </Typography>
      </Box>
    </SharedItemViewCard>
  );
};

export default VehicleCard;
