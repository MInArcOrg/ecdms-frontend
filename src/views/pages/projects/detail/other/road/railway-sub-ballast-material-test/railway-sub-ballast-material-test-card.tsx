import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
// Assuming RailwaySubBallastMaterialTest is defined in this path or a similar one
import type { RailwaySubBallastMaterialTest } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date'; // Keep if displaying created_at/updated_at

// Renamed interface and props
interface RailwaySubBallastMaterialTestCardProps {
  railwaySubBallastMaterialTest: RailwaySubBallastMaterialTest;
  refetch: () => void;
  onEdit: (data: RailwaySubBallastMaterialTest) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwaySubBallastMaterialTest) => void;
}

// Renamed component
const RailwaySubBallastMaterialTestCard: React.FC<RailwaySubBallastMaterialTestCardProps> = ({
  railwaySubBallastMaterialTest, // Updated prop name
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  // Destructure fields from RailwaySubBallastMaterialTest
  const {
    id, // Own ID of the test record
    project_id, // Foreign key to the project
    railway_line_section_name,
    sub_ballast_material_type_id,
    testing_method_used, // New field from RailwaySubBallastMaterialTest
    sampling_method,     // New field
    sample_size,         // New field
    material_source,     // New field
    sieve_analysis_results, // New field
    supplier,            // New field
    remark,
    created_at           // Added for display
  } = railwaySubBallastMaterialTest;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            {/* Displaying a snippet of the record's own ID as the main link/title */}
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySubBallastMaterialTest)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {/* Using 'id' for the card title, assuming it's the unique ID for the test record */}
              {id?.toString().slice(0, 8)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          {/* Updated Typography sections to reflect RailwaySubBallastMaterialTest fields and locales */}
          <Typography variant="body2" color="text.secondary">
            {/* Updated locale key */}
            {t('project.other.railway-sub-ballast-material-test.details.project-id', 'Project ID')}:{' '}
            {project_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.railway-line-section-name', 'Section Name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.sub-ballast-material-type-id', 'Material Type ID')}:{' '}
            {sub_ballast_material_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.testing-method-used', 'Testing Method')}:{' '}
            {testing_method_used || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.sampling-method', 'Sampling Method')}:{' '}
            {sampling_method || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.sample-size', 'Sample Size')}:{' '}
            {sample_size?.toLocaleString() ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.material-source', 'Material Source')}:{' '}
            {material_source || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.sieve-analysis-results', 'Sieve Analysis')}:{' '}
            {sieve_analysis_results || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.supplier', 'Supplier')}:{' '}
            {supplier || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material-test.details.remark', 'Remark')}: {remark ?? 'N/A'}
          </Typography>
          {created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at', 'Created At')}: {formatCreatedAt(created_at)}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastMaterialTest" // Updated model name
          model_id={id} // Using the specific record's ID for actions
          refetchModel={refetch}
          resubmit={refetch} // Consider if resubmit action is different
          title="" // Provide a title if needed for ModelAction modal
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastmaterialtest' // Updated permission subject
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastmaterialtest' // Updated permission subject
          }}
          onEdit={() => onEdit(railwaySubBallastMaterialTest)}
          onDelete={() => onDelete(id)} // id is the ID of the specific test record
          item={railwaySubBallastMaterialTest} // Pass the full item
          options={[]} // Add custom options if any
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastMaterialTestCard; // Renamed export