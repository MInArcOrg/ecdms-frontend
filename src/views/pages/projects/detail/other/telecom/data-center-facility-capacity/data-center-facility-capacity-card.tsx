import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { DataCenterFacilityCapacity } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DataCenterFacilityCapacityCardProps {
  dataCenterFacilityCapacity: DataCenterFacilityCapacity;
  refetch: () => void;
  onEdit: (dataCenterFacilityCapacity: DataCenterFacilityCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (dataCenterFacilityCapacity: DataCenterFacilityCapacity) => void;
}

const DataCenterFacilityCapacityCard: React.FC<DataCenterFacilityCapacityCardProps> = ({
  dataCenterFacilityCapacity,
  refetch,
  onEdit,
  onDelete,
  onDetail,
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
              onClick={() => onDetail(dataCenterFacilityCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {dataCenterFacilityCapacity?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.data-center-id')}:{' '}
            {dataCenterFacilityCapacity?.dataCenter?.name || dataCenterFacilityCapacity?.data_center_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.total-floor-area')}:{' '}
            {dataCenterFacilityCapacity?.total_floor_area || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.power-capacity')}: {dataCenterFacilityCapacity?.power_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.rack-space-capacity')}:{' '}
            {dataCenterFacilityCapacity?.rack_space_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.cooling-capacity')}:{' '}
            {dataCenterFacilityCapacity?.cooling_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.access-control')}:{' '}
            {dataCenterFacilityCapacity?.access_control ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.surveillance-cameras')}:{' '}
            {dataCenterFacilityCapacity?.surveillance_cameras ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.fire-suppression-systems')}:{' '}
            {dataCenterFacilityCapacity?.fire_suppression_systems ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.intrusion-detection-systems')}:{' '}
            {dataCenterFacilityCapacity?.intrusion_detection_systems ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility-capacity.details.others')}: {dataCenterFacilityCapacity?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={dataCenterFacilityCapacity.id} type={uploadableProjectFileTypes.other.dataCenterFacilityCapacity} />
        <ModelAction
          model="DataCenterFacilityCapacity"
          model_id={dataCenterFacilityCapacity.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'datacenterfacilitycapacity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'datacenterfacilitycapacity'
          }}
          onEdit={() => onEdit(dataCenterFacilityCapacity)}
          onDelete={() => onDelete(dataCenterFacilityCapacity.id)}
          item={dataCenterFacilityCapacity}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DataCenterFacilityCapacityCard;
