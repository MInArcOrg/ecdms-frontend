'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { BroadcastingNetworkCapacity } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BroadcastingNetworkCapacityCardProps {
  broadcastingNetworkCapacity: BroadcastingNetworkCapacity;
  refetch: () => void;
  onEdit: (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => void;
  networkTypeMap: Map<string, string>;
}

const BroadcastingNetworkCapacityCard: React.FC<BroadcastingNetworkCapacityCardProps> = ({
  broadcastingNetworkCapacity,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  networkTypeMap
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
              onClick={() => onDetail(broadcastingNetworkCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {broadcastingNetworkCapacity?.id?.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-capacity.details.broadcasting-infrastructure')}:{' '}
            {broadcastingNetworkCapacity?.broadcasting_infrastructure_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-capacity.details.network-type')}:{' '}
            {broadcastingNetworkCapacity?.networkType?.title ||
              networkTypeMap.get(broadcastingNetworkCapacity?.network_type_id) ||
              broadcastingNetworkCapacity?.network_type_id ||
              'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.broadcasting-network-capacity.details.total-bandwidth')}:{' '}
            {broadcastingNetworkCapacity?.total_bandwidth?.toString() || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="BroadcastingNetworkCapacity"
          model_id={broadcastingNetworkCapacity.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'broadcastingnetworkcapacity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'broadcastingnetworkcapacity'
          }}
          onEdit={() => onEdit(broadcastingNetworkCapacity)}
          onDelete={() => onDelete(broadcastingNetworkCapacity.id)}
          item={broadcastingNetworkCapacity}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BroadcastingNetworkCapacityCard;
