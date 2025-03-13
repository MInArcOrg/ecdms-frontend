'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { SegmentGeometry } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useQuery } from '@tanstack/react-query';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface SegmentGeometryCardProps {
  segmentGeometry: SegmentGeometry;
  refetch: () => void;
  onEdit: (segmentGeometry: SegmentGeometry) => void;
  onDelete: (id: string) => void;
  onDetail: (segmentGeometry: SegmentGeometry) => void;
}

const SegmentGeometryCard: React.FC<SegmentGeometryCardProps> = ({ segmentGeometry, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  const { data: crossSectionTypeData } = useQuery({
    queryKey: ['general-master', 'CrossSectionType', segmentGeometry?.cross_section_type_id],
    queryFn: () =>
      projectGeneralMasterDataApiService.getOne(segmentGeometry?.cross_section_type_id || '', { filter: { model: 'CrossSectionType' } }),
    enabled: !!segmentGeometry?.cross_section_type_id
  });

  const crossSectionTypeName = crossSectionTypeData?.payload?.title || 'N/A';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(segmentGeometry)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {segmentGeometry?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.name')}: {segmentGeometry?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.cross-section-type-id')}: {crossSectionTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.carriage-way-width')}: {segmentGeometry?.carriage_way_width?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.lane-width')}: {segmentGeometry?.lane_width?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.shoulder-width')}: {segmentGeometry?.shoulder_width?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.property-access-control')}:{' '}
            {segmentGeometry?.property_access_control ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.segment-geometry.details.similar-for-all-lane')}:{' '}
            {segmentGeometry?.similar_for_all_lane ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {segmentGeometry?.created_at ? formatCreatedAt(segmentGeometry.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={segmentGeometry.id} type={uploadableProjectFileTypes.other.segmentGeometry} />
        <ModelAction
          model="SegmentGeometry"
          model_id={segmentGeometry.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
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
