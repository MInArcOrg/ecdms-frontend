'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { SatelliteNetworkComponentAge } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface SatelliteInfrastructureAgeCardProps {
  satelliteInfrastructureAge: SatelliteNetworkComponentAge;
  refetch: () => void;
  onEdit: (satelliteInfrastructureAge: SatelliteNetworkComponentAge) => void;
  onDelete: (id: string) => void;
  onDetail: (satelliteInfrastructureAge: SatelliteNetworkComponentAge) => void;
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
          {satelliteInfrastructureAge?.cell_towers !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.cell-towers')}: {satelliteInfrastructureAge.cell_towers}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.antennas !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.antennas')}: {satelliteInfrastructureAge.antennas}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.base_stations !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.base-stations')}: {satelliteInfrastructureAge.base_stations}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.repeaters !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.repeaters')}: {satelliteInfrastructureAge.repeaters}{' '}
                {t('common.years')}
              </Typography>
            </Grid>
          )}

          {satelliteInfrastructureAge?.switches !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.satellite-infrastructure-age.details.switches')}: {satelliteInfrastructureAge.switches}{' '}
                {t('common.years')}
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
        <FileDrawer id={satelliteInfrastructureAge.id} type={uploadableProjectFileTypes.other.satelliteNetworkComponentAge} />

        <Box display="flex">
          <ModelAction
            model="SatelliteNetworkComponentAge"
            model_id={satelliteInfrastructureAge.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'satellitenetworkcomponentage'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'satellitenetworkcomponentage'
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
