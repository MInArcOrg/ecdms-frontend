import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleLoadAndCargoSpecification } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayVehicleLoadAndCargoSpecificationCardProps {
  railwayVehicleLoadAndCargoSpecification: RailwayVehicleLoadAndCargoSpecification;
  refetch: () => void;
  onEdit: (specs: RailwayVehicleLoadAndCargoSpecification) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayVehicleLoadAndCargoSpecification) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleLoadAndCargoSpecificationCard: React.FC<RailwayVehicleLoadAndCargoSpecificationCardProps> = ({
  railwayVehicleLoadAndCargoSpecification,
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
              onClick={() => onDetail(railwayVehicleLoadAndCargoSpecification)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayVehicleLoadAndCargoSpecification?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-load-and-cargo-specification.details.railway_vehicle_identification_id')}:{' '}
            {railwayVehicleLoadAndCargoSpecification?.railwayVehicleIdentification
              ? railwayVehicleLoadAndCargoSpecification?.railwayVehicleIdentification +
              ' - ' +
              railwayVehicleLoadAndCargoSpecification?.railwayVehicleIdentification.manufacturer_supplier_name +
              ' - ' +
              railwayVehicleLoadAndCargoSpecification?.railwayVehicleIdentification.manufacture_year
              : railwayVehicleLoadAndCargoSpecification?.railway_vehicle_identification_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-load-and-cargo-specification.details.load_capacity_and_weight_limits')}:{' '}
            {railwayVehicleLoadAndCargoSpecification.load_capacity_and_weight_limits || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-load-and-cargo-specification.details.cargo_restrictions_or_special_requirements')}:{' '}
            {railwayVehicleLoadAndCargoSpecification.cargo_restrictions_or_special_requirements || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-load-and-cargo-specification.details.coupling_and_uncoupling_procedures')}:{' '}
            {railwayVehicleLoadAndCargoSpecification.coupling_and_uncoupling_procedures ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-load-and-cargo-specification.details.remark')}:{' '}
            {railwayVehicleLoadAndCargoSpecification.remark || 'N/A'}
          </Typography>
          {railwayVehicleLoadAndCargoSpecification.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayVehicleLoadAndCargoSpecification.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayVehicleLoadAndCargoSpecification.id && (
          <FileDrawer id={railwayVehicleLoadAndCargoSpecification.id} type={otherSubMenu?.fileType || ''} />
        )}

        {railwayVehicleLoadAndCargoSpecification.id && (
          <ModelAction
            model="RailwayVehicleLoadAndCargoSpecification"
            model_id={railwayVehicleLoadAndCargoSpecification.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayvehicleloadandcargospecification'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayvehicleloadandcargospecification'
          }}
          onEdit={() => onEdit(railwayVehicleLoadAndCargoSpecification)}
          onDelete={() => onDelete(railwayVehicleLoadAndCargoSpecification.id as string)}
          item={railwayVehicleLoadAndCargoSpecification}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayVehicleLoadAndCargoSpecificationCard;
