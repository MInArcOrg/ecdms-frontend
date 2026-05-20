import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleInteriorAndPassengerAmenity } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayVehicleInteriorAndPassengerAmenityCardProps {
  railwayVehicleInteriorAndPassengerAmenity: RailwayVehicleInteriorAndPassengerAmenity;
  refetch: () => void;
  onEdit: (specs: RailwayVehicleInteriorAndPassengerAmenity) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayVehicleInteriorAndPassengerAmenity) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleInteriorAndPassengerAmenityCard: React.FC<RailwayVehicleInteriorAndPassengerAmenityCardProps> = ({
  railwayVehicleInteriorAndPassengerAmenity,
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
              onClick={() => onDetail(railwayVehicleInteriorAndPassengerAmenity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayVehicleInteriorAndPassengerAmenity?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-interior-and-passenger-amenity.details.railway_vehicle_identification_id')}:{' '}
            {railwayVehicleInteriorAndPassengerAmenity?.railwayVehicleIdentification
              ? railwayVehicleInteriorAndPassengerAmenity?.railwayVehicleIdentification +
              ' - ' +
              railwayVehicleInteriorAndPassengerAmenity?.railwayVehicleIdentification.manufacturer_supplier_name +
              ' - ' +
              railwayVehicleInteriorAndPassengerAmenity?.railwayVehicleIdentification.manufacture_year
              : railwayVehicleInteriorAndPassengerAmenity?.railway_vehicle_identification_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-interior-and-passenger-amenity.details.seating_capacity')}:{' '}
            {railwayVehicleInteriorAndPassengerAmenity.seating_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-interior-and-passenger-amenity.details.passenger_amenities_availability')}:{' '}
            {railwayVehicleInteriorAndPassengerAmenity.passenger_amenities_availability || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-vehicle-interior-and-passenger-amenity.details.accessibility_features_for_passengers_with_disabilities'
            )}
            :{' '}
            {railwayVehicleInteriorAndPassengerAmenity.accessibility_features_for_passengers_with_disabilities
              ? t('common.yes')
              : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-interior-and-passenger-amenity.details.remark')}:{' '}
            {railwayVehicleInteriorAndPassengerAmenity.remark || 'N/A'}
          </Typography>
          {railwayVehicleInteriorAndPassengerAmenity.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayVehicleInteriorAndPassengerAmenity.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayVehicleInteriorAndPassengerAmenity.id && (
          <FileDrawer id={railwayVehicleInteriorAndPassengerAmenity.id} type={otherSubMenu?.fileType || ''} />
        )}

        {railwayVehicleInteriorAndPassengerAmenity.id && (
          <ModelAction
            model="RailwayVehicleInteriorAndPassengerAmenity"
            model_id={railwayVehicleInteriorAndPassengerAmenity.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayvehicleinteriorandpassengeramenity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayvehicleinteriorandpassengeramenity'
          }}
          onEdit={() => onEdit(railwayVehicleInteriorAndPassengerAmenity)}
          onDelete={() => onDelete(railwayVehicleInteriorAndPassengerAmenity.id as string)}
          item={railwayVehicleInteriorAndPassengerAmenity}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayVehicleInteriorAndPassengerAmenityCard;
