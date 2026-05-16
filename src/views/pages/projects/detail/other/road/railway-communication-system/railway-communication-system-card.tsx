import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayCommunicationSystem } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayCommunicationSystemCardProps {
  railwayCommunicationSystem: RailwayCommunicationSystem;
  refetch: () => void;
  onEdit: (communicationSystem: RailwayCommunicationSystem) => void;
  onDelete: (id: string) => void;
  onDetail: (communicationSystem: RailwayCommunicationSystem) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemCard: React.FC<RailwayCommunicationSystemCardProps> = ({
  railwayCommunicationSystem,
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
              onClick={() => onDetail(railwayCommunicationSystem)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayCommunicationSystem?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.railway_line_section_name')}:{' '}
            {railwayCommunicationSystem.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.communication_system_type')}:{' '}
            {railwayCommunicationSystem.communicationSystemType?.title || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.communication_system_protocols_or_standards')}:{' '}
            {railwayCommunicationSystem.communication_system_protocols_or_standards || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.communication_system_components')}:{' '}
            {railwayCommunicationSystem.communication_system_components || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.signaling_system_components')}:{' '}
            {railwayCommunicationSystem.signaling_system_components || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system.details.remark')}: {railwayCommunicationSystem.remark || 'N/A'}
          </Typography>
          {railwayCommunicationSystem.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayCommunicationSystem.created_at}
            </Typography>
          )}
          {railwayCommunicationSystem.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayCommunicationSystem.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayCommunicationSystem.id && <FileDrawer id={railwayCommunicationSystem.id} type={otherSubMenu?.fileType || ''} />}

        {railwayCommunicationSystem.id && (
          <ModelAction
            model="RailwayCommunicationSystem"
            model_id={railwayCommunicationSystem.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaycommunicationsystem'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaycommunicationsystem'
          }}
          onEdit={() => onEdit(railwayCommunicationSystem)}
          onDelete={() => onDelete(railwayCommunicationSystem.id as string)}
          item={railwayCommunicationSystem}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayCommunicationSystemCard;
