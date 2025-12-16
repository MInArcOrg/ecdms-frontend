import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProjectChallenge } from 'src/types/project/project-challenge';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProjectChallengeCardProps {
  projectChallenge: ProjectChallenge;
  refetch: () => void;
  onEdit: (projectChallenge: ProjectChallenge) => void;
  onDelete: (id: string) => void;
  onDetail: (projectChallenge: ProjectChallenge) => void;
}

const ProjectChallengeCard: React.FC<ProjectChallengeCardProps> = ({ projectChallenge, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(projectChallenge)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.other.challenges.title')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.challenges.challenge-type')}: {projectChallenge.challenge_type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.challenges.description')}: {projectChallenge.description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectchallenge'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'projectchallenge'
          }}
          onEdit={() => onEdit(projectChallenge)}
          onDelete={() => onDelete(projectChallenge?.id || '')}
          item={projectChallenge}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ProjectChallengeCard;
