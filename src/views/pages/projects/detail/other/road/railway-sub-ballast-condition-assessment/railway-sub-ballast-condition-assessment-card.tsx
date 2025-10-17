import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySubBallastConditionAssessment } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';

interface RailwaySubBallastConditionAssessmentCardProps {
  railwaySubBallastConditionAssessment: RailwaySubBallastConditionAssessment;
  refetch: () => void;
  onEdit: (data: RailwaySubBallastConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwaySubBallastConditionAssessment) => void;
}

const RailwaySubBallastConditionAssessmentCard: React.FC<RailwaySubBallastConditionAssessmentCardProps> = ({
  railwaySubBallastConditionAssessment,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  const {
    id,
    project_id,
    railway_line_section_name,
    sub_ballast_material_type_id,
    inspection_dates,
    sub_ballast_condition_rating,
    cracking_observations,
    erosion_issues,
    unwanted_vegetation_presence,
    testing_frequency_per_year,
    sub_ballast_resistance,
    sub_ballast_degradation_rate,
    drainage_performance,
    remark,
    created_at
  } = railwaySubBallastConditionAssessment;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwaySubBallastConditionAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {id?.toString().slice(0, 8)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.project_id', 'Project ID')}: {project_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.railway_line_section_name', 'Section Name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_material_type_id', 'Material Type ID')}:{' '}
            {sub_ballast_material_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.inspection_dates', 'Inspection Dates')}:{' '}
            {inspection_dates ? formatDynamicDate(inspection_dates) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_condition_rating', 'Condition Rating')}:{' '}
            {sub_ballast_condition_rating || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.cracking_observations', 'Cracking Observations')}:{' '}
            {cracking_observations || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.erosion_issues', 'Erosion Issues')}:{' '}
            {erosion_issues || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.unwanted_vegetation_presence', 'Unwanted Vegetation')}:{' '}
            {unwanted_vegetation_presence || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.testing_frequency_per_year', 'Testing Frequency')}:{' '}
            {testing_frequency_per_year?.toLocaleString() ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_resistance', 'Sub-Ballast Resistance')}:{' '}
            {sub_ballast_resistance || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_degradation_rate', 'Degradation Rate')}:{' '}
            {sub_ballast_degradation_rate || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.drainage_performance', 'Drainage Performance')}:{' '}
            {drainage_performance || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-condition-assessment.details.remark', 'Remark')}: {remark ?? 'N/A'}
          </Typography>
          {created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at', 'Created At')}: {formatCreatedAt(created_at)}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastConditionAssessment"
          model_id={id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastconditionassessment'
          }}
          onEdit={() => onEdit(railwaySubBallastConditionAssessment)}
          onDelete={() => onDelete(id)}
          item={railwaySubBallastConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastConditionAssessmentCard;
