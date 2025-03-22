// src/views/project/project-contact-person-card.tsx
import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectContactPerson } from 'src/types/project/projext-contact-person';
import type { Stakeholder } from 'src/types/stakeholder';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProjectContactPersonCardProps {
  contactPerson: ProjectContactPerson;
  refetch: () => void;
  onEdit: (contactPerson: ProjectContactPerson) => void;
  onDelete: (id: string) => void;
  onDetail: (contactPerson: ProjectContactPerson) => void;
  stakeholders: Stakeholder[];
}

const ProjectContactPersonCard: React.FC<ProjectContactPersonCardProps> = ({
  contactPerson,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  stakeholders
}) => {
  const { t } = useTranslation();

  const getStakeholderName = (stakeholderId: string) => {
    const stakeholder = stakeholders.find((s) => s.id === stakeholderId);
    return stakeholder ? stakeholder.trade_name : 'N/A';
  };

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
            {t('project.project-contact-person.position')}: {contactPerson.position || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.project-contact-person.department')}: {contactPerson.department || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.project-contact-person.email')}: {contactPerson.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.project-contact-person.phone')}: {contactPerson.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.project-contact-person.stakeholder')}: {getStakeholderName(contactPerson.stakeholder_id)}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="ProjectContactPerson"
          model_id={contactPerson?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectcontactperson'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectcontactperson'
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

export default ProjectContactPersonCard;
