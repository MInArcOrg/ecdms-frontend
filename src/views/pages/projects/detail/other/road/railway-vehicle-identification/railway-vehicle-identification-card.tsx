import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleIdentification } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayVehicleIdentificationCardProps {
  railwayVehicleIdentification: RailwayVehicleIdentification;
  refetch: () => void;
  onEdit: (specs: RailwayVehicleIdentification) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayVehicleIdentification) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayVehicleIdentificationCard: React.FC<RailwayVehicleIdentificationCardProps> = ({
  railwayVehicleIdentification,
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
              onClick={() => onDetail(railwayVehicleIdentification)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayVehicleIdentification?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.vehicle_identification_number')}:{' '}
            {railwayVehicleIdentification.vehicle_identification_number || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.vehicle_type')}: {railwayVehicleIdentification.vehicle_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.manufacturer_supplier_name')}:{' '}
            {railwayVehicleIdentification.manufacturer_supplier_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.manufacture_year')}:{' '}
            {railwayVehicleIdentification.manufacture_year || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.ownership_or_leasing_details')}:{' '}
            {railwayVehicleIdentification.ownership_or_leasing_details || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-vehicle-identification.details.remark')}: {railwayVehicleIdentification.remark || 'N/A'}
          </Typography>
          {railwayVehicleIdentification.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayVehicleIdentification.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayVehicleIdentification.id && <FileDrawer id={railwayVehicleIdentification.id} type={otherSubMenu?.fileType || ''} />}

        {railwayVehicleIdentification.id && (
          <ModelAction
            model="RailwayVehicleIdentification"
            model_id={railwayVehicleIdentification.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayvehicleidentification'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayvehicleidentification'
          }}
          onEdit={() => onEdit(railwayVehicleIdentification)}
          onDelete={() => onDelete(railwayVehicleIdentification.id as string)}
          item={railwayVehicleIdentification}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayVehicleIdentificationCard;
