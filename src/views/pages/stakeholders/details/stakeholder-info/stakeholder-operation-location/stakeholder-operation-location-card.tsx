import { Box, Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderOperationLocation } from 'src/types/stakeholder/stakeholder-operation-location';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface StakeholderOperationLocationCardProps {
  stakeholderOperationLocation: StakeholderOperationLocation;
  refetch: () => void;
  onEdit: (stakeholderOperationLocation: StakeholderOperationLocation) => void;
  onDelete: (id: string) => void;
}

const StakeholderOperationLocationCard: React.FC<StakeholderOperationLocationCardProps> = ({
  stakeholderOperationLocation,
  refetch,
  onEdit,
  onDelete
}) => {
  const { t } = useTranslation();

  const renderCountry = () => (
    <Typography variant="body2" color="textSecondary">
      {t('stakeholder.stakeholder-operation-location.form.country')}: {stakeholderOperationLocation.country as string}
    </Typography>
  );

  const renderStatus = () => (
    <Typography variant="body2" color="textSecondary">
      {t('stakeholder.stakeholder-operation-location.form.status')}:{' '}
      {stakeholderOperationLocation.status ? t('common.active') : t('common.inactive')}
    </Typography>
  );

  return (
    <Card sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between">
        {/* Info Column */}
        <Box mt={2}>
          {stakeholderOperationLocation.country && renderCountry()}
          {typeof stakeholderOperationLocation.status === 'boolean' && renderStatus()}
        </Box>

        {/* Actions Column */}
        <Box display="flex" alignItems="center">
          <FileDrawer id={stakeholderOperationLocation.id} type={uploadableProjectFileTypes.stakeholderOperationLocation} />
          <ModelActionComponent
            model="StakeholderOperationLocation"
            model_id={stakeholderOperationLocation.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title={'stakeholder.stakeholder-operation-location.title'}
            postAction={() => {
              /* Handle post action */
            }}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderOperationLocation)}
            onDelete={() => onDelete(stakeholderOperationLocation.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'stakeholderoperationlocation'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'stakeholderoperationlocation'
            }}
            item={stakeholderOperationLocation}
            options={[]}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default StakeholderOperationLocationCard;
