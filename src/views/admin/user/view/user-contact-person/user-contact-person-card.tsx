import { Box, CardActions, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { UserContactPerson } from 'src/types/admin/user';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

interface UserContactPersonCardProps {
  contactPerson: UserContactPerson;
  refetch: () => void;
  onEdit: (contactPerson: UserContactPerson) => void;
  onDelete: (id: string) => void;
}

const UserContactPersonCard: React.FC<UserContactPersonCardProps> = ({ contactPerson, refetch, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <SharedItemViewCard
      createdAt={contactPerson.created_at}
      t={t}
      actions={
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <ModelAction
            model="ContactPerson"
            model_id={contactPerson?.id || ''}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'contactperson'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'contactperson'
            }}
            onEdit={() => onEdit(contactPerson)}
            onDelete={() => onDelete(contactPerson?.id || '')}
            item={contactPerson}
            options={[]}
          />
        </CardActions>
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h5" fontWeight="bold">
          {`${contactPerson.first_name} ${contactPerson.middle_name} ${contactPerson.last_name}`}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" flexDirection="column" gap={1} mt={2}>
        <Typography variant="body2" color="text.secondary">
          {t('department.user.contact-person.nationalIdNo')}: {contactPerson.national_id_no || t('common.not-available')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('department.user.contact-person.email')}: {contactPerson.email || t('common.not-available')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('department.user.contact-person.phoneNo')}: {contactPerson.phone_no}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('department.user.contact-person.gender')}: {contactPerson.gender}
        </Typography>
      </Box>
    </SharedItemViewCard>
  );
};

export default UserContactPersonCard;
