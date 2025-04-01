'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { BroadcastingInfrastructureManufacturer } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface BroadcastingInfrastructureManufacturerCardProps {
  broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer;
  refetch: () => void;
  onEdit: (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => void;
  onDelete: (id: string) => void;
  onDetail: (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => void;
}

const BroadcastingInfrastructureManufacturerCard: React.FC<BroadcastingInfrastructureManufacturerCardProps> = ({
  broadcastingInfrastructureManufacturer,
  refetch,
  onEdit,
  onDelete,
  onDetail
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
              onClick={() => onDetail(broadcastingInfrastructureManufacturer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {broadcastingInfrastructureManufacturer?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {broadcastingInfrastructureManufacturer?.name !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.broadcasting-infrastructure-age.details.nmae')}: {broadcastingInfrastructureManufacturer.name}
              </Typography>
            </Grid>
          )}
          {broadcastingInfrastructureManufacturer?.antennas && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.broadcasting-infrastructure-manufacturer.details.antennas')}:{' '}
                {broadcastingInfrastructureManufacturer.antennas}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureManufacturer?.transmitters && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.broadcasting-infrastructure-manufacturer.details.transmitters')}:{' '}
                {broadcastingInfrastructureManufacturer.transmitters}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureManufacturer?.towers && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.broadcasting-infrastructure-manufacturer.details.towers')}:{' '}
                {broadcastingInfrastructureManufacturer.towers}
              </Typography>
            </Grid>
          )}

          {broadcastingInfrastructureManufacturer?.cables && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.broadcasting-infrastructure-manufacturer.details.cables')}:{' '}
                {broadcastingInfrastructureManufacturer.cables}
              </Typography>
            </Grid>
          )}
        </Grid>

        {broadcastingInfrastructureManufacturer?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.broadcasting-infrastructure-manufacturer.details.others')}: {broadcastingInfrastructureManufacturer.others}
            </Typography>
          </Box>
        )}

        {broadcastingInfrastructureManufacturer?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(broadcastingInfrastructureManufacturer.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer
          id={broadcastingInfrastructureManufacturer.id}
          type={uploadableProjectFileTypes.other.broadcastingInfrastructureManufacturer}
        />

        <Box display="flex">
          <ModelAction
            model="BroadcastingInfrastructureManufacturer"
            model_id={broadcastingInfrastructureManufacturer.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'broadcastinginfrastructuremanufacturer'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'broadcastinginfrastructuremanufacturer'
            }}
            onEdit={() => onEdit(broadcastingInfrastructureManufacturer)}
            onDelete={() => onDelete(broadcastingInfrastructureManufacturer.id)}
            item={broadcastingInfrastructureManufacturer}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default BroadcastingInfrastructureManufacturerCard;
