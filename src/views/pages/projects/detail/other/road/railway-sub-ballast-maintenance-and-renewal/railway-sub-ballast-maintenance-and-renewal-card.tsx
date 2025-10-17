import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySubBallastMaintenanceAndRenewal } from 'src/types/project/other'; // Updated import
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySubBallastMaintenanceAndRenewalCardProps {
  // Renamed interface
  railwaySubBallastMaintenanceAndRenewal: RailwaySubBallastMaintenanceAndRenewal; // Renamed prop and updated type
  refetch: () => void;
  onEdit: (data: RailwaySubBallastMaintenanceAndRenewal) => void; // Updated type
  onDelete: (id: string) => void;
  onDetail: (data: RailwaySubBallastMaintenanceAndRenewal) => void; // Updated type
}

const RailwaySubBallastMaintenanceAndRenewalCard: React.FC<RailwaySubBallastMaintenanceAndRenewalCardProps> = ({
  // Renamed component
  railwaySubBallastMaintenanceAndRenewal, // Renamed prop
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  const {
    id,
    project_id,
    railway_line_section_name,
    scheduled_maintenance_activities, // New field
    sub_ballast_renewal_history, // New field
    recent_maintenance_dates, // New field
    inspection_reports_findings, // New field
    remark
  } = railwaySubBallastMaintenanceAndRenewal; // Destructuring from the new model

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Button
              onClick={() => onDetail(railwaySubBallastMaintenanceAndRenewal)} // Use new prop name
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {id?.slice(0, 8)}... {/* Displaying ID of the record */}
            </Button>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-maintenance-and-renewal.details.project_id', 'Project ID')}: {project_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-maintenance-and-renewal.details.railway_line_section_name', 'Railway Line Section Name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-sub-ballast-maintenance-and-renewal.details.scheduled_maintenance_activities',
              'Scheduled Maintenance Activities'
            )}
            : {scheduled_maintenance_activities || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-sub-ballast-maintenance-and-renewal.details.sub_ballast_renewal_history',
              'Sub-Ballast Renewal History'
            )}
            : {sub_ballast_renewal_history || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-maintenance-and-renewal.details.recent_maintenance_dates', 'Recent Maintenance Dates')}:{' '}
            {recent_maintenance_dates ? formatDynamicDate(recent_maintenance_dates) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-sub-ballast-maintenance-and-renewal.details.inspection_reports_findings',
              'Inspection Reports Findings'
            )}
            : {inspection_reports_findings || 'N/A'}
          </Typography>
          {remark && (
            <Typography variant="body2" color="text.secondary">
              {t('project.other.railway-sub-ballast-maintenance-and-renewal.details.remark', 'Remark')}: {remark}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastMaintenanceAndRenewal" // Updated model name
          model_id={id} // Use the specific ID of the maintenance record
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastmaintenanceandrenewal' // Updated subject
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastmaintenanceandrenewal' // Updated subject
          }}
          onEdit={() => onEdit(railwaySubBallastMaintenanceAndRenewal)} // Use new prop name
          onDelete={() => onDelete(id as string)} // Ensure id is string if it can be undefined
          item={railwaySubBallastMaintenanceAndRenewal} // Use new prop name
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastMaintenanceAndRenewalCard; // Renamed export
