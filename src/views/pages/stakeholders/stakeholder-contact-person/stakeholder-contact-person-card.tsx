import { Box, Card, CardActions, CardContent, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';

const StakeholderContactPersonCard = ({
  stakeholderContactPerson,
  refetch,
  onEdit,
  onDelete
}: {
  stakeholderContactPerson: StakeholderContactPerson;
  refetch: () => void;
  onEdit: (stakeholderContactPerson: StakeholderContactPerson) => void;
  onDelete: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" gap={4} alignItems="center">
          <Avatar alt={stakeholderContactPerson?.full_name} sx={{ width: 55, height: 55 }} />
          <Box>
            <Typography variant="subtitle1">
              {t('stakeholder.stakeholder-contact-person.form.name')} : {stakeholderContactPerson?.full_name}
            </Typography>
            <Typography variant="subtitle2">
              {t('stakeholder.stakeholder-contact-person.form.phone-number')} : {stakeholderContactPerson?.phone_number}
            </Typography>
            <Typography variant="subtitle2">
              {t('stakeholder.stakeholder-contact-person.form.email')} : {stakeholderContactPerson?.email}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <FileDrawer id={stakeholderContactPerson.id} type={uploadableProjectFileTypes.stakeholderContactPerson} />
          <ModelActionComponent
            model="Certificate"
            model_id={stakeholderContactPerson.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            title={''}
            postAction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderContactPerson)}
            onDelete={() => onDelete(stakeholderContactPerson.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'stakeholdercontactpeople'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'stakeholdercontactpeople'
            }}
            item={stakeholderContactPerson}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default StakeholderContactPersonCard;
