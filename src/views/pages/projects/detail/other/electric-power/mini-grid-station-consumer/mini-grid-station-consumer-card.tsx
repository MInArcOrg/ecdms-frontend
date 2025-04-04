'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { MiniGridStationConsumer } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface MiniGridStationConsumerCardProps {
  miniGridStationConsumer: MiniGridStationConsumer;
  refetch: () => void;
  onEdit: (miniGridStationConsumer: MiniGridStationConsumer) => void;
  onDelete: (id: string) => void;
  onDetail: (miniGridStationConsumer: MiniGridStationConsumer) => void;
}

const MiniGridStationConsumerCard: React.FC<MiniGridStationConsumerCardProps> = ({
  miniGridStationConsumer,
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
              onClick={() => onDetail(miniGridStationConsumer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {miniGridStationConsumer?.name || miniGridStationConsumer?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.mini-grid-station-consumer.consumer-types')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationConsumer?.residential !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.residential')}: {miniGridStationConsumer.residential}
              </Typography>
            </Grid>
          )}

          {miniGridStationConsumer?.commercial !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.commercial')}: {miniGridStationConsumer.commercial}
              </Typography>
            </Grid>
          )}

          {miniGridStationConsumer?.productive_industrial !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.productive-industrial')}:{' '}
                {miniGridStationConsumer.productive_industrial}
              </Typography>
            </Grid>
          )}

          {miniGridStationConsumer?.health_centers !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.health-centers')}: {miniGridStationConsumer.health_centers}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.mini-grid-station-consumer.electricity-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationConsumer?.expected_electricity_sales !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.expected-electricity-sales')}:{' '}
                {miniGridStationConsumer.expected_electricity_sales} {t('common.kwh')}
              </Typography>
            </Grid>
          )}

          {miniGridStationConsumer?.electricity_tariff !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-consumer.details.electricity-tariff')}: {miniGridStationConsumer.electricity_tariff}{' '}
                {t('common.currency')}
              </Typography>
            </Grid>
          )}
        </Grid>

        {miniGridStationConsumer?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.mini-grid-station-consumer.details.remark')}: {miniGridStationConsumer.remark}
            </Typography>
          </Box>
        )}

        {miniGridStationConsumer?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(miniGridStationConsumer.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={miniGridStationConsumer.id} type={uploadableProjectFileTypes.other.mini_grid_station_consumer} />

        <Box display="flex">
          <ModelAction
            model="MiniGridStationConsumer"
            model_id={miniGridStationConsumer.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'minigridstationconsumer'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'minigridstationconsumer'
            }}
            onEdit={() => onEdit(miniGridStationConsumer)}
            onDelete={() => onDelete(miniGridStationConsumer.id)}
            item={miniGridStationConsumer}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default MiniGridStationConsumerCard;
