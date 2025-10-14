import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayCommunicationSystemSafetyAndCompliance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatDate } from 'src/utils/formatter/date';

interface RailwayCommunicationSystemSafetyAndComplianceCardProps {
  railwayCommunicationSystemSafetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance;
  refetch: () => void;
  onEdit: (safetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance) => void;
  onDelete: (id: string) => void;
  onDetail: (safetyAndCompliance: RailwayCommunicationSystemSafetyAndCompliance) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayCommunicationSystemSafetyAndComplianceCard: React.FC<RailwayCommunicationSystemSafetyAndComplianceCardProps> = ({
  railwayCommunicationSystemSafetyAndCompliance,
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
              onClick={() => onDetail(railwayCommunicationSystemSafetyAndCompliance)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayCommunicationSystemSafetyAndCompliance?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-communication-system-safety-and-compliance.details.railway_line_section_name'
            )}
            :{' '}
            {railwayCommunicationSystemSafetyAndCompliance.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-communication-system-safety-and-compliance.details.safety_measures_and_protocols_done'
            )}
            :{' '}
            {railwayCommunicationSystemSafetyAndCompliance.safety_measures_and_protocols_done ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-communication-system-safety-and-compliance.details.compliance_with_signaling_and_communication_standards'
            )}
            :{' '}
            {railwayCommunicationSystemSafetyAndCompliance.compliance_with_signaling_and_communication_standards ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-communication-system-safety-and-compliance.details.incident_or_accident_records'
            )}
            :{' '}
            {railwayCommunicationSystemSafetyAndCompliance.incident_or_accident_records ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-communication-system-safety-and-compliance.details.incident_date'
            )}
            :{' '}
            {railwayCommunicationSystemSafetyAndCompliance.incident_date ? formatDate(railwayCommunicationSystemSafetyAndCompliance.incident_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-communication-system-safety-and-compliance.details.remark')}:{' '}
            {railwayCommunicationSystemSafetyAndCompliance.remark || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayCommunicationSystemSafetyAndCompliance.id &&
          <FileDrawer
            id={railwayCommunicationSystemSafetyAndCompliance.id}
            type={otherSubMenu?.fileType || ''}
          />
        }

        {railwayCommunicationSystemSafetyAndCompliance.id && (
          <ModelAction
            model="RailwayCommunicationSystemSafetyAndCompliance"
            model_id={railwayCommunicationSystemSafetyAndCompliance.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaycommunicationsystemsafetyandcompliance'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaycommunicationsystemsafetyandcompliance'
          }}
          onEdit={() => onEdit(railwayCommunicationSystemSafetyAndCompliance)}
          onDelete={() => onDelete(railwayCommunicationSystemSafetyAndCompliance.id as string)}
          item={railwayCommunicationSystemSafetyAndCompliance}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayCommunicationSystemSafetyAndComplianceCard;