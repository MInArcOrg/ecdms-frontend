'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { RoadMaintenanceData } from 'src/types/project/other';
import { formatDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RoadMaintenanceDataCardProps {
  roadMaintenanceData: RoadMaintenanceData;
  refetch: () => void;
  onEdit: (roadMaintenanceData: RoadMaintenanceData) => void;
  onDelete: (id: string) => void;
  onDetail: (roadMaintenanceData: RoadMaintenanceData) => void;
}

const RoadMaintenanceDataCard: React.FC<RoadMaintenanceDataCardProps> = ({ roadMaintenanceData, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(roadMaintenanceData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {roadMaintenanceData?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-maintenance-data.details.road-segment')}: {roadMaintenanceData?.road_segment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-maintenance-data.details.maintenance-start-date')}:{' '}
            {roadMaintenanceData?.maintenance_start_date ? formatDate(roadMaintenanceData.maintenance_start_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-maintenance-data.details.maintenance-end-date')}:{' '}
            {roadMaintenanceData?.maintenance_end_date ? formatDate(roadMaintenanceData.maintenance_end_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-maintenance-data.details.weather-condition')}: {roadMaintenanceData?.weather_condition || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RoadMaintenanceData"
          model_id={roadMaintenanceData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadmaintenancedata'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'roadmaintenancedata'
          }}
          onEdit={() => onEdit(roadMaintenanceData)}
          onDelete={() => onDelete(roadMaintenanceData.id)}
          item={roadMaintenanceData}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default RoadMaintenanceDataCard;
