'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { ElectricSmartMetersRatingsData } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ElectricSmartMetersRatingsDataCardProps {
  electricSmartMetersRatingsData: ElectricSmartMetersRatingsData;
  refetch: () => void;
  onEdit: (electricSmartMetersRatingsData: ElectricSmartMetersRatingsData) => void;
  onDelete: (id: string) => void;
  onDetail: (electricSmartMetersRatingsData: ElectricSmartMetersRatingsData) => void;
  electricSmartMetersDataMap: Map<string, string>;
}

const ElectricSmartMetersRatingsDataCard: React.FC<ElectricSmartMetersRatingsDataCardProps> = ({
  electricSmartMetersRatingsData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  electricSmartMetersDataMap
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
              onClick={() => onDetail(electricSmartMetersRatingsData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {electricSmartMetersRatingsData?.name || electricSmartMetersRatingsData?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-smart-meters-ratings-data.general-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-smart-meters-ratings-data.details.electric-smart-meters-data-id')}:{' '}
              {electricSmartMetersRatingsData?.electric_smart_meters_data_id
                ? electricSmartMetersDataMap.get(electricSmartMetersRatingsData.electric_smart_meters_data_id) ||
                  electricSmartMetersRatingsData.electric_smart_meters_data_id
                : t('common.not-available')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-smart-meters-ratings-data.details.active-reactive')}:{' '}
              {electricSmartMetersRatingsData?.active_reactive || t('common.not-available')}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-smart-meters-ratings-data.technical-specifications')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-smart-meters-ratings-data.details.phase')}:{' '}
              {electricSmartMetersRatingsData?.phase || t('common.not-available')}
            </Typography>
          </Grid>

          {electricSmartMetersRatingsData?.kwh_kvarh_rating !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-smart-meters-ratings-data.details.kwh-kvarh-rating')}:{' '}
                {electricSmartMetersRatingsData.kwh_kvarh_rating}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersRatingsData?.maximum_current_rating !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-smart-meters-ratings-data.details.maximum-current-rating')}:{' '}
                {electricSmartMetersRatingsData.maximum_current_rating}
              </Typography>
            </Grid>
          )}

          {electricSmartMetersRatingsData?.other && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.electric-smart-meters-ratings-data.details.other')}: {electricSmartMetersRatingsData.other}
              </Typography>
            </Grid>
          )}
        </Grid>

        {electricSmartMetersRatingsData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(electricSmartMetersRatingsData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={electricSmartMetersRatingsData.id} type={uploadableProjectFileTypes.other.electric_smart_meters_ratings_data} />

        <Box display="flex">
          <ModelAction
            model="ElectricSmartMetersRatingsData"
            model_id={electricSmartMetersRatingsData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'electricsmartmetersratingsdata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'electricsmartmetersratingsdata'
            }}
            onEdit={() => onEdit(electricSmartMetersRatingsData)}
            onDelete={() => onDelete(electricSmartMetersRatingsData.id)}
            item={electricSmartMetersRatingsData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricSmartMetersRatingsDataCard;
