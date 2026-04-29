'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { BroadcastingNetworkCoverage } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BroadcastingNetworkCoverageCardProps {
  broadcastingNetworkCoverage: BroadcastingNetworkCoverage;
  refetch: () => void;
  onEdit: (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => void;
  onDelete: (id: string) => void;
  onDetail: (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => void;
  networkInfrastructureTypeMap: Map<string, string>;
}

const BroadcastingNetworkCoverageCard: React.FC<BroadcastingNetworkCoverageCardProps> = ({
  broadcastingNetworkCoverage,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  networkInfrastructureTypeMap
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
              onClick={() => onDetail(broadcastingNetworkCoverage)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {broadcastingNetworkCoverage?.id?.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-coverage.details.broadcasting-infrastructure')}:{' '}
            {broadcastingNetworkCoverage?.broadcasting_infrastructure_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-coverage.details.network-infrastructure-type')}:{' '}
            {broadcastingNetworkCoverage?.networkInfrastructureType?.title ||
              networkInfrastructureTypeMap.get(broadcastingNetworkCoverage?.network_infrastructure_type_id) ||
              broadcastingNetworkCoverage?.network_infrastructure_type_id ||
              'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-coverage.details.total-coverage-area')}:{' '}
            {broadcastingNetworkCoverage?.total_coverage_area?.toString() || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="BroadcastingNetworkCoverage"
          model_id={broadcastingNetworkCoverage.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'broadcastingnetworkcoverage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'broadcastingnetworkcoverage'
          }}
          onEdit={() => onEdit(broadcastingNetworkCoverage)}
          onDelete={() => onDelete(broadcastingNetworkCoverage.id)}
          item={broadcastingNetworkCoverage}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BroadcastingNetworkCoverageCard;
