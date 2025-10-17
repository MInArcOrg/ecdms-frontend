'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { NetworkCapacity } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface NetworkCapacityCardProps {
  networkCapacity: NetworkCapacity;
  refetch: () => void;
  onEdit: (networkCapacity: NetworkCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (networkCapacity: NetworkCapacity) => void;
  networkTypeMap: Map<string, string>;
}

const NetworkCapacityCard: React.FC<NetworkCapacityCardProps> = ({
  networkCapacity,
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
              onClick={() => onDetail(networkCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {networkTypeMap.get(networkCapacity?.network_type_id) || networkCapacity?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {networkCapacity?.total_bandwidth !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.total-bandwidth')}: {networkCapacity.total_bandwidth} Mbps
              </Typography>
            </Grid>
          )}

          {networkCapacity?.users_number !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.users-number')}: {networkCapacity.users_number}
              </Typography>
            </Grid>
          )}

          {networkCapacity?.remark && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.remark')}: {networkCapacity.remark}
              </Typography>
            </Grid>
          )}
        </Grid>

        {networkCapacity?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(networkCapacity.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={networkCapacity.id} type={uploadableProjectFileTypes.other.networkCapacity} />

        <Box display="flex">
          <ModelAction
            model="NetworkCapacity"
            model_id={networkCapacity.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'networkcapacity'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'networkcapacity'
            }}
            onEdit={() => onEdit(networkCapacity)}
            onDelete={() => onDelete(networkCapacity.id)}
            item={networkCapacity}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default NetworkCapacityCard;
