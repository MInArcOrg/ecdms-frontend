import { Box, Card, CardContent, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { UserWorkExperience } from 'src/types/admin/user';
import { formatDynamicDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

interface WorkExperienceCardProps {
  workexperience: UserWorkExperience;
  refetch: () => void;
  onEdit: (workexperience: UserWorkExperience) => void;
  onDelete: (id: string) => void;
  onDetail: (workexperience: UserWorkExperience) => void;
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({ workexperience, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <SharedItemViewCard
      t={t}
      createdAt={workexperience.created_at}
      actions={
        <>
          <FileDrawer id={workexperience?.id || ''} type={uploadableResourceFileTypes.resource} />
          <ModelAction
            model="UserWorkExperience"
            model_id={workexperience?.id || ''}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'userworkexperience'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'userworkexperience'
            }}
            onEdit={() => onEdit(workexperience)}
            onDelete={() => onDelete(workexperience?.id || '')}
            item={workexperience}
            options={[]}
          />
        </>
      }
    >
      <Box display="flex" gap={4} alignItems="center">
        <Avatar alt={workexperience.company_name} src="/static/images/avatar/1.jpg" sx={{ width: 55, height: 55 }} />
        <Box>
          <Typography variant="subtitle1">{workexperience.company_name || 'N/A'}</Typography>
          <Typography variant="subtitle2">
            {workexperience.position || t('common.not-available')} {t('in')} {workexperience.department || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {workexperience.task_description || t('common.not-available')}
          </Typography>
          <Typography variant="subtitle2">
            {formatDynamicDate(workexperience.start_date)} -{' '}
            {workexperience.end_date ? formatDynamicDate(workexperience.end_date) : t('Present')}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} p={2}></Box>
    </SharedItemViewCard>
  );
};

export default WorkExperienceCard;
