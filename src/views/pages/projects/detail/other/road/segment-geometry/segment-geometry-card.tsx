'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { SegmentGeometry } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface SegmentGeometryCardProps {
  segmentGeometry: SegmentGeometry;
  refetch: () => void;
  onEdit: (segmentGeometry: SegmentGeometry) => void;
  onDelete: (id: string) => void;
  onDetail: (segmentGeometry: SegmentGeometry) => void;
}

const SegmentGeometryCard: React.FC<SegmentGeometryCardProps> = ({ segmentGeometry, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(segmentGeometry)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {segmentGeometry?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.name')}: {segmentGeometry?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.cross-section-type-id')}: {segmentGeometry?.cross_section_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.carriage-way-width')}: {segmentGeometry?.carriage_way_width || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.lane-width')}: {segmentGeometry?.lane_width || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="SegmentGeometry"
          model_id={segmentGeometry.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'segmentgeometry'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'segmentgeometry'
          }}
          onEdit={() => onEdit(segmentGeometry)}
          onDelete={() => onDelete(segmentGeometry.id)}
          item={segmentGeometry}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default SegmentGeometryCard;
