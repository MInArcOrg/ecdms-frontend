import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { BuildingDimensionDetail } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BuildingDimensionDetailCardProps {
  buildingDimensionDetail: BuildingDimensionDetail;
  refetch: () => void;
  onEdit: (buildingDimensionDetail: BuildingDimensionDetail) => void;
  onDelete: (id: string) => void;
  onDetail: (buildingDimensionDetail: BuildingDimensionDetail) => void;
}

const BuildingDimensionDetailCard: React.FC<BuildingDimensionDetailCardProps> = ({
  buildingDimensionDetail,
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
              onClick={() => onDetail(buildingDimensionDetail)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {buildingDimensionDetail?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.site-area')}:{' '}
            {buildingDimensionDetail?.site_area ? `${buildingDimensionDetail?.site_area} sqm` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.site-above-sea-level')}:{' '}
            {buildingDimensionDetail?.site_above_sea_level?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.ground-floor-area')}:{' '}
            {buildingDimensionDetail?.ground_floor_area ? `${buildingDimensionDetail?.ground_floor_area} sqm` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.total-floor-area')}:{' '}
            {buildingDimensionDetail?.total_floor_area ? `${buildingDimensionDetail?.total_floor_area} sqm` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.basement-stories-no')}:{' '}
            {buildingDimensionDetail?.basement_stories_no?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.above-ground-floor-stories-no')}:{' '}
            {buildingDimensionDetail?.above_ground_floor_stories_no?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.height-above-natural-ground')}:{' '}
            {buildingDimensionDetail?.height_above_natural_ground ? `${buildingDimensionDetail?.height_above_natural_ground} m` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-dimension-detail.details.depth-below-natural-ground')}:{' '}
            {buildingDimensionDetail?.depth_below_natural_ground ? `${buildingDimensionDetail?.depth_below_natural_ground} m` : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={buildingDimensionDetail.id} type={uploadableProjectFileTypes.other.buildingDimensionDetail} />
        <ModelAction
          model="BuildingDimensionDetail"
          model_id={buildingDimensionDetail.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(buildingDimensionDetail)}
          onDelete={() => onDelete(buildingDimensionDetail.id)}
          item={buildingDimensionDetail}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BuildingDimensionDetailCard;
