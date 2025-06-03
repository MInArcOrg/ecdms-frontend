import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayBallastMaterialSpecification } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayBallastMaterialSpecificationCardProps {
  railwayBallastMaterialSpecification: RailwayBallastMaterialSpecification;
  refetch: () => void;
  onEdit: (data: RailwayBallastMaterialSpecification) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayBallastMaterialSpecification) => void;
}

const RailwayBallastMaterialSpecificationCard: React.FC<RailwayBallastMaterialSpecificationCardProps> = ({
  railwayBallastMaterialSpecification,
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
              onClick={() => onDetail(railwayBallastMaterialSpecification)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayBallastMaterialSpecification?.project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.railway-line-section-name')}:{' '}
            {railwayBallastMaterialSpecification.railway_line_section_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.ballast-material-type-id')}:{' '}
            {railwayBallastMaterialSpecification.ballast_material_type_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.specific-gravity')}:{' '}
            {railwayBallastMaterialSpecification.specific_gravity ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.porosity')}:{' '}
            {railwayBallastMaterialSpecification.porosity ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.water-absorption')}:{' '}
            {railwayBallastMaterialSpecification.water_absorption ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.shape')}: {railwayBallastMaterialSpecification.shape ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.average-particle-length')}:{' '}
            {railwayBallastMaterialSpecification.average_particle_length != null
              ? railwayBallastMaterialSpecification.average_particle_length.toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-specification.details.remark')}:{' '}
            {railwayBallastMaterialSpecification.remark ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayBallastMaterialSpecification"
          model_id={railwayBallastMaterialSpecification.project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballastmaterialspecification'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballastmaterialspecification'
          }}
          onEdit={() => onEdit(railwayBallastMaterialSpecification)}
          onDelete={() => onDelete(railwayBallastMaterialSpecification.project_id)}
          item={railwayBallastMaterialSpecification}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastMaterialSpecificationCard;
