import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayStationPlatformLayout } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayStationPlatformLayoutCardProps {
  railwayStationPlatformLayout: RailwayStationPlatformLayout;
  refetch: () => void;
  onEdit: (specs: RailwayStationPlatformLayout) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayStationPlatformLayout) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformLayoutCard: React.FC<RailwayStationPlatformLayoutCardProps> = ({
  railwayStationPlatformLayout,
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
              onClick={() => onDetail(railwayStationPlatformLayout)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayStationPlatformLayout?.name || 'N/A'}
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-layout.details.platforms_number')}:{' '}
            {railwayStationPlatformLayout.platforms_number || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-layout.details.platform_configuration')}:{' '}
            {railwayStationPlatformLayout.platform_configuration || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-layout.details.platform_length')}:{' '}
            {railwayStationPlatformLayout.platform_length
              ? `${railwayStationPlatformLayout.platform_length} ${t('common.units.meters')}`
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-layout.details.accessibility_features')}:{' '}
            {railwayStationPlatformLayout.accessibility_features || 'N/A'}
          </Typography>
          {railwayStationPlatformLayout.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayStationPlatformLayout.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayStationPlatformLayout.id && <FileDrawer id={railwayStationPlatformLayout.id} type={otherSubMenu?.fileType || ''} />}

        {railwayStationPlatformLayout.id && (
          <ModelAction
            model="RailwayStationPlatformLayout"
            model_id={railwayStationPlatformLayout.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaystationplatformlayout'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaystationplatformlayout'
          }}
          onEdit={() => onEdit(railwayStationPlatformLayout)}
          onDelete={() => onDelete(railwayStationPlatformLayout.id as string)}
          item={railwayStationPlatformLayout}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayStationPlatformLayoutCard;
