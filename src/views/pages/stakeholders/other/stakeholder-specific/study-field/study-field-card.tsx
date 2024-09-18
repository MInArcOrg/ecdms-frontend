import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StudyField } from 'src/types/project/other';
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
            {t('project.other.building-envelop-material.details.exterior-walls')}: {studyField?.exterior_walls || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.roof-assembly')}: {studyField?.roof_assembly || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.exterior-windows')}: {studyField?.exterior_windows || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.exterior-doors')}: {studyField?.exterior_doors || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.building-envelop-material.details.shading-components')}:{' '}
            {studyField?.shading_components || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={studyField.id} type={uploadableProjectFileTypes.other.studyField} />
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
