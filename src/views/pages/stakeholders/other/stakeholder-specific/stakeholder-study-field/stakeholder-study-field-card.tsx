import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StakeholderStudyField } from 'src/types/stakeholder/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface StakeholderStudyFieldCardProps {
  stakeholderStudyField: StakeholderStudyField;
  refetch: () => void;
  onEdit: (stakeholderStudyField: StakeholderStudyField) => void;
  onDelete: (id: string) => void;
  onDetail: (stakeholderStudyField: StakeholderStudyField) => void;
}

const StakeholderStudyFieldCard: React.FC<StakeholderStudyFieldCardProps> = ({
  stakeholderStudyField,
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
              onClick={() => onDetail(stakeholderStudyField)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {stakeholderStudyField.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.title')}: {stakeholderStudyField.studyfield.title || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.description')}: {stakeholderStudyField.studyfield.description || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.study-program-id')}: {stakeholderStudyField.studyfield.study_program_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.studylevel-id')}: {stakeholderStudyField.studyfield.studylevel_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-field.details.revision-no')}: {stakeholderStudyField.revision_no?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {stakeholderStudyField.created_at ? formatCreatedAt(stakeholderStudyField.created_at) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {stakeholderStudyField.updated_at ? formatCreatedAt(stakeholderStudyField.updated_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={stakeholderStudyField.id} type={uploadableStakeholderFileTypes.other.stakeholderStudyField} />
        <ModelAction
          model="StakeholderStudyField"
          model_id={stakeholderStudyField.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(stakeholderStudyField)}
          onDelete={() => onDelete(stakeholderStudyField.id)}
          item={stakeholderStudyField}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderstudyfield'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderstudyfield'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default StakeholderStudyFieldCard;
