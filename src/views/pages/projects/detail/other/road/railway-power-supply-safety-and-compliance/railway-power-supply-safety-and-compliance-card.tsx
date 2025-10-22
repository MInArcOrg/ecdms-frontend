// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import type { FileTypeConfig } from './file-type-config';

interface RailwayPowerSupplySafetyAndComplianceCardProps {
  railwayPowerSupplySafetyAndCompliance: RailwayPowerSupplySafetyAndCompliance;
  refetch: () => void;
  onEdit: (data: RailwayPowerSupplySafetyAndCompliance) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayPowerSupplySafetyAndCompliance) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[];
}

const entitySubject = 'railwaypowersupplysafetyandcompliance';

const RailwayPowerSupplySafetyAndComplianceCard: React.FC<
  RailwayPowerSupplySafetyAndComplianceCardProps
> = ({ railwayPowerSupplySafetyAndCompliance: data, refetch, onEdit, onDelete, onDetail, otherSubMenu, fileTypesConfig }) => {
  const { t } = useTranslation();

  const PRIMARY_FILE_TYPE = fileTypesConfig.find(f => f.key === 'mainDocument')?.type || fileTypesConfig[0].type;

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));

  const platformLayoutDisplay = data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || t('common.na');
  const safetyMeasures = booleanToText(data.safety_measures_and_protocols);
  const compliance = booleanToText(data.compliance_with_electrical_safety_standards_and_regulations);
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
              {platformLayoutDisplay} ({t('project.other.railway-power-supply-safety-and-compliance.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-supply-safety-and-compliance.details.platform-layout')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {platformLayoutDisplay}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-supply-safety-and-compliance.details.safety-measures-and-protocols')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {safetyMeasures}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-supply-safety-and-compliance.details.compliance-with-electrical-safety-standards-and-regulations')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {compliance}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-supply-safety-and-compliance.details.remark')}
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
            model="RailwayPowerSupplySafetyAndCompliance"
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

export default RailwayPowerSupplySafetyAndComplianceCard;