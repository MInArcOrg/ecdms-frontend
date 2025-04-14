'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { ElectricDistributionTransformer } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ElectricDistributionTransformerCardProps {
  electricDistributionTransformer: ElectricDistributionTransformer;
  refetch: () => void;
  onEdit: (electricDistributionTransformer: ElectricDistributionTransformer) => void;
  onDelete: (id: string) => void;
  onDetail: (electricDistributionTransformer: ElectricDistributionTransformer) => void;
  fireExtinguishingTechnologiesMap: Map<string, string>;
}

const ElectricDistributionTransformerCard: React.FC<ElectricDistributionTransformerCardProps> = ({
  electricDistributionTransformer,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  fireExtinguishingTechnologiesMap
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
              onClick={() => onDetail(electricDistributionTransformer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {electricDistributionTransformer?.name || electricDistributionTransformer?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-distribution-transformer.technical-specifications')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-distribution-transformer.details.fire-extinguishing-technology-id')}:{' '}
              {electricDistributionTransformer?.fire_extinguishing_technology_id
                ? fireExtinguishingTechnologiesMap.get(electricDistributionTransformer.fire_extinguishing_technology_id) ||
                  electricDistributionTransformer.fire_extinguishing_technology_id
                : t('common.not-available')}
            </Typography>
          </Grid>

          {electricDistributionTransformer?.service_area !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-distribution-transformer.details.service-area')}: {electricDistributionTransformer.service_area}{' '}
                {t('common.km2')}
              </Typography>
            </Grid>
          )}

          {electricDistributionTransformer?.installation_year !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-distribution-transformer.details.installation-year')}:{' '}
                {electricDistributionTransformer.installation_year}
              </Typography>
            </Grid>
          )}

          {electricDistributionTransformer?.transformers_total_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-distribution-transformer.details.transformers-total-number')}:{' '}
                {electricDistributionTransformer.transformers_total_number}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-distribution-transformer.location-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {electricDistributionTransformer?.gps_x_coordinates !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-distribution-transformer.details.gps-x-coordinates')}:{' '}
                {electricDistributionTransformer.gps_x_coordinates}
              </Typography>
            </Grid>
          )}

          {electricDistributionTransformer?.gps_y_coordinates !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-distribution-transformer.details.gps-y-coordinates')}:{' '}
                {electricDistributionTransformer.gps_y_coordinates}
              </Typography>
            </Grid>
          )}
        </Grid>

        {electricDistributionTransformer?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(electricDistributionTransformer.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={electricDistributionTransformer.id} type={uploadableProjectFileTypes.other.electric_distribution_transformer} />

        <Box display="flex">
          <ModelAction
            model="ElectricDistributionTransformer"
            model_id={electricDistributionTransformer.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'electricdistributiontransformer'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'electricdistributiontransformer'
            }}
            onEdit={() => onEdit(electricDistributionTransformer)}
            onDelete={() => onDelete(electricDistributionTransformer.id)}
            item={electricDistributionTransformer}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricDistributionTransformerCard;
