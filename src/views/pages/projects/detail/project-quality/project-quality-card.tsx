import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ProjectQuality } from 'src/types/project/project-quality';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface QualityCardProps {
  quality: ProjectQuality;
  refetch: () => void;
  onEdit: (quality: ProjectQuality) => void;
  onDelete: (id: string) => void;
  onDetail: (quality: ProjectQuality) => void;
}

const QualityCard: React.FC<QualityCardProps> = ({ quality, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(quality)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {t('project.quality.title')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.quality.major-quality-problem-encountered')}: {quality.major_quality_problem_encountered}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.quality.description')}: {quality.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.quality.measures-taken')}: {quality.measures_taken}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.quality.lesson-learned')}: {quality.lesson_learned}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={quality?.id || ''} type={uploadableResourceFileTypes.projectQuality} />
        <ModelAction
          model="ProjectQuality"
          model_id={quality?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectquality'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectquality'
          }}
          onEdit={() => onEdit(quality)}
          onDelete={() => onDelete(quality?.id || '')}
          item={quality}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default QualityCard;