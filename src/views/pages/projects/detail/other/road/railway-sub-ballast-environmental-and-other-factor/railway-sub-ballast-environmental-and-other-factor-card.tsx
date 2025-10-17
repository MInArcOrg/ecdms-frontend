import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { RailwaySubBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySubBallastEnvironmentalAndOtherFactorCardProps {
  railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor;
  refetch: () => void;
  onEdit: (railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor) => void;
  onDelete: (id: string) => void;
  onDetail: (railwaySubBallastEnvironmentalAndOtherFactor: RailwaySubBallastEnvironmentalAndOtherFactor) => void;
}

const RailwaySubBallastEnvironmentalAndOtherFactorCard: React.FC<RailwaySubBallastEnvironmentalAndOtherFactorCardProps> = ({
  railwaySubBallastEnvironmentalAndOtherFactor,
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
              onClick={() => onDetail(railwaySubBallastEnvironmentalAndOtherFactor)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySubBallastEnvironmentalAndOtherFactor?.project_id?.toString().slice(0, 5)}
              ...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-environmental-and-other-factor.details.railway_line_section_name')}:{' '}
            {railwaySubBallastEnvironmentalAndOtherFactor.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_compliance_measures')}:{' '}
            {railwaySubBallastEnvironmentalAndOtherFactor.environmental_compliance_measures || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-environmental-and-other-factor.details.environmental_impact_assessment')}:{' '}
            {railwaySubBallastEnvironmentalAndOtherFactor.environmental_impact_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-sub-ballast-environmental-and-other-factor.details.remark')}:{' '}
            {railwaySubBallastEnvironmentalAndOtherFactor.remark || 'N/A'}
          </Typography>
          {railwaySubBallastEnvironmentalAndOtherFactor.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwaySubBallastEnvironmentalAndOtherFactor.created_at}
            </Typography>
          )}
          {railwaySubBallastEnvironmentalAndOtherFactor.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwaySubBallastEnvironmentalAndOtherFactor.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="RailwaySubBallastEnvironmentalAndOtherFactor"
          model_id={railwaySubBallastEnvironmentalAndOtherFactor.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastenvironmentalandotherfactor'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastenvironmentalandotherfactor'
          }}
          onEdit={() => onEdit(railwaySubBallastEnvironmentalAndOtherFactor)}
          onDelete={() => onDelete(railwaySubBallastEnvironmentalAndOtherFactor.id)}
          item={railwaySubBallastEnvironmentalAndOtherFactor}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySubBallastEnvironmentalAndOtherFactorCard;
