'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { Transmission } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface TransmissionCardProps {
  transmission: Transmission;
  refetch: () => void;
  onEdit: (transmission: Transmission) => void;
  onDelete: (id: string) => void;
  onDetail: (transmission: Transmission) => void;
}

const TransmissionCard: React.FC<TransmissionCardProps> = ({ transmission, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  // Create a display title from the transmission voltage or ID
  const displayTitle =
    transmission?.name ||
    (transmission?.transmission_voltage !== undefined
      ? `${transmission.transmission_voltage} ${t('common.kv')}`
      : transmission?.id.slice(0, 8) + '...');

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(transmission)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {displayTitle}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {transmission?.name && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.transmission.details.name')}: {transmission.name}
              </Typography>
            </Grid>
          )}
          {transmission?.distance_to_substation !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.transmission.details.distance-to-substation')}: {transmission.distance_to_substation}{' '}
                {t('common.kilometers')}
              </Typography>
            </Grid>
          )}

          {transmission?.transmission_lines_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.transmission.details.transmission-lines-number')}: {transmission.transmission_lines_number}
              </Typography>
            </Grid>
          )}
        </Grid>

        {transmission?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.transmission.details.remark')}: {transmission.remark}
            </Typography>
          </Box>
        )}

        {transmission?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(transmission.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={transmission.id} type={uploadableProjectFileTypes.other.transmission} />

        <Box display="flex">
          <ModelAction
            model="Transmission"
            model_id={transmission.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'transmission'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'transmission'
            }}
            onEdit={() => onEdit(transmission)}
            onDelete={() => onDelete(transmission.id)}
            item={transmission}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default TransmissionCard;
