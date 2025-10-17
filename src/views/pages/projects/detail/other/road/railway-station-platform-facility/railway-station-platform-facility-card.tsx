import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayStationPlatformFacility } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayStationPlatformFacilityCardProps {
  railwayStationPlatformFacility: RailwayStationPlatformFacility;
  refetch: () => void;
  onEdit: (specs: RailwayStationPlatformFacility) => void;
  onDelete: (id: string) => void;
  onDetail: (specs: RailwayStationPlatformFacility) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayStationPlatformFacilityCard: React.FC<RailwayStationPlatformFacilityCardProps> = ({
  railwayStationPlatformFacility,
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
              onClick={() => onDetail(railwayStationPlatformFacility)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayStationPlatformFacility?.id?.toString().slice(0, 5)}
              ... (Facility)
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-facility.details.railway_station_platform_layout_id')}:{' '}
            {railwayStationPlatformFacility?.railwayStationPlatformLayout
              ? railwayStationPlatformFacility?.railwayStationPlatformLayout.name ||
                railwayStationPlatformFacility.railway_station_platform_layout_id
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-facility.details.waiting_areas_seating_capacity')}:{' '}
            {railwayStationPlatformFacility.waiting_areas_seating_capacity ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-facility.details.restrooms_and_amenities_availability')}:{' '}
            {railwayStationPlatformFacility.restrooms_and_amenities_availability ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station-platform-facility.details.passenger_information_system')}:{' '}
            {railwayStationPlatformFacility.passenger_information_system || 'N/A'}
          </Typography>
          {railwayStationPlatformFacility.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayStationPlatformFacility.created_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayStationPlatformFacility.id && <FileDrawer id={railwayStationPlatformFacility.id} type={otherSubMenu?.fileType || ''} />}

        {railwayStationPlatformFacility.id && (
          <ModelAction
            model="RailwayStationPlatformFacility"
            model_id={railwayStationPlatformFacility.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaystationplatformfacility'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaystationplatformfacility'
          }}
          onEdit={() => onEdit(railwayStationPlatformFacility)}
          onDelete={() => onDelete(railwayStationPlatformFacility.id as string)}
          item={railwayStationPlatformFacility}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayStationPlatformFacilityCard;
