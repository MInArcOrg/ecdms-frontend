import type React from 'react';
import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { SatelliteNetworkCoverage } from 'src/types/project/other';
import RowOptions from 'src/views/shared/listing/row-options';

interface SatelliteNetworkCoverageCardProps {
  satelliteNetworkCoverage: SatelliteNetworkCoverage;
  onEdit: (satelliteNetworkCoverage: SatelliteNetworkCoverage) => void;
  onDelete: (id: string) => void;
  onDetail: (satelliteNetworkCoverage: SatelliteNetworkCoverage) => void;
  refetch: () => void;
  networkTypeMap: Map<string, string>;
  satelliteNetworkMap: Map<string, string>;
}

const SatelliteNetworkCoverageCard: React.FC<SatelliteNetworkCoverageCardProps> = ({
  satelliteNetworkCoverage,
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
            onClick={() => onDetail(satelliteNetworkCoverage)}
          >
            {satelliteNetworkMap.get(satelliteNetworkCoverage.satellite_network_id) || t('common.not-available')}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-coverage.details.network-infrastructure-type-id')}:{' '}
            {networkTypeMap.get(satelliteNetworkCoverage.network_infrastructure_type_id) || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-coverage.details.total-coverage-area')}: {satelliteNetworkCoverage.total_coverage_area ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-coverage.details.coverage-population-no')}:{' '}
            {satelliteNetworkCoverage.coverage_population_no ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.satellite-network-coverage.details.active-users-no')}: {satelliteNetworkCoverage.active_users_no ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <RowOptions
          onEdit={() => onEdit(satelliteNetworkCoverage)}
          onDelete={() => onDelete(satelliteNetworkCoverage.id)}
          item={satelliteNetworkCoverage}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'satellitenetworkcoverage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'satellitenetworkcoverage'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default SatelliteNetworkCoverageCard;
