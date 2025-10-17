'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { RoadSegment } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useQuery } from '@tanstack/react-query';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface RoadSegmentCardProps {
  roadSegment: RoadSegment;
  refetch: () => void;
  onEdit: (roadSegment: RoadSegment) => void;
  onDelete: (id: string) => void;
  onDetail: (roadSegment: RoadSegment) => void;
}

const RoadSegmentCard: React.FC<RoadSegmentCardProps> = ({ roadSegment, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  // Fetch surface type data
  const { data: surfaceTypeData } = useQuery({
    queryKey: ['surface-types', roadSegment?.surface_type_id],
    queryFn: () => projectGeneralMasterDataApiService.getOne(roadSegment?.surface_type_id || '', {}),
    enabled: !!roadSegment?.surface_type_id
  });

  // Fetch design standard data
  const { data: designStandardData } = useQuery({
    queryKey: ['design-standard-types', roadSegment?.design_standard_id],
    queryFn: () => projectGeneralMasterDataApiService.getOne(roadSegment?.design_standard_id || '', {}),
    enabled: !!roadSegment?.design_standard_id
  });

  const surfaceTypeName = surfaceTypeData?.payload?.title || 'N/A';
  const designStandardName = designStandardData?.payload?.title || 'N/A';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(roadSegment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {roadSegment?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.name')}: {roadSegment?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.surface-type-id')}: {surfaceTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.start-northing')}: {roadSegment?.start_northing?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.start-easting')}: {roadSegment?.start_easting?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.end-northing')}: {roadSegment?.end_northing?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.end-easting')}: {roadSegment?.end_easting?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.road-segment.details.design-standard-id')}: {designStandardName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {roadSegment?.created_at ? formatCreatedAt(roadSegment.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={roadSegment.id} type={uploadableProjectFileTypes.other.roadSegment} />
        <ModelAction
          model="RoadSegment"
          model_id={roadSegment.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions onEdit={() => onEdit(roadSegment)} onDelete={() => onDelete(roadSegment.id)} item={roadSegment} options={[]} />
      </CardActions>
    </Card>
  );
};

export default RoadSegmentCard;
