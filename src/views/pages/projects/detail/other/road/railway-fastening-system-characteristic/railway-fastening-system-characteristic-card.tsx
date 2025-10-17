import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemCharacteristic } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayFasteningSystemCharacteristicCardProps {
  railwayFasteningSystemCharacteristic: RailwayFasteningSystemCharacteristic;
  refetch: () => void;
  onEdit: (characteristic: RailwayFasteningSystemCharacteristic) => void;
  onDelete: (id: string) => void;
  onDetail: (characteristic: RailwayFasteningSystemCharacteristic) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemCharacteristicCard: React.FC<RailwayFasteningSystemCharacteristicCardProps> = ({
  railwayFasteningSystemCharacteristic,
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
              onClick={() => onDetail(railwayFasteningSystemCharacteristic)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayFasteningSystemCharacteristic?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.railway_line_section_name')}:{' '}
            {railwayFasteningSystemCharacteristic.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.used_fastening_system_type')}:{' '}
            {railwayFasteningSystemCharacteristic.used_fastening_system_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.fastening_system_manufacturer_supplier')}:{' '}
            {railwayFasteningSystemCharacteristic.fastening_system_manufacturer_supplier || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.fastening_system_specifications')}:{' '}
            {railwayFasteningSystemCharacteristic.fastening_system_specifications || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.rail_clips_or_clamps_details')}:{' '}
            {railwayFasteningSystemCharacteristic.rail_clips_or_clamps_details || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.bolts_and_nuts_specifications')}:{' '}
            {railwayFasteningSystemCharacteristic.bolts_and_nuts_specifications || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.other_fastening_system')}:{' '}
            {railwayFasteningSystemCharacteristic.other_fastening_system || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-characteristic.details.remark')}:{' '}
            {railwayFasteningSystemCharacteristic.remark || 'N/A'}
          </Typography>
          {railwayFasteningSystemCharacteristic.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayFasteningSystemCharacteristic.created_at}
            </Typography>
          )}
          {railwayFasteningSystemCharacteristic.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayFasteningSystemCharacteristic.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* Add FileDrawer if the ID and fileType are available */}
        {railwayFasteningSystemCharacteristic.id && otherSubMenu?.fileType && (
          <FileDrawer id={railwayFasteningSystemCharacteristic.id} type={otherSubMenu.fileType} />
        )}

        {railwayFasteningSystemCharacteristic.id && (
          <ModelAction
            model="RailwayFasteningSystemCharacteristic"
            model_id={railwayFasteningSystemCharacteristic.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayfasteningsystemcharacteristic'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayfasteningsystemcharacteristic'
          }}
          onEdit={() => onEdit(railwayFasteningSystemCharacteristic)}
          onDelete={() => onDelete(railwayFasteningSystemCharacteristic.id as string)}
          item={railwayFasteningSystemCharacteristic}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayFasteningSystemCharacteristicCard;
