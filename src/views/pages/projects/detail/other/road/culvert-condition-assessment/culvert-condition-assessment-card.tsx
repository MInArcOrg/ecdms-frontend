'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { CulvertConditionAssessment } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CulvertConditionAssessmentCardProps {
  culvertConditionAssessment: CulvertConditionAssessment;
  refetch: () => void;
  onEdit: (culvertConditionAssessment: CulvertConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (culvertConditionAssessment: CulvertConditionAssessment) => void;
}

const CulvertConditionAssessmentCard: React.FC<CulvertConditionAssessmentCardProps> = ({
  culvertConditionAssessment,
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
              onClick={() => onDetail(culvertConditionAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {culvertConditionAssessment?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-condition-assessment.details.name')}: {culvertConditionAssessment?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-condition-assessment.details.culvert-basic-data-id')}: {culvertConditionAssessment?.culvertBasicData?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-condition-assessment.details.structure-type-id')}:{' '}
            {culvertConditionAssessment?.structureType?.title || culvertConditionAssessment?.structure_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-condition-assessment.details.assessment-date')}:{' '}
            {culvertConditionAssessment?.assessment_date ? formatDynamicDate(culvertConditionAssessment.assessment_date) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="CulvertConditionAssessment"
          model_id={culvertConditionAssessment.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'culvertconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertconditionassessment'
          }}
          onEdit={() => onEdit(culvertConditionAssessment)}
          onDelete={() => onDelete(culvertConditionAssessment.id)}
          item={culvertConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default CulvertConditionAssessmentCard;

