'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { ReliabilityAndMaintenance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface ReliabilityAndMaintenanceCardProps {
  reliabilityAndMaintenance: ReliabilityAndMaintenance;
  refetch: () => void;
  onEdit: (reliabilityAndMaintenance: ReliabilityAndMaintenance) => void;
  onDelete: (id: string) => void;
  onDetail: (reliabilityAndMaintenance: ReliabilityAndMaintenance) => void;
  maintenanceFrequencyMap: Map<string, string>;
}

const ReliabilityAndMaintenanceCard: React.FC<ReliabilityAndMaintenanceCardProps> = ({
  reliabilityAndMaintenance,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  maintenanceFrequencyMap
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
              onClick={() => onDetail(reliabilityAndMaintenance)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {reliabilityAndMaintenance?.maintenance_frequency_id
                ? maintenanceFrequencyMap.get(reliabilityAndMaintenance.maintenance_frequency_id)
                : reliabilityAndMaintenance?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          {reliabilityAndMaintenance?.total_outage_duration !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.reliability-and-maintenance.details.total-outage-duration')}:{' '}
                {reliabilityAndMaintenance.total_outage_duration} {t('common.hours')}
              </Typography>
            </Grid>
          )}

          {reliabilityAndMaintenance?.total_interruption_number !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.reliability-and-maintenance.details.total-interruption-number')}:{' '}
                {reliabilityAndMaintenance.total_interruption_number}
              </Typography>
            </Grid>
          )}

          {reliabilityAndMaintenance?.saidi !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.reliability-and-maintenance.details.saidi')}: {reliabilityAndMaintenance.saidi}
              </Typography>
            </Grid>
          )}

          {reliabilityAndMaintenance?.saifi !== undefined && (
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.reliability-and-maintenance.details.saifi')}: {reliabilityAndMaintenance.saifi}
              </Typography>
            </Grid>
          )}

          {reliabilityAndMaintenance?.automatic_fault_detection_restoration_system_installed !== undefined && (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                {t('project.other.reliability-and-maintenance.details.automatic-fault-detection')}:{' '}
                {reliabilityAndMaintenance.automatic_fault_detection_restoration_system_installed ? t('common.yes') : t('common.no')}
              </Typography>
            </Grid>
          )}
        </Grid>

        {reliabilityAndMaintenance?.remark && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.reliability-and-maintenance.details.remark')}: {reliabilityAndMaintenance.remark}
            </Typography>
          </Box>
        )}

        {reliabilityAndMaintenance?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(reliabilityAndMaintenance.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={reliabilityAndMaintenance.id} type={uploadableProjectFileTypes.other.reliabilityAndMaintenance} />

        <Box display="flex">
          <ModelAction
            model="ReliabilityAndMaintenance"
            model_id={reliabilityAndMaintenance.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'reliabilityandmaintenance'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'reliabilityandmaintenance'
            }}
            onEdit={() => onEdit(reliabilityAndMaintenance)}
            onDelete={() => onDelete(reliabilityAndMaintenance.id)}
            item={reliabilityAndMaintenance}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default ReliabilityAndMaintenanceCard;
