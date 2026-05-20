import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProfessionalContactPerson } from 'src/types/resource/index';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProfessionalContactPersonCardProps {
  contactPerson: ProfessionalContactPerson;
  refetch: () => void;
  onEdit: (contactPerson: ProfessionalContactPerson) => void;
  onDelete: (id: string) => void;
  onDetail: (contactPerson: ProfessionalContactPerson) => void;
}

const ProfessionalContactPersonCard: React.FC<ProfessionalContactPersonCardProps> = ({
  contactPerson,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(contactPerson)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${contactPerson.first_name} ${contactPerson.last_name}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.contact-person.nationalIdNo')}: {contactPerson.national_id_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.contact-person.email')}: {contactPerson.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.contact-person.phoneNo')}: {contactPerson.phone_no}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="ProfessionalContactPerson"
          model_id={contactPerson?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'professionalcontactpeople'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'professionalcontactpeople'
          }}
          onEdit={() => onEdit(contactPerson)}
          onDelete={() => onDelete(contactPerson?.id || '')}
          item={contactPerson}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ProfessionalContactPersonCard;
