'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { ElectricGridControlCenterData } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ElectricGridControlCenterDataCardProps {
  electricGridControlCenterData: ElectricGridControlCenterData;
  refetch: () => void;
  onEdit: (electricGridControlCenterData: ElectricGridControlCenterData) => void;
  onDelete: (id: string) => void;
  onDetail: (electricGridControlCenterData: ElectricGridControlCenterData) => void;
  miniGridStationsMap: Map<string, string>;
  controlSystemTypesMap: Map<string, string>;
  communicationLinksMap: Map<string, string>;
}

const ElectricGridControlCenterDataCard: React.FC<ElectricGridControlCenterDataCardProps> = ({
  electricGridControlCenterData,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  miniGridStationsMap,
  controlSystemTypesMap,
  communicationLinksMap
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
              onClick={() => onDetail(electricGridControlCenterData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {electricGridControlCenterData?.name || electricGridControlCenterData?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-grid-control-center-data.general-information')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.mini-grid-station-id')}:{' '}
              {electricGridControlCenterData?.mini_grid_station_id
                ? miniGridStationsMap.get(electricGridControlCenterData.mini_grid_station_id) ||
                  electricGridControlCenterData.mini_grid_station_id
                : t('common.not-available')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.installation-year')}:{' '}
              {electricGridControlCenterData?.installation_year !== undefined
                ? electricGridControlCenterData.installation_year
                : t('common.not-available')}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-grid-control-center-data.control-system')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.control-system-type-id')}:{' '}
              {electricGridControlCenterData?.control_system_type_id
                ? controlSystemTypesMap.get(electricGridControlCenterData.control_system_type_id) ||
                  electricGridControlCenterData.control_system_type_id
                : t('common.not-available')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.communication-links-id')}:{' '}
              {electricGridControlCenterData?.communication_links_id
                ? communicationLinksMap.get(electricGridControlCenterData.communication_links_id) ||
                  electricGridControlCenterData.communication_links_id
                : t('common.not-available')}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" mt={2} fontWeight="bold">
          {t('project.other.electric-grid-control-center-data.capabilities')}
        </Typography>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.energy-management-system-capability')}:{' '}
              {electricGridControlCenterData?.energy_management_system_capability !== undefined
                ? electricGridControlCenterData.energy_management_system_capability
                  ? t('common.yes')
                  : t('common.no')
                : t('common.not-available')}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.remote-control-capability')}:{' '}
              {electricGridControlCenterData?.remote_control_capability !== undefined
                ? electricGridControlCenterData.remote_control_capability
                  ? t('common.yes')
                  : t('common.no')
                : t('common.not-available')}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.electric-grid-control-center-data.details.average-measured-data-reliability')}:{' '}
              {electricGridControlCenterData?.average_measured_data_reliability !== undefined
                ? electricGridControlCenterData.average_measured_data_reliability
                : t('common.not-available')}
            </Typography>
          </Grid>
        </Grid>

        {electricGridControlCenterData?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(electricGridControlCenterData.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={electricGridControlCenterData.id} type={uploadableProjectFileTypes.other.electric_grid_control_center_data} />

        <Box display="flex">
          <ModelAction
            model="ElectricGridControlCenterData"
            model_id={electricGridControlCenterData.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'electricgridcontrolcenterdata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'electricgridcontrolcenterdata'
            }}
            onEdit={() => onEdit(electricGridControlCenterData)}
            onDelete={() => onDelete(electricGridControlCenterData.id)}
            item={electricGridControlCenterData}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ElectricGridControlCenterDataCard;
