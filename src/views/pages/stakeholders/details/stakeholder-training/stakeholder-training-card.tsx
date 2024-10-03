import { Box, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderTraining } from 'src/types/stakeholder/stakeholder-training';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const StakeholderTrainingCard = ({
  stakeholderTraining,
  refetch,
  onEdit,
  onDelete
}: {
  stakeholderTraining: StakeholderTraining;
  refetch: () => void;
  onEdit: (stakeholderTraining: StakeholderTraining) => void;
  onDelete: (id: string) => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="primary">
            {stakeholderTraining.title}
          </Typography>
          {stakeholderTraining.type && <Chip label={stakeholderTraining.type} color="primary" variant="outlined" size="small" />}
        </Box>

        <Box mt={2}>
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-training.form.provider')}: {stakeholderTraining.provider}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Icon icon="mdi:calendar-blank" fontSize={20} color="action" />
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t('stakeholder.stakeholder-training.form.provision-date')}:{' '}
              {getDynamicDate(i18n, stakeholderTraining.provision_date as string).toDateString()}
            </Typography>
          </Box>
          {stakeholderTraining.quantity && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              {t('stakeholder.stakeholder-training.form.quantity')}: {stakeholderTraining.quantity}
            </Typography>
          )}
          {stakeholderTraining.description && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              {t('stakeholder.stakeholder-training.form.description')}: {stakeholderTraining.description}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Box display="flex" alignItems="center">
          <FileDrawer id={stakeholderTraining.id} type={uploadableProjectFileTypes.training} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ModelActionComponent
            model="Training"
            model_id={stakeholderTraining.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            title={stakeholderTraining.title}
            postAction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />

          <RowOptions
            onEdit={() => onEdit(stakeholderTraining)}
            onDelete={() => onDelete(stakeholderTraining.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'training'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'training'
            }}
            item={stakeholderTraining}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default StakeholderTrainingCard;
