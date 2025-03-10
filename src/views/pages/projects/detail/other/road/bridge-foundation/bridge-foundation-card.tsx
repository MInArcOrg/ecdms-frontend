'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { BridgeFoundation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { useQuery } from '@tanstack/react-query';
import abutmentTypeMasterService from 'src/services/general/project/abutment-type-master-service';
import pierTypeMasterService from 'src/services/general/project/pier-type-master-service';
import soilTypeMasterService from 'src/services/general/project/soil-type-master-service';

interface BridgeFoundationCardProps {
  bridgeFoundation: BridgeFoundation;
  refetch: () => void;
  onEdit: (bridgeFoundation: BridgeFoundation) => void;
  onDelete: (id: string) => void;
  onDetail: (bridgeFoundation: BridgeFoundation) => void;
}

const BridgeFoundationCard: React.FC<BridgeFoundationCardProps> = ({
  bridgeFoundation,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  // Fetch master data
  const { data: abutmentTypeData } = useQuery({
    queryKey: ['abutmentType', bridgeFoundation?.abutment_type_id],
    queryFn: () => abutmentTypeMasterService.getOne(bridgeFoundation?.abutment_type_id || '', {}),
    enabled: !!bridgeFoundation?.abutment_type_id
  });

  const { data: pierTypeData } = useQuery({
    queryKey: ['pierType', bridgeFoundation?.pier_type_id],
    queryFn: () => pierTypeMasterService.getOne(bridgeFoundation?.pier_type_id || '', {}),
    enabled: !!bridgeFoundation?.pier_type_id
  });

  const { data: soilTypeData } = useQuery({
    queryKey: ['soilType', bridgeFoundation?.soil_type_id],
    queryFn: () => soilTypeMasterService.getOne(bridgeFoundation?.soil_type_id || '', {}),
    enabled: !!bridgeFoundation?.soil_type_id
  });

  const abutmentTypeName = abutmentTypeData?.payload?.title || 'N/A';
  const pierTypeName = pierTypeData?.payload?.title || 'N/A';
  const soilTypeName = soilTypeData?.payload?.title || 'N/A';

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(bridgeFoundation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {bridgeFoundation?.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-foundation.details.name')}: {bridgeFoundation?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-foundation.details.bridge-name')}: {bridgeFoundation?.bridge_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-foundation.details.abutment-type-id')}: {abutmentTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-foundation.details.pier-type-id')}: {pierTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-foundation.details.soil-type-id')}: {soilTypeName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {bridgeFoundation?.created_at ? formatCreatedAt(bridgeFoundation.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={bridgeFoundation.id} type={uploadableProjectFileTypes.other.bridgeFoundation} />
        <ModelAction
          model="BridgeFoundation"
          model_id={bridgeFoundation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(bridgeFoundation)}
          onDelete={() => onDelete(bridgeFoundation.id)}
          item={bridgeFoundation}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BridgeFoundationCard;
