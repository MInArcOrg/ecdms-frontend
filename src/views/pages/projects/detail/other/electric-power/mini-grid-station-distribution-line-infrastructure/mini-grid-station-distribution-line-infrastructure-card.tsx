'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { MiniGridStationDistributionLineInfrastructure } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface MiniGridStationDistributionLineInfrastructureCardProps {
  miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure;
  refetch: () => void;
  onEdit: (miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure) => void;
  onDelete: (id: string) => void;
  onDetail: (miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure) => void;
  miniGridStationsMap: Map<string, string>;
  distributionLineTypesMap: Map<string, string>;
  distributionLineMaterialsMap: Map<string, string>;
}

const MiniGridStationDistributionLineInfrastructureCard: React.FC<MiniGridStationDistributionLineInfrastructureCardProps> = ({
  miniGridStationDistributionLineInfrastructure,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  miniGridStationsMap,
  distributionLineTypesMap,
  distributionLineMaterialsMap
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
              onClick={() => onDetail(miniGridStationDistributionLineInfrastructure)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {miniGridStationDistributionLineInfrastructure?.name || miniGridStationDistributionLineInfrastructure?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.mini-grid-station-distribution-line-infrastructure.general-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationDistributionLineInfrastructure?.mini_grid_station_id && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.mini-grid-station-id')}:{' '}
                {miniGridStationsMap.get(miniGridStationDistributionLineInfrastructure.mini_grid_station_id) ||
                  miniGridStationDistributionLineInfrastructure.mini_grid_station_id}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.mini-grid-station-distribution-line-infrastructure.technical-specifications')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationDistributionLineInfrastructure?.distribution_line_type_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-type-id')}:{' '}
                {distributionLineTypesMap.get(miniGridStationDistributionLineInfrastructure.distribution_line_type_id) ||
                  miniGridStationDistributionLineInfrastructure.distribution_line_type_id}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLineInfrastructure?.distribution_line_material_id && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-material-id')}:{' '}
                {distributionLineMaterialsMap.get(miniGridStationDistributionLineInfrastructure.distribution_line_material_id) ||
                  miniGridStationDistributionLineInfrastructure.distribution_line_material_id}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLineInfrastructure?.distribution_line_conductor_size !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-conductor-size')}:{' '}
                {miniGridStationDistributionLineInfrastructure.distribution_line_conductor_size} {t('common.mm2')}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLineInfrastructure?.voltage_level !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.voltage-level')}:{' '}
                {miniGridStationDistributionLineInfrastructure.voltage_level} {t('common.kv')}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLineInfrastructure?.topology && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.topology')}:{' '}
                {t(
                  `project.other.mini-grid-station-distribution-line-infrastructure.topology-options.${miniGridStationDistributionLineInfrastructure.topology.toLowerCase()}`
                )}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.mini-grid-station-distribution-line-infrastructure.connection-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          {miniGridStationDistributionLineInfrastructure?.switching_station_connection !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.switching-station-connection')}:{' '}
                {miniGridStationDistributionLineInfrastructure.switching_station_connection ? t('common.yes') : t('common.no')}
              </Typography>
            </Grid>
          )}

          {miniGridStationDistributionLineInfrastructure?.station_name && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.mini-grid-station-distribution-line-infrastructure.details.station-name')}:{' '}
                {miniGridStationDistributionLineInfrastructure.station_name}
              </Typography>
            </Grid>
          )}
        </Grid>

        {miniGridStationDistributionLineInfrastructure?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.mini-grid-station-distribution-line-infrastructure.details.remark')}:{' '}
              {miniGridStationDistributionLineInfrastructure.remark}
            </Typography>
          </Box>
        )}

        {miniGridStationDistributionLineInfrastructure?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(miniGridStationDistributionLineInfrastructure.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer
          id={miniGridStationDistributionLineInfrastructure.id}
          type={uploadableProjectFileTypes.other.mini_grid_station_distribution_line_infrastructure}
        />

        <Box display="flex">
          <ModelAction
            model="MiniGridStationDistributionLineInfrastructure"
            model_id={miniGridStationDistributionLineInfrastructure.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'minigridstationdistributionlineinfrastructure'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'minigridstationdistributionlineinfrastructure'
            }}
            onEdit={() => onEdit(miniGridStationDistributionLineInfrastructure)}
            onDelete={() => onDelete(miniGridStationDistributionLineInfrastructure.id)}
            item={miniGridStationDistributionLineInfrastructure}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default MiniGridStationDistributionLineInfrastructureCard;
