'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid, Chip } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { BroadcastingInfrastructure } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface BroadcastingInfrastructureCardProps {
  broadcastingInfrastructure: BroadcastingInfrastructure;
  refetch: () => void;
  onEdit: (broadcastingInfrastructure: BroadcastingInfrastructure) => void;
  onDelete: (id: string) => void;
  onDetail: (broadcastingInfrastructure: BroadcastingInfrastructure) => void;
  broadcastingInfrastructureTypeMap: Map<string, string>;
}

const BroadcastingInfrastructureCard: React.FC<BroadcastingInfrastructureCardProps> = ({
  broadcastingInfrastructure,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  broadcastingInfrastructureTypeMap
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
              onClick={() => onDetail(broadcastingInfrastructure)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {broadcastingInfrastructureTypeMap.get(broadcastingInfrastructure?.broadcasting_infrastructure_type_id) ||
                broadcastingInfrastructure?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.broadcasting-infrastructure.details.broadcasting-network')}:{' '}
              {renderStatusChip(broadcastingInfrastructure?.broadcasting_network)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.broadcasting-infrastructure.details.antennas')}: {renderStatusChip(broadcastingInfrastructure?.antennas)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.broadcasting-infrastructure.details.transmitters')}:{' '}
              {renderStatusChip(broadcastingInfrastructure?.transmitters)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.broadcasting-infrastructure.details.towers')}: {renderStatusChip(broadcastingInfrastructure?.towers)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.broadcasting-infrastructure.details.cables')}: {renderStatusChip(broadcastingInfrastructure?.cables)}
            </Typography>
          </Grid>
        </Grid>

        {broadcastingInfrastructure?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.broadcasting-infrastructure.details.others')}: {broadcastingInfrastructure.others}
            </Typography>
          </Box>
        )}

        {broadcastingInfrastructure?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(broadcastingInfrastructure.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={broadcastingInfrastructure.id} type={uploadableProjectFileTypes.other.broadcastingInfrastructure} />

        <Box display="flex">
          <ModelAction
            model="BroadcastingInfrastructure"
            model_id={broadcastingInfrastructure.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'broadcastinginfrastructure'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'broadcastinginfrastructure'
            }}
            onEdit={() => onEdit(broadcastingInfrastructure)}
            onDelete={() => onDelete(broadcastingInfrastructure.id)}
            item={broadcastingInfrastructure}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default BroadcastingInfrastructureCard;
