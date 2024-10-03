import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StudyPeriodCost } from 'src/types/stakeholder/other';
import { formatCurrency } from 'src/utils/formatter/currency';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface StudyPeriodCostCardProps {
  studyPeriodCost: StudyPeriodCost;
  refetch: () => void;
  onEdit: (studyPeriodCost: StudyPeriodCost) => void;
  onDelete: (id: string) => void;
  onDetail: (studyPeriodCost: StudyPeriodCost) => void;
}

const StudyPeriodCostCard: React.FC<StudyPeriodCostCardProps> = ({ studyPeriodCost, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(studyPeriodCost)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {studyPeriodCost.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-period-cost.details.study-field')}:{' '}
            {studyPeriodCost.stakeholderstudyfield?.studyfield?.title || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-period-cost.details.description')}: {studyPeriodCost.description || 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-period-cost.details.total-month')}: {studyPeriodCost.total_month || 'N/A'} months
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.study-period-cost.details.study-cost')}: {formatCurrency(studyPeriodCost.study_cost) || 'N/A'}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {studyPeriodCost.created_at ? formatCreatedAt(studyPeriodCost.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={studyPeriodCost.id} type={uploadableStakeholderFileTypes.other.studyPeriodCost} />
        <ModelAction
          model="StudyPeriodCost"
          model_id={studyPeriodCost.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(studyPeriodCost)}
          onDelete={() => onDelete(studyPeriodCost.id)}
          item={studyPeriodCost}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default StudyPeriodCostCard;
