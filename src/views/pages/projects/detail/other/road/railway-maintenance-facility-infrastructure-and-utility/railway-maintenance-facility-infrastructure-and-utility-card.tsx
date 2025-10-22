// src/views/project/other/railway-maintenance-facility-infrastructure-and-utility/railway-maintenance-facility-infrastructure-and-utility-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceFacilityInfrastructureAndUtility } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import type { FileTypeConfig } from './file-type-config';

interface RailwayMaintenanceFacilityInfrastructureAndUtilityCardProps {
  railwayMaintenanceFacilityInfrastructureAndUtility: RailwayMaintenanceFacilityInfrastructureAndUtility;
  refetch: () => void;
  onEdit: (data: RailwayMaintenanceFacilityInfrastructureAndUtility) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayMaintenanceFacilityInfrastructureAndUtility) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const entitySubject = 'railwaymaintenancefacilityinfrastructureandutility';

const RailwayMaintenanceFacilityInfrastructureAndUtilityCard: React.FC<
  RailwayMaintenanceFacilityInfrastructureAndUtilityCardProps
> = ({ railwayMaintenanceFacilityInfrastructureAndUtility: data, refetch, onEdit, onDelete, onDetail, otherSubMenu, fileTypesConfig }) => {
  const { t } = useTranslation();

  const PRIMARY_FILE_TYPE = fileTypesConfig[0].type;

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));

  const facilityName = data.facility_name || t('common.na');
  const railTracks = booleanToText(data.rail_tracks_and_turnout_availability);
  const fueling = booleanToText(data.fueling_and_refueling_facility_availability);
  const airSystem = booleanToText(data.compressed_air_system_availability);
  const remarks = data.remarks || t('common.na');


  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(data)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {facilityName} ({t('project.other.railway-maintenance-facility-infrastructure-and-utilities.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.rail-tracks-and-turnout-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {railTracks}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.fueling-and-refueling-facility-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {fueling}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.compressed-air-system-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {airSystem}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.remarks')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {remarks}
            </Typography>
          </Grid>

          {/* Dynamic File Attachments Section */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('common.form.file-attachments')}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {fileTypesConfig.map((fileType, index) => (
                <Box key={fileType.type} sx={{ mt: index > 0 ? 2 : 0 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {t(fileType.titleTKey)}
                  </Typography>
                  {data.id && (
                    <FileDrawer
                      id={data.id as string}
                      type={fileType.type}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {data.id && <FileDrawer id={data.id} type={otherSubMenu?.fileType || PRIMARY_FILE_TYPE} />}

        {data.id && (
          <ModelAction
            model="RailwayMaintenanceFacilityInfrastructureAndUtility"
            model_id={data.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: entitySubject
          }}
          editPermissionRule={{
            action: 'update',
            subject: entitySubject
          }}
          onEdit={() => onEdit(data)}
          onDelete={() => onDelete(data.id as string)}
          item={data}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayMaintenanceFacilityInfrastructureAndUtilityCard;