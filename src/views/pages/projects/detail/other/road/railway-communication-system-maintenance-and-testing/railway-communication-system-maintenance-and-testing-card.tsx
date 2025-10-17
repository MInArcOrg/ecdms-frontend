import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayCommunicationSystemMaintenanceAndTesting } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayCommunicationSystemMaintenanceAndTestingCardProps {
  railwayCommunicationSystemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting;
  refetch: () => void;
  onEdit: (systemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting) => void;
  onDelete: (id: string) => void;
  onDetail: (systemMaintenanceAndTesting: RailwayCommunicationSystemMaintenanceAndTesting) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemMaintenanceAndTestingCard: React.FC<RailwayCommunicationSystemMaintenanceAndTestingCardProps> = ({
  railwayCommunicationSystemMaintenanceAndTesting,
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
              onClick={() => onDetail(railwayCommunicationSystemMaintenanceAndTesting)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayCommunicationSystemMaintenanceAndTesting?.id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.railway_line_section_name')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.scheduled_maintenance_activities')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.scheduled_maintenance_activities || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.inspections')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.inspections ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.recent_maintenance_records_and_dates')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.recent_maintenance_records_and_dates || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.testing_and_verification_procedures_prepared')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.testing_and_verification_procedures_prepared ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.maintenance_contracts_or_agreements_made')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.maintenance_contracts_or_agreements_made || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.remark')}:{' '}
            {railwayCommunicationSystemMaintenanceAndTesting.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-maintenance-and-testing.details.maintenance-contracts-file-upload')}:{' '}
            {<FileDrawer id={railwayCommunicationSystemMaintenanceAndTesting.id} type={otherSubMenu?.fileType || ''} /> || 'N/A'}
          </Typography>
          {railwayCommunicationSystemMaintenanceAndTesting.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayCommunicationSystemMaintenanceAndTesting.created_at}
            </Typography>
          )}
          {railwayCommunicationSystemMaintenanceAndTesting.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayCommunicationSystemMaintenanceAndTesting.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayCommunicationSystemMaintenanceAndTesting.id && (
          <FileDrawer id={railwayCommunicationSystemMaintenanceAndTesting.id} type={otherSubMenu?.fileType || ''} />
        )}

        {railwayCommunicationSystemMaintenanceAndTesting.id && (
          <ModelAction
            model="RailwayCommunicationSystemMaintenanceAndTesting"
            model_id={railwayCommunicationSystemMaintenanceAndTesting.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaycommunicationsystemmaintenanceandtesting'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaycommunicationsystemmaintenanceandtesting'
          }}
          onEdit={() => onEdit(railwayCommunicationSystemMaintenanceAndTesting)}
          onDelete={() => onDelete(railwayCommunicationSystemMaintenanceAndTesting.id as string)}
          item={railwayCommunicationSystemMaintenanceAndTesting}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayCommunicationSystemMaintenanceAndTestingCard;
