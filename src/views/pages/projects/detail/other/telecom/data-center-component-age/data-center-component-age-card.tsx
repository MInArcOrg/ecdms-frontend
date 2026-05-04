import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { DataCenter, DataCenterComponentAge } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DataCenterComponentAgeCardProps {
  dataCenterComponentAge: DataCenterComponentAge;
  refetch: () => void;
  onEdit: (dataCenterComponentAge: DataCenterComponentAge) => void;
  onDelete: (id: string) => void;
  onDetail: (dataCenterComponentAge: DataCenterComponentAge) => void;
}

const DataCenterComponentAgeCard: React.FC<DataCenterComponentAgeCardProps> = ({
  dataCenterComponentAge,
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
              onClick={() => onDetail(dataCenterComponentAge)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {dataCenterComponentAge?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.data-center-id')}:{' '}
            {dataCenterComponentAge?.dataCenter?.name || dataCenterComponentAge?.data_center_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.servers')}: {dataCenterComponentAge?.servers || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.storage-devices')}: {dataCenterComponentAge?.storage_devices || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.networking-equipment')}:{' '}
            {dataCenterComponentAge?.networking_equipment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.cooling-systems')}: {dataCenterComponentAge?.cooling_systems || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.backup-generators')}: {dataCenterComponentAge?.backup_generators || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-component-age.details.others')}: {dataCenterComponentAge?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={dataCenterComponentAge.id} type={uploadableProjectFileTypes.other.dataCenterComponentAge} />
        <ModelAction
          model="DataCenterComponentAge"
          model_id={dataCenterComponentAge.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'datacentercomponentage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'datacentercomponentage'
          }}
          onEdit={() => onEdit(dataCenterComponentAge)}
          onDelete={() => onDelete(dataCenterComponentAge.id)}
          item={dataCenterComponentAge}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DataCenterComponentAgeCard;
