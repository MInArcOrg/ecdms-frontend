import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySystemConditionAssessment } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwaySystemConditionAssessmentCardProps {
  railwaySystemConditionAssessment: RailwaySystemConditionAssessment;
  refetch: () => void;
  onEdit: (systemConditionAssessment: RailwaySystemConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (systemConditionAssessment: RailwaySystemConditionAssessment) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwaySystemConditionAssessmentCard: React.FC<RailwaySystemConditionAssessmentCardProps> = ({
  railwaySystemConditionAssessment,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  otherSubMenu
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
              onClick={() => onDetail(railwaySystemConditionAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwaySystemConditionAssessment?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-system-condition-assessment.details.railway_line_section_name'
            )}
            :{' '}
            {railwaySystemConditionAssessment.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-system-condition-assessment.details.system_condition_rating_or_assessment'
            )}
            :{' '}
            {railwaySystemConditionAssessment.system_condition_rating_or_assessment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-system-condition-assessment.details.defect_presence'
            )}
            :{' '}
            {railwaySystemConditionAssessment.defect_presence ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-system-condition-assessment.details.system_performance_indicators'
            )}
            :{' '}
            {railwaySystemConditionAssessment.system_performance_indicators || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-system-condition-assessment.details.power_supply_systems_and_communication'
            )}
            :{' '}
            {railwaySystemConditionAssessment.power_supply_systems_and_communication || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-system-condition-assessment.details.remark')}:{' '}
            {railwaySystemConditionAssessment.remark || 'N/A'}
          </Typography>
          {railwaySystemConditionAssessment.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}:{' '}
              {railwaySystemConditionAssessment.created_at}
            </Typography>
          )}
          {railwaySystemConditionAssessment.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}:{' '}
              {railwaySystemConditionAssessment.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwaySystemConditionAssessment.id &&
          <FileDrawer
            id={railwaySystemConditionAssessment.id}
            type={otherSubMenu?.id || ""}
          />
        }

        {railwaySystemConditionAssessment.id && (
          <ModelAction
            model="RailwaySystemConditionAssessment"
            model_id={railwaySystemConditionAssessment.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysystemconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysystemconditionassessment'
          }}
          onEdit={() => onEdit(railwaySystemConditionAssessment)}
          onDelete={() => onDelete(railwaySystemConditionAssessment.id as string)}
          item={railwaySystemConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwaySystemConditionAssessmentCard;