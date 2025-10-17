import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySleeperConditionAssessment } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySleeperConditionAssessmentCardProps {
  railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment;
  refetch: () => void;
  onEdit: (railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (railwaySleeperConditionAssessment: RailwaySleeperConditionAssessment) => void;
}

const RailwaySleeperConditionAssessmentCard: React.FC<RailwaySleeperConditionAssessmentCardProps> = ({
  railwaySleeperConditionAssessment,
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
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySleeperConditionAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySleeperConditionAssessment?.project_id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.railway_line_section_name')}:{' '}
            {railwaySleeperConditionAssessment.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.inspection_dates')}:{' '}
            {railwaySleeperConditionAssessment.inspection_dates
              ? formatDynamicDate(railwaySleeperConditionAssessment.inspection_dates)
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.sleeper_condition_rating')}:{' '}
            {railwaySleeperConditionAssessment.sleeper_condition_rating || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.defect_presence')}:{' '}
            {railwaySleeperConditionAssessment.defect_presence || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.sleeper_stability_and_alignment')}:{' '}
            {railwaySleeperConditionAssessment.sleeper_stability_and_alignment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.sleepers_required_number')}:{' '}
            {railwaySleeperConditionAssessment.sleepers_required_number != null
              ? railwaySleeperConditionAssessment.sleepers_required_number.toLocaleString()
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.supplier_name')}:{' '}
            {railwaySleeperConditionAssessment.supplier_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.supplier_phone')}:{' '}
            {railwaySleeperConditionAssessment.supplier_phone || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sleeper-condition-assessment.details.remark')}: {railwaySleeperConditionAssessment.remark || 'N/A'}
          </Typography>
          {railwaySleeperConditionAssessment.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySleeperConditionAssessment.created_at}
            </Typography>
          )}
          {railwaySleeperConditionAssessment.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySleeperConditionAssessment.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySleeperConditionAssessment"
          model_id={railwaySleeperConditionAssessment.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysleeperconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysleeperconditionassessment'
          }}
          onEdit={() => onEdit(railwaySleeperConditionAssessment)}
          onDelete={() => onDelete(railwaySleeperConditionAssessment.id)}
          item={railwaySleeperConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySleeperConditionAssessmentCard;
