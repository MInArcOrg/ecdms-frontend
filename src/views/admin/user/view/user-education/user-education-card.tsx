import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { UserEducation } from 'src/types/admin/user';
import type { StudyField } from 'src/types/general/general-master';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface EducationCardProps {
  education: UserEducation;
  refetch: () => void;
  onEdit: (education: UserEducation) => void;
  onDelete: (id: string) => void;
  onDetail: (education: UserEducation) => void;
  studyFields: StudyField[];
}

const EducationCard: React.FC<EducationCardProps> = ({ education, refetch, onEdit, onDelete, onDetail, studyFields }) => {
  const { t } = useTranslation();

  const getStudyFieldTitle = (id: string) => {
    const field = studyFields.find((f) => f.id === id);
    return field ? field.title : 'N/A';
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(education)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {getStudyFieldTitle(education.study_field)}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('resources.user.education.school-name')}: {education?.school_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.user.education.education-level')}: {education?.education_level || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.user.education.program-type')}: {education?.program_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('resources.user.education.gpa')}: {education?.gpa || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
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
      </CardActions>
    </Card>
  );
};

export default EducationCard;
