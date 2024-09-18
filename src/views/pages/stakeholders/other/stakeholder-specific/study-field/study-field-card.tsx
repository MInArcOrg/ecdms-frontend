import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StudyField } from 'src/types/stakeholder/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface StudyFieldCardProps {
  studyField: StudyField;
  refetch: () => void;
  onEdit: (studyField: StudyField) => void;
  onDelete: (id: string) => void;
  onDetail: (studyField: StudyField) => void;
}

const StudyFieldCard: React.FC<StudyFieldCardProps> = ({
  studyField,
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
              onClick={() => onDetail(studyField)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {studyField?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.title')}: {studyField?.title || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.description')}: {studyField?.description || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.study-program-id')}: {studyField?.study_program_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.studylevel-id')}: {studyField?.studylevel_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.revision-no')}: {studyField?.revision_no?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {studyField?.created_at ? formatCreatedAt(studyField.created_at) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}: {studyField?.updated_at ? formatCreatedAt(studyField.updated_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={studyField.id} type={uploadableStakeholderFileTypes.other.studyField} />
        <ModelAction
          model="StudyField"
          model_id={studyField.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(studyField)}
          onDelete={() => onDelete(studyField.id)}
          item={studyField}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default StudyFieldCard;
