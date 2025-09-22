import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayBallastMaintenanceAndRenewal } from 'src/types/project/other'; // Updated type import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date'; // Assuming this utility is available for date formatting

interface RailwayBallastMaintenanceAndRenewalCardProps {
  // Renamed interface
  railwayBallastMaintenanceAndRenewal: RailwayBallastMaintenanceAndRenewal; // Updated prop type
  refetch: () => void;
  onEdit: (data: RailwayBallastMaintenanceAndRenewal) => void; // Updated type
  onDelete: (id: string) => void;
  onDetail: (data: RailwayBallastMaintenanceAndRenewal) => void; // Updated type
}

const RailwayBallastMaintenanceAndRenewalCard: React.FC<RailwayBallastMaintenanceAndRenewalCardProps> = ({
  // Renamed component
  railwayBallastMaintenanceAndRenewal, // Updated prop name
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  const {
    project_id,
    railway_line_section_name,
    scheduled_maintenance_activities, // New field
    recent_maintenance_dates, // New field
    inspection_reports_findings, // New field
    remark
  } = railwayBallastMaintenanceAndRenewal;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayBallastMaintenanceAndRenewal)} // Updated prop name
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-maintenance-and-renewal.details.railway-line-section-name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-maintenance-and-renewal.details.scheduled-maintenance-activities')}:{' '}
            {scheduled_maintenance_activities || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-maintenance-and-renewal.details.recent-maintenance-dates')}:{' '}
            {recent_maintenance_dates ? formatCreatedAt(recent_maintenance_dates) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-maintenance-and-renewal.details.inspection-reports-findings')}:{' '}
            {inspection_reports_findings || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-maintenance-and-renewal.details.remark')}: {remark ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayBallastMaintenanceAndRenewal" // Updated model name
          model_id={project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballastmaintenanceandrenewal' // Updated subject
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballastmaintenanceandrenewal' // Updated subject
          }}
          onEdit={() => onEdit(railwayBallastMaintenanceAndRenewal)} // Updated prop name
          onDelete={() => onDelete(railwayBallastMaintenanceAndRenewal.id)}
          item={railwayBallastMaintenanceAndRenewal} // Updated prop name
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastMaintenanceAndRenewalCard; // Updated export name
