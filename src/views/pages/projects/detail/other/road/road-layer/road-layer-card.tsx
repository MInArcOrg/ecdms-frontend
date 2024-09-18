import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { RoadLayer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RoadLayerCardProps {
  roadLayer: RoadLayer;
  refetch: () => void;
  onEdit: (roadLayer: RoadLayer) => void;
  onDelete: (id: string) => void;
  onDetail: (roadLayer: RoadLayer) => void;
}

const RoadLayerCard: React.FC<RoadLayerCardProps> = ({ roadLayer, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(roadLayer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {roadLayer?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.segment')}: {roadLayer?.roadsegment?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.name')}: {roadLayer?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.specifications')}: {roadLayer?.specifications || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.number')}: {roadLayer?.number?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.thickness')}: {roadLayer?.thickness?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.material')}: {roadLayer?.material || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-layer.details.description')}: {roadLayer?.description || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {roadLayer?.created_at ? formatCreatedAt(roadLayer.created_at) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}: {roadLayer?.updated_at ? formatCreatedAt(roadLayer.updated_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={roadLayer.id} type={uploadableProjectFileTypes.other.roadLayer} />
        <ModelAction
          model="RoadLayer"
          model_id={roadLayer.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(roadLayer)}
          onDelete={() => onDelete(roadLayer.id)}
          item={roadLayer}
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadlayer'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'roadlayer'
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RoadLayerCard;
