// src/views/project/other/railway-maintenance-facility-equipment-and-tool/railway-maintenance-facility-equipment-and-tool-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceFacilityEquipmentAndTool } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import type { FileTypeConfig } from './file-type-config';

interface RailwayMaintenanceFacilityEquipmentAndToolCardProps {
  railwayMaintenanceFacilityEquipmentAndTool: RailwayMaintenanceFacilityEquipmentAndTool;
  refetch: () => void;
  onEdit: (data: RailwayMaintenanceFacilityEquipmentAndTool) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayMaintenanceFacilityEquipmentAndTool) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const entitySubject = 'railwaymaintenancefacilityequipmentandtool';

const RailwayMaintenanceFacilityEquipmentAndToolCard: React.FC<
  RailwayMaintenanceFacilityEquipmentAndToolCardProps
> = ({ railwayMaintenanceFacilityEquipmentAndTool: data, refetch, onEdit, onDelete, onDetail, otherSubMenu, fileTypesConfig }) => {
  const { t } = useTranslation();

  const PRIMARY_FILE_TYPE = fileTypesConfig[0].type;

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));

  const facilityName = data.facility_name || t('common.na');
  const availableTypes = data.maintenance_equipment_and_tool_available_type || t('common.na');
  const hoistsCranes = booleanToText(data.hoists_cranes_and_lifting_equipment);
  const diagnosticEquipment = data.diagnostic_and_testing_equipment || t('common.na');
  const specificTools = data.tools_and_machinery_specific_to_maintenance_activities || t('common.na');
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
              {facilityName} ({t('project.other.railway-maintenance-facility-equipment-and-tool.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-equipment-and-tool.details.maintenance-equipment-and-tool-available-type')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {availableTypes}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-equipment-and-tool.details.hoists-cranes-and-lifting-equipment')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {hoistsCranes}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-equipment-and-tool.details.diagnostic-and-testing-equipment')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {diagnosticEquipment}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-equipment-and-tool.details.tools-and-machinery-specific-to-maintenance-activities')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {specificTools}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-maintenance-facility-equipment-and-tool.details.remark')}
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
            model="RailwayMaintenanceFacilityEquipmentAndTool"
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

export default RailwayMaintenanceFacilityEquipmentAndToolCard;