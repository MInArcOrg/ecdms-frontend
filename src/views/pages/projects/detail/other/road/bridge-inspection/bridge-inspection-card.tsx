'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { BridgeInspection } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BridgeInspectionCardProps {
  bridgeInspection: BridgeInspection;
  refetch: () => void;
  onEdit: (bridgeInspection: BridgeInspection) => void;
  onDelete: (id: string) => void;
  onDetail: (bridgeInspection: BridgeInspection) => void;
}

const BridgeInspectionCard: React.FC<BridgeInspectionCardProps> = ({ bridgeInspection, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(bridgeInspection)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {bridgeInspection?.name || bridgeInspection?.id.slice(0, 5) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-inspection.details.bridge-name')}: {bridgeInspection?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-inspection.details.bridge-part-defect-id')}: {bridgeInspection?.bridge_part_defect_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-inspection.details.damage-type-id')}: {bridgeInspection?.damage_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.bridge-inspection.details.damage-condition-id')}: {bridgeInspection?.damage_condition_id || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={bridgeInspection.id} type={uploadableProjectFileTypes.other.bridgeInspection} />
        <ModelAction
          model="BridgeInspection"
          model_id={bridgeInspection.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'bridgeinspection'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'bridgeinspection'
          }}
          onEdit={() => onEdit(bridgeInspection)}
          onDelete={() => onDelete(bridgeInspection.id)}
          item={bridgeInspection}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default BridgeInspectionCard;
