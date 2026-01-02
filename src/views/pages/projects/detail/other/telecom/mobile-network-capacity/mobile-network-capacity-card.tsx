'use client';

import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { MobileNetworkCapacity } from 'src/types/project/other';
import RowOptions from 'src/views/shared/listing/row-options';

interface MobileNetworkCapacityCardProps {
  mobileNetworkCapacity: MobileNetworkCapacity;
  refetch: () => void;
  onEdit: (mobileNetworkCapacity: MobileNetworkCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (mobileNetworkCapacity: MobileNetworkCapacity) => void;
  networkTypeMap: Map<string, string>;
}

const MobileNetworkCapacityCard: React.FC<MobileNetworkCapacityCardProps> = ({
  mobileNetworkCapacity,
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
              onClick={() => onDetail(mobileNetworkCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {networkTypeMap.get(mobileNetworkCapacity?.network_type_id) || mobileNetworkCapacity?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {mobileNetworkCapacity?.total_bandwidth !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.total-bandwidth')}: {mobileNetworkCapacity.total_bandwidth} Mbps
              </Typography>
            </Grid>
          )}

          {mobileNetworkCapacity?.users_number !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.users-number')}: {mobileNetworkCapacity.users_number}
              </Typography>
            </Grid>
          )}

          {mobileNetworkCapacity?.remark && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.network-capacity.details.remark')}: {mobileNetworkCapacity.remark}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="flex-end" gap={1}>
          <RowOptions
            onEdit={() => onEdit(mobileNetworkCapacity)}
            onDelete={() => onDelete(mobileNetworkCapacity.id)}
            item={mobileNetworkCapacity}
            options={[]}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MobileNetworkCapacityCard;
