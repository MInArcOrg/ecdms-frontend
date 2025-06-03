import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayBallastMaterialData } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayBallastCardProps {
  railwayBallast: RailwayBallastMaterialData;
  refetch: () => void;
  onEdit: (railwayBallast: RailwayBallastMaterialData) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayBallast: RailwayBallastMaterialData) => void;
}

const RailwayBallastCard: React.FC<RailwayBallastCardProps> = ({
  railwayBallast,
  refetch,
  onEdit,
  onDelete,
  onDetail,
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
              onClick={() => onDetail(railwayBallast)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {railwayBallast?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.railway-line-section-name')}: {railwayBallast.railway_line_section_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-material-type-id')}: {railwayBallast.ballast_material_type_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading')}: {railwayBallast.particle_size_distribution_grading ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-used-quantity')}: {railwayBallast.ballast_used_quantity != null ? railwayBallast.ballast_used_quantity.toLocaleString() : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-source-id')}: {railwayBallast.ballast_source_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-material-size')}: {railwayBallast.ballast_material_size != null ? railwayBallast.ballast_material_size.toLocaleString() : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.ballast-layer-thickness')}: {railwayBallast.ballast_layer_thickness != null ? railwayBallast.ballast_layer_thickness.toLocaleString() : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.compaction-method-id')}: {railwayBallast.compaction_method_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-material-data.details.remark')}: {railwayBallast.remark ?? 'N/A'}
          </Typography>
          {railwayBallast.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayBallast.created_at}
            </Typography>
          )}
          {railwayBallast.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayBallast.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayBallast"
          model_id={railwayBallast.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballast',
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballast',
          }}
          onEdit={() => onEdit(railwayBallast)}
          onDelete={() => onDelete(railwayBallast.id)}
          item={railwayBallast}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastCard;
