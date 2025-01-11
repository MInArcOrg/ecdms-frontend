import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ProjectOutcomeCardProps {
  projectOutcome: ProjectOutcome;
  refetch: () => void;
  onEdit: (projectOutcome: ProjectOutcome) => void;
  onDelete: (id: string) => void;
  onDetail: (projectOutcome: ProjectOutcome) => void;
}

const ProjectOutcomeCard: React.FC<ProjectOutcomeCardProps> = ({ projectOutcome, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(projectOutcome)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {projectOutcome?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.outcome.construction-type')}: {projectOutcome?.construction_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.outcome.function')}: {projectOutcome?.function || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.outcome.lesson-learned')}: {projectOutcome?.lesson_learned || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <FileDrawer id={projectOutcome.id} type={uploadableProjectFileTypes.project} /> */}
        <ModelAction
          model="ProjectOutcome"
          model_id={projectOutcome.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectoutcome'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectoutcome'
          }}
          onEdit={() => onEdit(projectOutcome)}
          onDelete={() => onDelete(projectOutcome.id)}
          item={projectOutcome}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ProjectOutcomeCard;