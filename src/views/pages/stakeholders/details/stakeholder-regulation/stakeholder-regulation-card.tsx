import { Box, Card, CardActions, CardContent, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderRegulation } from 'src/types/stakeholder/stakeholder-regulation';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';

const StakeholderRegulationCard = ({
  stakeholderRegulation,
  refetch,
  onEdit,
  onDelete
}: {
  stakeholderRegulation: StakeholderRegulation;
  refetch: () => void;
  onEdit: (stakeholderRegulation: StakeholderRegulation) => void;
  onDelete: (id: string) => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="primary">
            {stakeholderRegulation.title}
          </Typography>
          {stakeholderRegulation.revision_no && (
            <Chip label={`${t('revision')} ${stakeholderRegulation.revision_no}`} color="primary" variant="outlined" size="small" />
          )}
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-regulation.form.prepared-by')}: {stakeholderRegulation.prepared_by}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Icon icon="mdi:calendar-blank" fontSize={20} color="action" />
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t('stakeholder.stakeholder-regulation.form.effective_start_date')}:{' '}
              {getDynamicDate(i18n, stakeholderRegulation.effective_start_date as string).toDateString()}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={1}>
            <Icon icon="mdi:calendar-check" fontSize={20} color="action" />
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t('stakeholder.stakeholder-regulation.form.effective_end_date')}:{' '}
              {getDynamicDate(i18n, stakeholderRegulation.effective_end_date as string).toDateString()}
            </Typography>
          </Box>
          {stakeholderRegulation.description && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              {t('stakeholder.stakeholder-regulation.form.description')}: {stakeholderRegulation.description}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Box display="flex" alignItems="center">
          <FileDrawer id={stakeholderRegulation.id} type={uploadableProjectFileTypes.regulation} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ModelActionComponent
            model="Regulation"
            model_id={stakeholderRegulation.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title={stakeholderRegulation.title}
            postAction={() => {}}
          />

          <RowOptions
            onEdit={() => onEdit(stakeholderRegulation)}
            onDelete={() => onDelete(stakeholderRegulation.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'regulation'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'regulation'
            }}
            item={stakeholderRegulation}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default StakeholderRegulationCard;
