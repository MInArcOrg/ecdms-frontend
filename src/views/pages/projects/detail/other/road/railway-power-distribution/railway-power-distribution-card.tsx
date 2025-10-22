// src/views/project/other/railway-power-distribution/railway-power-distribution-card.tsx

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerDistribution } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { gridSpacing } from 'src/configs/app-constants';
import type { FileTypeConfig } from './filet-type-config';

interface RailwayPowerDistributionCardProps {
  railwayPowerDistribution: RailwayPowerDistribution;
  refetch: () => void;
  onEdit: (data: RailwayPowerDistribution) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayPowerDistribution) => void;
  otherSubMenu?: DetailSubMenuItemChild;
  fileTypesConfig: FileTypeConfig[]; // Dynamic file types array
}

const entitySubject = 'railwaypowerdistribution';

const RailwayPowerDistributionCard: React.FC<
  RailwayPowerDistributionCardProps
> = ({ railwayPowerDistribution: data, refetch, onEdit, onDelete, onDetail, otherSubMenu, fileTypesConfig }) => {
  const { t } = useTranslation();

  // Use the primary file type from config for the main FileDrawer in CardActions
  const PRIMARY_FILE_TYPE = fileTypesConfig[0].type;

  const platformLayoutDisplay = data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || t('common.na');

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
              {platformLayoutDisplay} ({t('project.other.railway-power-distribution.title-short')})
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Grid container spacing={gridSpacing}>
          {/* Data Fields */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-distribution.details.railway_station_platform_layout_id')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5 }}>
              {platformLayoutDisplay}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">
              {t('project.other.railway-power-distribution.details.remark')}
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
              {data.remark || t('common.no-remark')}
            </Typography>
          </Grid>

          {/* Dynamic File Attachments Section */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              {t('common.form.file-attachments')}
            </Typography>
            <Box sx={{ mt: 2 }}>
              {/* Loop through the configuration to render a FileDrawer for each type */}
              {fileTypesConfig.map((fileType, index) => (
                <Box key={fileType.type} sx={{ mt: index > 0 ? 2 : 0 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {t(fileType.titleTKey)}
                  </Typography>
                  {/* The FileDrawer must be supplied with the specific fileType.type */}
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
        {/* Main FileDrawer for quick access in CardActions */}
        {data.id && <FileDrawer id={data.id} type={otherSubMenu?.fileType || PRIMARY_FILE_TYPE} />}

        {data.id && (
          <ModelAction
            model="RailwayPowerDistribution"
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

export default RailwayPowerDistributionCard;