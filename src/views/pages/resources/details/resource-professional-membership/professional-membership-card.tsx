import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';
import type { ProfessionalMembership } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface MembershipCardProps {
  membership: ProfessionalMembership;
  refetch: () => void;
  onEdit: (membership: ProfessionalMembership) => void;
  onDelete: (id: string) => void;
  onDetail: (membership: ProfessionalMembership) => void;
  otherSubMenu?: DetailSubMenuItem;
}

const MembershipCard: React.FC<MembershipCardProps> = ({ membership, refetch, onEdit, onDelete, onDetail, otherSubMenu }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(membership)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {membership.association_name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.association-membership.membership-type')}: {membership?.membership_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.association-membership.position')}: {membership?.position || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.association-membership.registration-date')}: {membership?.registration_date || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={membership?.id || ''} type={otherSubMenu?.type?.toString() || ''} />
        <ModelAction
          model={otherSubMenu?.model || 'ProfessionalMembership'}
          model_id={membership?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: otherSubMenu?.model || 'ProfessionalMembership'
          }}
          editPermissionRule={{
            action: 'update',
            subject: otherSubMenu?.model || 'ProfessionalMembership'
          }}
          onEdit={() => onEdit(membership)}
          onDelete={() => onDelete(membership?.id || '')}
          item={membership}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default MembershipCard;
