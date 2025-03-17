import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { DataCenter } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DataCenterCardProps {
  dataCenter: DataCenter;
  refetch: () => void;
  onEdit: (dataCenter: DataCenter) => void;
  onDelete: (id: string) => void;
  onDetail: (dataCenter: DataCenter) => void;
}

const DataCenterCard: React.FC<DataCenterCardProps> = ({ dataCenter, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(dataCenter)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {dataCenter?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.data-center-type-id')}: {dataCenter?.data_center_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.servers')}: {dataCenter?.servers ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.storage-devices')}: {dataCenter?.storage_devices ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.networking-equipment')}: {dataCenter?.networking_equipment ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.cooling-systems')}: {dataCenter?.cooling_systems ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.backup-generators')}: {dataCenter?.backup_generators ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center.details.others')}: {dataCenter?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={dataCenter.id} type={uploadableProjectFileTypes.other.dataCenter} />
        <ModelAction
          model="DataCenter"
          model_id={dataCenter.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'datacenter'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'datacenter'
          }}
          onEdit={() => onEdit(dataCenter)}
          onDelete={() => onDelete(dataCenter.id)}
          item={dataCenter}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DataCenterCard;
