import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { MaintenanceHistory } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface MaintenanceHistoryCardProps {
  maintenanceHistory: MaintenanceHistory;
  refetch: () => void;
  onEdit: (maintenanceHistory: MaintenanceHistory) => void;
  onDelete: (id: string) => void;
  onDetail: (maintenanceHistory: MaintenanceHistory) => void;
}

const MaintenanceHistoryCard: React.FC<MaintenanceHistoryCardProps> = ({ maintenanceHistory, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(maintenanceHistory)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {maintenanceHistory?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.road-segment')}:{' '}
            {maintenanceHistory?.roadSegment?.name || maintenanceHistory?.road_segment_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.last-maintenance-date')}:
            {maintenanceHistory?.last_maintenance_date ? formatCreatedAt(maintenanceHistory.last_maintenance_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.maintenance-type')}:{' '}
            {maintenanceHistory?.maintenanceType?.title || maintenanceHistory?.maintenance_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.severity-level')}:{' '}
            {maintenanceHistory?.severityLevel?.title || maintenanceHistory?.severity_level_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.suggested-repair')}:{' '}
            {maintenanceHistory?.suggestedRepair?.title || maintenanceHistory?.suggested_repair_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.maintenance-history.details.remark')}: {maintenanceHistory?.remark || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={maintenanceHistory.id} type={uploadableProjectFileTypes.other.maintenanceHistory} />
        <ModelAction
          model="MaintenanceHistory"
          model_id={maintenanceHistory.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'maintenancehistory'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'maintenancehistory'
          }}
          onEdit={() => onEdit(maintenanceHistory)}
          onDelete={() => onDelete(maintenanceHistory.id)}
          item={maintenanceHistory}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default MaintenanceHistoryCard;
