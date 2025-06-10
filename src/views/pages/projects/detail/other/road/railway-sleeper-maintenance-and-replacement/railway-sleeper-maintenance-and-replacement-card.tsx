import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySleeperMaintenanceAndReplacement } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySleeperMaintenanceAndReplacementCardProps {
  railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement;
  refetch: () => void;
  onEdit: (railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement) => void;
  onDelete: (id: string) => void;
  onDetail: (railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement) => void;
}

const RailwaySleeperMaintenanceAndReplacementCard: React.FC<RailwaySleeperMaintenanceAndReplacementCardProps> = ({
  railwaySleeperMaintenanceAndReplacement,
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
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySleeperMaintenanceAndReplacement)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySleeperMaintenanceAndReplacement?.project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.railway_line_section_name')}:{' '}
            {railwaySleeperMaintenanceAndReplacement.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.scheduled_maintenance_activities')}:{' '}
            {railwaySleeperMaintenanceAndReplacement.scheduled_maintenance_activities || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.recent_maintenance_date')}:{' '}
            {railwaySleeperMaintenanceAndReplacement?.recent_maintenance_date ? formatDynamicDate(railwaySleeperMaintenanceAndReplacement?.recent_maintenance_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.inspection_reports')}:{' '}
            {railwaySleeperMaintenanceAndReplacement.inspection_reports || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.sleeper_replacement_history')}:{' '}
            {railwaySleeperMaintenanceAndReplacement.sleeper_replacement_history || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-maintenance-and-replacement.details.remark')}:{' '}
            {railwaySleeperMaintenanceAndReplacement.remark || 'N/A'}
          </Typography>
          {railwaySleeperMaintenanceAndReplacement.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySleeperMaintenanceAndReplacement.created_at}
            </Typography>
          )}
          {railwaySleeperMaintenanceAndReplacement.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySleeperMaintenanceAndReplacement.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySleeperMaintenanceAndReplacement"
          model_id={railwaySleeperMaintenanceAndReplacement.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysleepermaintenanceandreplacement'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysleepermaintenanceandreplacement'
          }}
          onEdit={() => onEdit(railwaySleeperMaintenanceAndReplacement)}
          onDelete={() => onDelete(railwaySleeperMaintenanceAndReplacement.id)}
          item={railwaySleeperMaintenanceAndReplacement}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySleeperMaintenanceAndReplacementCard;