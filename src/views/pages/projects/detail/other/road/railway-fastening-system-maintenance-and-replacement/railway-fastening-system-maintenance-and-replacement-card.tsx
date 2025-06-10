import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemMaintenanceAndReplacement } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayFasteningSystemMaintenanceAndReplacementCardProps {
  railwayFasteningSystemMaintenanceAndReplacement: RailwayFasteningSystemMaintenanceAndReplacement;
  refetch: () => void;
  onEdit: (maintenance: RailwayFasteningSystemMaintenanceAndReplacement) => void;
  onDelete: (id: string) => void;
  onDetail: (maintenance: RailwayFasteningSystemMaintenanceAndReplacement) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemMaintenanceAndReplacementCard: React.FC<
  RailwayFasteningSystemMaintenanceAndReplacementCardProps
> = ({
  railwayFasteningSystemMaintenanceAndReplacement,
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
                onClick={() => onDetail(railwayFasteningSystemMaintenanceAndReplacement)}
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {railwayFasteningSystemMaintenanceAndReplacement?.id?.toString().slice(0, 5)}...
              </Typography>
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box display="flex" flexDirection="column" gap={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t(
                'project.other.railway-fastening-system-maintenance-and-replacement.details.railway_line_section_name'
              )}
              :{' '}
              {railwayFasteningSystemMaintenanceAndReplacement.railway_line_section_name || 'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                'project.other.railway-fastening-system-maintenance-and-replacement.details.scheduled_maintenance_activities'
              )}
              :{' '}
              {railwayFasteningSystemMaintenanceAndReplacement.scheduled_maintenance_activities ||
                'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t(
                'project.other.railway-fastening-system-maintenance-and-replacement.details.recent_maintenance_records_and_dates'
              )}
              :{' '}
              {railwayFasteningSystemMaintenanceAndReplacement.recent_maintenance_records_and_dates ||
                'N/A'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.railway-fastening-system-maintenance-and-replacement.details.remark')}:{' '}
              {railwayFasteningSystemMaintenanceAndReplacement.remark || 'N/A'}
            </Typography>
            {railwayFasteningSystemMaintenanceAndReplacement.created_at && (
              <Typography variant="body2" color="text.secondary">
                {t('common.table-columns.created-at')}:{' '}
                {railwayFasteningSystemMaintenanceAndReplacement.created_at}
              </Typography>
            )}
            {railwayFasteningSystemMaintenanceAndReplacement.updated_at && (
              <Typography variant="body2" color="text.secondary">
                {t('common.table-columns.updated-at')}:{' '}
                {railwayFasteningSystemMaintenanceAndReplacement.updated_at}
              </Typography>
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {railwayFasteningSystemMaintenanceAndReplacement.id &&
            <FileDrawer
              id={railwayFasteningSystemMaintenanceAndReplacement.id}
              type={'INSPECTION_REPORTS_AND_FINDINGS'}
            />
          }

          {railwayFasteningSystemMaintenanceAndReplacement.id &&
            <FileDrawer
              id={railwayFasteningSystemMaintenanceAndReplacement.id}
              type={'FASTENING SYSTEM_REPLACEMENT_HISTORY'}
            />
          }

          {railwayFasteningSystemMaintenanceAndReplacement.id && (
            <ModelAction
              model="RailwayFasteningSystemMaintenanceAndReplacement"
              model_id={railwayFasteningSystemMaintenanceAndReplacement.id}
              refetchModel={refetch}
              resubmit={refetch}
              title=""
              postAction={refetch}
            />
          )}
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayfasteningsystemmaintenanceandreplacement'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayfasteningsystemmaintenanceandreplacement'
            }}
            onEdit={() => onEdit(railwayFasteningSystemMaintenanceAndReplacement)}
            onDelete={() => onDelete(railwayFasteningSystemMaintenanceAndReplacement.id as string)}
            item={railwayFasteningSystemMaintenanceAndReplacement}
            options={[]}
          />
        </CardActions>
      </Card>
    );
  };

export default RailwayFasteningSystemMaintenanceAndReplacementCard;