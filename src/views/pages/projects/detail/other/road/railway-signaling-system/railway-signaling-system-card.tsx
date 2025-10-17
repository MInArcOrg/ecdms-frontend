import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySignalingSystem } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer'; // Assuming this is your FileDrawer component for display
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySignalingSystemCardProps {
  railwaySignalingSystem: RailwaySignalingSystem;
  refetch: () => void;
  onEdit: (signalingSystem: RailwaySignalingSystem) => void;
  onDelete: (id: string) => void;
  onDetail: (signalingSystem: RailwaySignalingSystem) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySignalingSystemCard: React.FC<RailwaySignalingSystemCardProps> = ({
  railwaySignalingSystem,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySignalingSystem)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySignalingSystem?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.railway_line_section_name')}:{' '}
            {railwaySignalingSystem.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.signaling_system_type')}:{' '}
            {railwaySignalingSystem.signaling_system_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_name')}:{' '}
            {railwaySignalingSystem.signaling_system_manufacturer_or_supplier_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_phone')}:{' '}
            {railwaySignalingSystem.signaling_system_manufacturer_or_supplier_phone || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.signaling_system_components')}:{' '}
            {railwaySignalingSystem.signaling_system_components || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-signaling-system.details.remark')}: {railwaySignalingSystem.remark || 'N/A'}
          </Typography>
          {railwaySignalingSystem.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySignalingSystem.created_at}
            </Typography>
          )}
          {railwaySignalingSystem.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySignalingSystem.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwaySignalingSystem.id && <FileDrawer id={railwaySignalingSystem.id} type={otherSubMenu?.id || ''} />}

        {railwaySignalingSystem.id && (
          <ModelAction
            model="RailwaySignalingSystem"
            model_id={railwaySignalingSystem.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysignalingsystem'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysignalingsystem'
          }}
          onEdit={() => onEdit(railwaySignalingSystem)}
          onDelete={() => onDelete(railwaySignalingSystem.id as string)}
          item={railwaySignalingSystem}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySignalingSystemCard;
