// src/views/project/other/railway-maintenance-facility-schedule-and-procedure/railway-maintenance-facility-schedule-and-procedure-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceFacilityScheduleAndProcedure } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import type { FileTypeConfig } from './file-type-config';

interface RailwayMaintenanceFacilityScheduleAndProcedureCardProps {
  railwayMaintenanceFacilityScheduleAndProcedure: RailwayMaintenanceFacilityScheduleAndProcedure;
  refetch: () => void;
  onEdit: (data: RailwayMaintenanceFacilityScheduleAndProcedure) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayMaintenanceFacilityScheduleAndProcedure) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const entitySubject = 'railwaymaintenancefacilityscheduleandprocedure';

const RailwayMaintenanceFacilityScheduleAndProcedureCard: React.FC<
  RailwayMaintenanceFacilityScheduleAndProcedureCardProps
> = ({ railwayMaintenanceFacilityScheduleAndProcedure: data, refetch, onEdit, onDelete, onDetail, otherSubMenu, fileTypesConfig }) => {
  const { t } = useTranslation();

  const PRIMARY_FILE_TYPE = fileTypesConfig[0].type;

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));

  const facilityName = data.facility_name || t('common.na');
  const schedulesAvail = booleanToText(data.maintenance_schedules_and_routines_availability);
  const proceduresAvail = booleanToText(data.procedures_for_planned_and_preventive_maintenance_availability);
  const recordKeepingAvail = booleanToText(data.documentation_and_record_keeping_practices_availability);
  const remark = data.remark || t('common.na');


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
              {facilityName} ({t('project.other.railway-maintenance-facility-schedule-and-procedure.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-schedule-and-procedure.details.maintenance-schedules-and-routines-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {schedulesAvail}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-schedule-and-procedure.details.procedures-for-planned-and-preventive-maintenance-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {proceduresAvail}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-schedule-and-procedure.details.documentation-and-record-keeping-practices-availability')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {recordKeepingAvail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-schedule-and-procedure.details.remark')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {remark}
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
            model="RailwayMaintenanceFacilityScheduleAndProcedure"
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
            subject: otherSubMenu?.model || entitySubject
          }}
          editPermissionRule={{
            action: 'update',
            subject: otherSubMenu?.model || entitySubject
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

export default RailwayMaintenanceFacilityScheduleAndProcedureCard;