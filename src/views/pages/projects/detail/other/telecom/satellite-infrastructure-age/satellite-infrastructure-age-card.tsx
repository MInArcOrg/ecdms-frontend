'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { SatelliteInfrastructureAge } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface SatelliteInfrastructureAgeCardProps {
  satelliteInfrastructureAge: SatelliteInfrastructureAge;
  refetch: () => void;
  onEdit: (satelliteInfrastructureAge: SatelliteInfrastructureAge) => void;
  onDelete: (id: string) => void;
  onDetail: (satelliteInfrastructureAge: SatelliteInfrastructureAge) => void;
  satelliteNetworkMap: Map<string, string>;
}

const SatelliteInfrastructureAgeCard: React.FC<SatelliteInfrastructureAgeCardProps> = ({
  satelliteInfrastructureAge,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  satelliteNetworkMap
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
              onClick={() => onDetail(satelliteInfrastructureAge)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {satelliteNetworkMap.get(satelliteInfrastructureAge?.satellite_network_id) ||
                satelliteInfrastructureAge?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {satelliteInfrastructureAge?.satellite !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.satellite')}: {satelliteInfrastructureAge.satellite}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.ground_stations !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.ground-stations')}: {satelliteInfrastructureAge.ground_stations}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.modems !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.modems')}: {satelliteInfrastructureAge.modems} {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.routers !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.routers')}: {satelliteInfrastructureAge.routers} {t('common.years')}
              </Typography>
            </Grid>
          )}
        </Grid>

        {satelliteInfrastructureAge?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.satellite-infrastructure-age.details.others')}: {satelliteInfrastructureAge.others}
            </Typography>
          </Box>
        )}

        {satelliteInfrastructureAge?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(satelliteInfrastructureAge.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={satelliteInfrastructureAge.id} type={uploadableProjectFileTypes.other.satelliteInfrastructureAge} />

        <Box display="flex">
          <ModelAction
            model="SatelliteInfrastructureAge"
            model_id={satelliteInfrastructureAge.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'satelliteinfrastructureage'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'satelliteinfrastructureage'
            }}
            onEdit={() => onEdit(satelliteInfrastructureAge)}
            onDelete={() => onDelete(satelliteInfrastructureAge.id)}
            item={satelliteInfrastructureAge}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default SatelliteInfrastructureAgeCard;
