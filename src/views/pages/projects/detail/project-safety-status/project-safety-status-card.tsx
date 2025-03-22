import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ProjectSafetyStatus } from 'src/types/project/project-safety-status ';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface SafetyStatusCardProps {
  safetyStatus: ProjectSafetyStatus;
  refetch: () => void;
  onEdit: (safetyStatus: ProjectSafetyStatus) => void;
  onDelete: (id: string) => void;
  onDetail: (safetyStatus: ProjectSafetyStatus) => void;
}

const SafetyStatusCard: React.FC<SafetyStatusCardProps> = ({ safetyStatus, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(safetyStatus)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.safety-status.title')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.safety-status.fatal-injuries')}: {safetyStatus.no_of_fatal_injuries}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.safety-status.major-injuries')}: {safetyStatus.no_of_major_injuries}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.safety-status.minor-injuries')}: {safetyStatus.no_of_minor_injuries}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.safety-status.measures-taken')}: {safetyStatus.measures_taken}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.safety-status.lesson-learned')}: {safetyStatus.lesson_learned}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={safetyStatus?.id || ''} type={uploadableResourceFileTypes.project_safety_status} />
        <ModelAction
          model="ProjectSafetyStatus"
          model_id={safetyStatus?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectsafetystatus'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectsafetystatus'
          }}
          onEdit={() => onEdit(safetyStatus)}
          onDelete={() => onDelete(safetyStatus?.id || '')}
          item={safetyStatus}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default SafetyStatusCard;
