import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemConditionAssessment } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatDynamicDate } from 'src/utils/formatter/date';

interface RailwayFasteningSystemConditionAssessmentCardProps {
  railwayFasteningSystemConditionAssessment: RailwayFasteningSystemConditionAssessment;
  refetch: () => void;
  onEdit: (characteristic: RailwayFasteningSystemConditionAssessment) => void;
  onDelete: (id: string) => void;
  onDetail: (characteristic: RailwayFasteningSystemConditionAssessment) => void;
  otherSubMenu?: DetailSubMenuItemChild;
}

const RailwayFasteningSystemConditionAssessmentCard: React.FC<
  RailwayFasteningSystemConditionAssessmentCardProps
> = ({ railwayFasteningSystemConditionAssessment, refetch, onEdit, onDelete, onDetail, otherSubMenu }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(railwayFasteningSystemConditionAssessment)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayFasteningSystemConditionAssessment?.id?.toString().slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.railway_line_section_name')}:{' '}
            {railwayFasteningSystemConditionAssessment.railway_line_section_name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.inspection_date')}:{' '}
            {railwayFasteningSystemConditionAssessment.inspection_date
              ? formatDynamicDate(formatDynamicDate(railwayFasteningSystemConditionAssessment.inspection_date))
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-fastening-system-condition-assessment.details.fastening_system_condition_rating'
            )}
            :{' '}
            {railwayFasteningSystemConditionAssessment.fastening_system_condition_rating || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.defect_presence')}:{' '}
            {railwayFasteningSystemConditionAssessment.defect_presence || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-fastening-system-condition-assessment.details.fastening_system_stability_and_alignment'
            )}
            :{' '}
            {railwayFasteningSystemConditionAssessment.fastening_system_stability_and_alignment || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_model_number')}:{' '}
            {railwayFasteningSystemConditionAssessment.rail_fastening_model_number || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_needed_quantity')}:{' '}
            {railwayFasteningSystemConditionAssessment.rail_fastening_needed_quantity?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(
              'project.other.railway-fastening-system-condition-assessment.details.rail_fastening_expected_lifespan'
            )}
            :{' '}
            {railwayFasteningSystemConditionAssessment.rail_fastening_expected_lifespan?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_availability')}:{' '}
            {typeof railwayFasteningSystemConditionAssessment.rail_fastening_availability === 'boolean'
              ? (railwayFasteningSystemConditionAssessment.rail_fastening_availability ? t('common.options.yes') : t('common.options.no'))
              : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-fastening-system-condition-assessment.details.remark')}:{' '}
            {railwayFasteningSystemConditionAssessment.remark || 'N/A'}
          </Typography>
          {railwayFasteningSystemConditionAssessment.created_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.created-at')}: {railwayFasteningSystemConditionAssessment.created_at}
            </Typography>
          )}
          {railwayFasteningSystemConditionAssessment.updated_at && (
            <Typography variant="body2" color="text.secondary">
              {t('common.table-columns.updated-at')}: {railwayFasteningSystemConditionAssessment.updated_at}
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {railwayFasteningSystemConditionAssessment.id && otherSubMenu?.fileType && (
          <FileDrawer id={railwayFasteningSystemConditionAssessment.id} type={otherSubMenu.fileType} />
        )}

        {railwayFasteningSystemConditionAssessment.id && (
          <ModelAction
            model="RailwayFasteningSystemConditionAssessment"
            model_id={railwayFasteningSystemConditionAssessment.id}
            refetchModel={refetch}
            resubmit={refetch}
            title=""
            postAction={refetch}
          />
        )}
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayfasteningsystemconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayfasteningsystemconditionassessment'
          }}
          onEdit={() => onEdit(railwayFasteningSystemConditionAssessment)}
          onDelete={() => onDelete(railwayFasteningSystemConditionAssessment.id as string)}
          item={railwayFasteningSystemConditionAssessment}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default RailwayFasteningSystemConditionAssessmentCard;