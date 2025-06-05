import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySubBallastDrainageAndWaterManagement } from 'src/types/project/other'; // Updated type import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySubBallastDrainageAndWaterManagementCardProps { // Renamed interface
  railwaySubBallastDrainageAndWaterManagement: RailwaySubBallastDrainageAndWaterManagement; // Updated prop type
  refetch: () => void;
  onEdit: (data: RailwaySubBallastDrainageAndWaterManagement) => void; // Updated parameter type
  onDelete: (id: string) => void;
  onDetail: (data: RailwaySubBallastDrainageAndWaterManagement) => void; // Updated parameter type
}

const RailwaySubBallastDrainageAndWaterManagementCard: React.FC<RailwaySubBallastDrainageAndWaterManagementCardProps> = ({ // Renamed component
  railwaySubBallastDrainageAndWaterManagement, // Updated prop name
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
    drainage_condition_assessment, // New field
    drainage_infrastructure_type, // New field
    water_management_measures, // New field
    drainage_infrastructure_length, // New field
    remark
  } = railwaySubBallastDrainageAndWaterManagement; // Using updated prop name

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Button
              onClick={() => onDetail(railwaySubBallastDrainageAndWaterManagement)} // Using updated prop name
              sx={{
                fontWeight: 500,
                textTransform: 'none',
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {id ? `${id.slice(0, 8)}...` : 'N/A'} {/* Displaying ID and slicing for brevity */}
            </Button>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-drainage-and-water-management.details.railway_line_section_name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_condition_assessment')}:{' '}
            {drainage_condition_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_type')}:{' '}
            {drainage_infrastructure_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-drainage-and-water-management.details.water_management_measures')}:{' '}
            {water_management_measures || 'N/A'}
          </Typography>
          {drainage_infrastructure_length !== undefined && ( // Conditional rendering for numerical field
            <Typography variant="body2" color="text.secondary">
              {t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_length')}:{' '}
              {drainage_infrastructure_length.toLocaleString() || 'N/A'}
            </Typography>
          )}
          {remark && (
            <Typography variant="body2" color="text.secondary">
              {t('project.other.railway-sub-ballast-drainage-and-water-management.details.remark')}: {remark}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastDrainageAndWaterManagement" // Updated model name
          model_id={id as string} // Using 'id' for the model_id
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastdrainageandwatermanagement' // Updated subject
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastdrainageandwatermanagement' // Updated subject
          }}
          onEdit={() => onEdit(railwaySubBallastDrainageAndWaterManagement)} // Using updated prop name
          onDelete={() => onDelete(id as string)} // Assuming 'id' is always present for deletion
          item={railwaySubBallastDrainageAndWaterManagement} // Using updated prop name
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastDrainageAndWaterManagementCard; // Renamed export