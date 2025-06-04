import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySubBallastMaterial } from 'src/types/project/other'; // Updated import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface RailwaySubBallastMaterialCardProps {
  railwaySubBallastMaterial: RailwaySubBallastMaterial; // Updated prop name and type
  refetch: () => void;
  onEdit: (data: RailwaySubBallastMaterial) => void; // Updated type
  onDelete: (id: string) => void;
  onDetail: (data: RailwaySubBallastMaterial) => void; // Updated type
}

const RailwaySubBallastMaterialCard: React.FC<RailwaySubBallastMaterialCardProps> = ({
  railwaySubBallastMaterial,
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
    sub_ballast_material_type_id, // New field
    layer_thickness, // New field
    layer_depth, // New field
    density, // New field
    moisture_content, // New field
    method_used_for_compaction, // New field
    compaction_density, // New field
    remark
  } = railwaySubBallastMaterial; // Updated object destructuring

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySubBallastMaterial)} // Updated
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
            {t('project.other.railway-sub-ballast-material.details.railway-line-section-name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.sub-ballast-material-type-id')}:{' '}
            {sub_ballast_material_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.layer-thickness')}:{' '}
            {layer_thickness ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.layer-depth')}:{' '}
            {layer_depth ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.density')}: {density ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.moisture-content')}:{' '}
            {moisture_content ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.method-used-for-compaction')}:{' '}
            {method_used_for_compaction || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.compaction-density')}:{' '}
            {compaction_density ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-material.details.remark')}: {remark ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastMaterial" // Updated model name
          model_id={project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastmaterial' // Updated subject
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastmaterial' // Updated subject
          }}
          onEdit={() => onEdit(railwaySubBallastMaterial)} // Updated
          onDelete={() => onDelete(id)}
          item={railwaySubBallastMaterial} // Updated
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastMaterialCard;