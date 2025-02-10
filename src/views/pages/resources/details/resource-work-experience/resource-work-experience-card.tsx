import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ProfessionalWorkExperience } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ExperienceCardProps {
  experience: ProfessionalWorkExperience;
  refetch: () => void;
  onEdit: (experience: ProfessionalWorkExperience) => void;
  onDelete: (id: string) => void;
  onDetail: (experience: ProfessionalWorkExperience) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(experience)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {experience.company_name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.work-experience.position')}: {experience?.position || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.work-experience.department')}: {experience?.department || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.professional.work-experience.task-description')}: {experience?.task_description || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={experience?.id || ''} type={uploadableResourceFileTypes.professionalWorkExperience} />
        <ModelAction
          model="ProfessionalWorkExperience"
          model_id={experience?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'professionalworkexperience'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'professionalworkexperience'
          }}
          onEdit={() => onEdit(experience)}
          onDelete={() => onDelete(experience?.id || '')}
          item={experience}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ExperienceCard;
