import { Box, Card, CardContent, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { UserEducation } from 'src/types/admin/user';
import { formatDynamicDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

interface EducationCardProps {
  education: UserEducation;
  refetch: () => void;
  onEdit: (education: UserEducation) => void;
  onDelete: (id: string) => void;
  onDetail: (education: UserEducation) => void;
}

const EducationCard: React.FC<EducationCardProps> = ({ education, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <SharedItemViewCard
      t={t}
      createdAt={education.created_at}
      actions={
        <>
          <FileDrawer id={education?.id || ''} type={uploadableResourceFileTypes.resource} />
          <ModelAction
            model="UserEducation"
            model_id={education?.id || ''}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'usereducation'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'usereducation'
            }}
            onEdit={() => onEdit(education)}
            onDelete={() => onDelete(education?.id || '')}
            item={education}
            options={[]}
          />
        </>
      }
    >
      <Box display="flex" gap={4} alignItems="center">
        <Avatar alt={education.school_name} src="/static/images/avatar/1.jpg" sx={{ width: 55, height: 55 }} />
        <Box>
          <Typography variant="subtitle1">{education.school_name || 'N/A'}</Typography>
          <Typography variant="subtitle2">
            {education.education_level} {t('in')} {education.studyField?.title}
          </Typography>
          <Typography variant="subtitle2">
            {formatDynamicDate(education.start_date)} - {formatDynamicDate(education.end_date)}
          </Typography>
        </Box>
      </Box>
    </SharedItemViewCard>
  );
};

export default EducationCard;
