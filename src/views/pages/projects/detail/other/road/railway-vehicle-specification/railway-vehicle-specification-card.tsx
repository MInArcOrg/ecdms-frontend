import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleSpecification } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayVehicleSpecificationCardProps {
  railwayVehicleSpecification: RailwayVehicleSpecification;
  refetch: () => void;
  onEdit: (specs: RailwayVehicleSpecification) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayVehicleSpecification) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleSpecificationCard: React.FC<RailwayVehicleSpecificationCardProps> = ({
  railwayVehicleSpecification,
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
              onClick={() => onDetail(railwayVehicleSpecification)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayVehicleSpecification?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.railway_vehicle_identification_id')}:{' '}
            {railwayVehicleSpecification?.railwayVehicleIndentification
              ? railwayVehicleSpecification?.railwayVehicleIndentification +
                ' - ' +
                railwayVehicleSpecification?.railwayVehicleIndentification.manufacturer_supplier_name +
                ' - ' +
                railwayVehicleSpecification?.railwayVehicleIndentification.manufacture_year
              : railwayVehicleSpecification?.id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.vehicle_dimensions')}:{' '}
            {railwayVehicleSpecification.vehicle_dimensions || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.vehicle_weight_and_load_capacity')}:{' '}
            {railwayVehicleSpecification.vehicle_weight_and_load_capacity || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.maximum_speed')}: {railwayVehicleSpecification.maximum_speed || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.braking_system_type')}:{' '}
            {railwayVehicleSpecification.braking_system_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-specification.details.remark')}: {railwayVehicleSpecification.remark || 'N/A'}
          </Typography>
          {railwayVehicleSpecification.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayVehicleSpecification.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayVehicleSpecification.id && <FileDrawer id={railwayVehicleSpecification.id} type={otherSubMenu?.fileType || ''} />}

        {railwayVehicleSpecification.id && (
          <ModelAction
            model="RailwayVehicleSpecification"
            model_id={railwayVehicleSpecification.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayvehiclespecification'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayvehiclespecification'
          }}
          onEdit={() => onEdit(railwayVehicleSpecification)}
          onDelete={() => onDelete(railwayVehicleSpecification.id as string)}
          item={railwayVehicleSpecification}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayVehicleSpecificationCard;
