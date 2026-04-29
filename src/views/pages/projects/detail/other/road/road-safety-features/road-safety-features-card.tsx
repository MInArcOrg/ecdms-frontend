'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectRoadSafetyFeature } from 'src/types/project/other';
import RowOptions from 'src/views/shared/listing/row-options';

interface RoadSafetyFeaturesCardProps {
  roadSafetyFeature: ProjectRoadSafetyFeature;
  onEdit: (roadSafetyFeature: ProjectRoadSafetyFeature) => void;
  onDelete: (id: string) => void;
  onDetail: (roadSafetyFeature: ProjectRoadSafetyFeature) => void;
}

const RoadSafetyFeaturesCard: React.FC<RoadSafetyFeaturesCardProps> = ({ roadSafetyFeature, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();
  const segmentName =
    roadSafetyFeature?.roadSegment?.name || roadSafetyFeature?.roadsegment?.name || roadSafetyFeature?.road_segment_id || 'N/A';
  const featureTitle =
    roadSafetyFeature?.roadSafetyFeature?.title ||
    roadSafetyFeature?.roadsafetyfeature?.title ||
    roadSafetyFeature?.road_safety_feature_id ||
    'N/A';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(roadSafetyFeature)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {featureTitle}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-safety-features.details.road-segment')}: {segmentName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-safety-features.details.safety-feature-condition')}: {roadSafetyFeature?.safety_feature_condition || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-safety-features.details.description')}: {roadSafetyFeature?.description || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadsafetyfeature'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'roadsafetyfeature'
          }}
          onEdit={() => onEdit(roadSafetyFeature)}
          onDelete={() => onDelete(roadSafetyFeature.id)}
          item={roadSafetyFeature}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RoadSafetyFeaturesCard;
