import type React from 'react';
import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { SatelliteNetworkCapacity } from 'src/types/project/other';
import RowOptions from 'src/views/shared/listing/row-options';

interface SatelliteNetworkCapacityCardProps {
  satelliteNetworkCapacity: SatelliteNetworkCapacity;
  onEdit: (satelliteNetworkCapacity: SatelliteNetworkCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (satelliteNetworkCapacity: SatelliteNetworkCapacity) => void;
  refetch: () => void;
  networkTypeMap: Map<string, string>;
  satelliteNetworkMap: Map<string, string>;
}

const SatelliteNetworkCapacityCard: React.FC<SatelliteNetworkCapacityCardProps> = ({
  satelliteNetworkCapacity,
  onEdit,
  onDelete,
  onDetail,
  networkTypeMap,
  satelliteNetworkMap
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' }
            }}
            onClick={() => onDetail(satelliteNetworkCapacity)}
          >
            {satelliteNetworkMap.get(satelliteNetworkCapacity.satellite_network_id) || t('common.not-available')}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-capacity.details.network-type-id')}:{' '}
            {networkTypeMap.get(satelliteNetworkCapacity.network_type_id) || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-capacity.details.total-bandwidth')}: {satelliteNetworkCapacity.total_bandwidth ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-capacity.details.users-number')}: {satelliteNetworkCapacity.users_number ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <RowOptions
          onEdit={() => onEdit(satelliteNetworkCapacity)}
          onDelete={() => onDelete(satelliteNetworkCapacity.id)}
          item={satelliteNetworkCapacity}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'satellitenetworkcapacity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'satellitenetworkcapacity'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default SatelliteNetworkCapacityCard;
