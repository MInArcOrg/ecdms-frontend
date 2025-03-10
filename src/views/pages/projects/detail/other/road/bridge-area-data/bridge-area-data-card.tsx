'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { BridgeAreaData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useQuery } from '@tanstack/react-query';
import areaTopographyMasterService from 'src/services/general/project/area-topography-master-service';

interface BridgeAreaDataCardProps {
  bridgeAreaData: BridgeAreaData;
  refetch: () => void;
  onEdit: (bridgeAreaData: BridgeAreaData) => void;
  onDelete: (id: string) => void;
  onDetail: (bridgeAreaData: BridgeAreaData) => void;
}

const BridgeAreaDataCard: React.FC<BridgeAreaDataCardProps> = ({
  bridgeAreaData,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  // Fetch area topography data
  const { data: areaTopographyData } = useQuery({
    queryKey: ['areaTopography', bridgeAreaData?.area_topography_id],
    queryFn: () => areaTopographyMasterService.getOne(bridgeAreaData?.area_topography_id || '', {}),
    enabled: !!bridgeAreaData?.area_topography_id
  });

  const areaTopographyName = areaTopographyData?.payload?.title || 'N/A';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(bridgeAreaData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {bridgeAreaData?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.name')}: {bridgeAreaData?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.bridge-name')}: {bridgeAreaData?.bridge_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.river-width')}:{' '}
            {bridgeAreaData?.river_width?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.area-topography-id')}: {areaTopographyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.detour-possibility')}:{' '}
            {bridgeAreaData?.detour_possibility ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-area-data.details.load-limit-sign')}:{' '}
            {bridgeAreaData?.load_limit_sign ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {bridgeAreaData?.created_at ? formatCreatedAt(bridgeAreaData.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={bridgeAreaData.id} type={uploadableProjectFileTypes.other.bridgeAreaData} />
        <ModelAction
          model="BridgeAreaData"
          model_id={bridgeAreaData.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(bridgeAreaData)}
          onDelete={() => onDelete(bridgeAreaData.id)}
          item={bridgeAreaData}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BridgeAreaDataCard;
