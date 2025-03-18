import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { DataCenterFacility } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DataCenterFacilityCardProps {
  dataCenterFacility: DataCenterFacility;
  refetch: () => void;
  onEdit: (dataCenterFacility: DataCenterFacility) => void;
  onDelete: (id: string) => void;
  onDetail: (dataCenterFacility: DataCenterFacility) => void;
}

const DataCenterFacilityCard: React.FC<DataCenterFacilityCardProps> = ({ dataCenterFacility, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(dataCenterFacility)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {dataCenterFacility?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.data-center-id')}: {dataCenterFacility?.data_center_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.total-floor-area')}: {dataCenterFacility?.total_floor_area || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.power-capacity')}: {dataCenterFacility?.power_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.rack-space-capacity')}: {dataCenterFacility?.rack_space_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.cooling-capacity')}: {dataCenterFacility?.cooling_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.access-control')}:{' '}
            {dataCenterFacility?.access_control ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.surveillance-cameras')}:{' '}
            {dataCenterFacility?.surveillance_cameras ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.fire-suppression-systems')}:{' '}
            {dataCenterFacility?.fire_suppression_systems ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.intrusion-detection-systems')}:{' '}
            {dataCenterFacility?.intrusion_detection_systems ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.data-center-facility.details.others')}: {dataCenterFacility?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={dataCenterFacility.id} type={uploadableProjectFileTypes.other.dataCenterFacility} />
        <ModelAction
          model="DataCenterFacility"
          model_id={dataCenterFacility.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'datacenterfacility'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'datacenterfacility'
          }}
          onEdit={() => onEdit(dataCenterFacility)}
          onDelete={() => onDelete(dataCenterFacility.id)}
          item={dataCenterFacility}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DataCenterFacilityCard;
