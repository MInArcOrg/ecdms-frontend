import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwayBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayBallastEnvironmentalAndOtherFactorCardProps {
  railwayBallastEnvironmentalAndOtherFactor: RailwayBallastEnvironmentalAndOtherFactor;
  refetch: () => void;
  onEdit: (data: RailwayBallastEnvironmentalAndOtherFactor) => void;
  onDelete: (id: string) => void;
  onDetail: (data: RailwayBallastEnvironmentalAndOtherFactor) => void;
}

const RailwayBallastEnvironmentalAndOtherFactorCard: React.FC<RailwayBallastEnvironmentalAndOtherFactorCardProps> = ({
  railwayBallastEnvironmentalAndOtherFactor,
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
    environmental_compliance_measures,
    environmental_impact_assessment,
    remark
  } = railwayBallastEnvironmentalAndOtherFactor;

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayBallastEnvironmentalAndOtherFactor)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {project_id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-environmental-and-other-factor.details.railway-line-section-name')}:{' '}
            {railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-compliance-measures')}:{' '}
            {environmental_compliance_measures || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-impact-assessment')}:{' '}
            {environmental_impact_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-ballast-environmental-and-other-factor.details.remark')}: {remark ?? 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwayBallastEnvironmentalAndOtherFactor"
          model_id={project_id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballastenvironmentalandotherfactor'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballastenvironmentalandotherfactor'
          }}
          onEdit={() => onEdit(railwayBallastEnvironmentalAndOtherFactor)}
          onDelete={() => onDelete(id)}
          item={railwayBallastEnvironmentalAndOtherFactor}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayBallastEnvironmentalAndOtherFactorCard;