'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid, Chip } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { SatelliteNetwork } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface SatelliteNetworkCardProps {
  satelliteNetwork: SatelliteNetwork;
  refetch: () => void;
  onEdit: (satelliteNetwork: SatelliteNetwork) => void;
  onDelete: (id: string) => void;
  onDetail: (satelliteNetwork: SatelliteNetwork) => void;
  satelliteNetworkTypeMap: Map<string, string>;
}

const SatelliteNetworkCard: React.FC<SatelliteNetworkCardProps> = ({
  satelliteNetwork,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  satelliteNetworkTypeMap
}) => {
  const { t } = useTranslation();

  const renderStatusChip = (value: boolean | undefined) => (
    <Chip size="small" label={value ? t('common.yes') : t('common.no')} color={value ? 'success' : 'default'} sx={{ minWidth: 70 }} />
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(satelliteNetwork)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {satelliteNetwork?.name || satelliteNetworkTypeMap.get(satelliteNetwork?.satellite_network_type_id) || satelliteNetwork?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.satellite-network.details.satellite-network-type')}:{' '}
              {satelliteNetworkTypeMap.get(satelliteNetwork?.satellite_network_type_id) || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.satellite-network.details.satellite')}: {renderStatusChip(satelliteNetwork?.satellite)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.satellite-network.details.ground-stations')}: {renderStatusChip(satelliteNetwork?.ground_stations)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.satellite-network.details.modems')}: {renderStatusChip(satelliteNetwork?.modems)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.satellite-network.details.routers')}: {renderStatusChip(satelliteNetwork?.routers)}
            </Typography>
          </Grid>
        </Grid>

        {satelliteNetwork?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.satellite-network.details.others')}: {satelliteNetwork.others}
            </Typography>
          </Box>
        )}

        {satelliteNetwork?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(satelliteNetwork.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={satelliteNetwork.id} type={uploadableProjectFileTypes.other.satelliteNetwork} />

        <Box display="flex">
          <ModelAction
            model="SatelliteNetwork"
            model_id={satelliteNetwork.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'satellitenetwork'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'satellitenetwork'
            }}
            onEdit={() => onEdit(satelliteNetwork)}
            onDelete={() => onDelete(satelliteNetwork.id)}
            item={satelliteNetwork}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default SatelliteNetworkCard;
