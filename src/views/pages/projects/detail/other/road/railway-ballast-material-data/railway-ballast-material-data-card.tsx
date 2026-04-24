import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayBallastMaterialData } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayBallastMaterialDataCardProps {
  railwayBallastMaterialData: RailwayBallastMaterialData;
  refetch: () => void;
  onEdit: (railwayBallastMaterialData: RailwayBallastMaterialData) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayBallastMaterialData: RailwayBallastMaterialData) => void;
}

const RailwayBallastMaterialDataCard: React.FC<RailwayBallastMaterialDataCardProps> = ({
  railwayBallastMaterialData,
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
              onClick={() => onDetail(railwayBallastMaterialData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayBallastMaterialData?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.railway-line-section-name')}:{' '}
            {railwayBallastMaterialData.railway_line_section_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-material-type-id')}:{' '}
            {railwayBallastMaterialData.ballastMaterialType?.title ?? railwayBallastMaterialData.ballast_material_type_id ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading')}:{' '}
            {railwayBallastMaterialData.particle_size_distribution_grading ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-used-quantity')}:{' '}
            {railwayBallastMaterialData.ballast_used_quantity != null
              ? railwayBallastMaterialData.ballast_used_quantity.toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-source-id')}:{' '}
            {railwayBallastMaterialData.ballastSource?.title ?? railwayBallastMaterialData.ballast_source_id ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-material-size')}:{' '}
            {railwayBallastMaterialData.ballast_material_size != null
              ? railwayBallastMaterialData.ballast_material_size.toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-layer-thickness')}:{' '}
            {railwayBallastMaterialData.ballast_layer_thickness != null
              ? railwayBallastMaterialData.ballast_layer_thickness.toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.compaction-method-id')}:{' '}
            {railwayBallastMaterialData.compactionMethod?.title ?? railwayBallastMaterialData.compaction_method_id ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.remark')}: {railwayBallastMaterialData.remark ?? 'N/A'}
          </Typography>
          {railwayBallastMaterialData.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayBallastMaterialData.created_at}
            </Typography>
          )}
          {railwayBallastMaterialData.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayBallastMaterialData.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayBallastMaterialData"
          model_id={railwayBallastMaterialData.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballastmaterialdata'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballastmaterialdata'
          }}
          onEdit={() => onEdit(railwayBallastMaterialData)}
          onDelete={() => onDelete(railwayBallastMaterialData.id)}
          item={railwayBallastMaterialData}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastMaterialDataCard;
