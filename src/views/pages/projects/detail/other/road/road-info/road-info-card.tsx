import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { RoadInfo } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RoadInfoCardProps {
  roadInfo: RoadInfo;
  refetch: () => void;
  onEdit: (roadInfo: RoadInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (roadInfo: RoadInfo) => void;
}

const RoadInfoCard: React.FC<RoadInfoCardProps> = ({ roadInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(roadInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {roadInfo?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.material')}: {roadInfo?.material || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.location-function')}: {roadInfo?.location_function || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.traffic-volume')}: {roadInfo?.traffic_volume?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.traffic-type')}: {roadInfo?.traffic_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.economy')}: {roadInfo?.economy || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.rigidity')}: {roadInfo?.rigidity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.topography')}: {roadInfo?.topography || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-info.details.revision-no')}: {roadInfo?.revision_no?.toString() || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={roadInfo.id} type={uploadableProjectFileTypes.other.roadInfo} />
        <ModelAction
          model="RoadInfo"
          model_id={roadInfo.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadinfo'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'roadinfo'
          }}
          onEdit={() => onEdit(roadInfo)}
          onDelete={() => onDelete(roadInfo.id)}
          item={roadInfo}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RoadInfoCard;
