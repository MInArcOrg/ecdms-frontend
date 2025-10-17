import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { RoadSurfaceCondition } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RoadSurfaceConditionCardProps {
  roadSurfaceCondition: RoadSurfaceCondition;
  refetch: () => void;
  onEdit: (roadSurfaceCondition: RoadSurfaceCondition) => void;
  onDelete: (id: string) => void;
  onDetail: (roadSurfaceCondition: RoadSurfaceCondition) => void;
}

const RoadSurfaceConditionCard: React.FC<RoadSurfaceConditionCardProps> = ({
  roadSurfaceCondition,
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
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(roadSurfaceCondition)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {roadSurfaceCondition?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.road-segment')}: {roadSurfaceCondition?.road_segment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.cracks')}: {roadSurfaceCondition?.cracks ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.rutting')}: {roadSurfaceCondition?.rutting ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.surface-type')}: {roadSurfaceCondition?.surface_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.assessment-condition')}:{' '}
            {roadSurfaceCondition?.assessment_condition_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-surface-condition.details.remark')}: {roadSurfaceCondition?.remark || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={roadSurfaceCondition.id} type={uploadableProjectFileTypes.other.roadSurfaceCondition} />
        <ModelAction
          model="RoadSurfaceCondition"
          model_id={roadSurfaceCondition.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadsurfacecondition'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'roadsurfacecondition'
          }}
          onEdit={() => onEdit(roadSurfaceCondition)}
          onDelete={() => onDelete(roadSurfaceCondition.id)}
          item={roadSurfaceCondition}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default RoadSurfaceConditionCard;
