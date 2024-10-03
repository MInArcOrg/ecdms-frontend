import { Box, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

const StakeholderCertificateCard = ({
  stakeholderCertificate,
  refetch,
  onEdit,
  onDelete
}: {
  stakeholderCertificate: StakeholderCertificate;
  refetch: () => void;
  onEdit: (stakeholderCertificate: StakeholderCertificate) => void;
  onDelete: (id: string) => void;
}) => {
  const { t, i18n } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="primary">
            {stakeholderCertificate.title}
          </Typography>
          {stakeholderCertificate.description && (
            <Chip label={stakeholderCertificate.certificate_no} color="primary" variant="outlined" size="small" />
          )}
        </Box>

        <Box mt={2} display="flex" alignItems="center">
          <Icon icon="mdi:calendar-blank" fontSize={20} color="action" />
          {stakeholderCertificate.date_of_issue && (
            <Typography variant="body2" color="textSecondary" ml={1} mr={3}>
              {t('stakeholder.stakeholder-certificate.form.date_of_issue')}:{' '}
              {getDynamicDate(i18n, stakeholderCertificate?.date_of_issue as string).toDateString()}
            </Typography>
          )}
          {stakeholderCertificate.expiry_date && (
            <Typography variant="body2" color="textSecondary">
              {t('stakeholder.stakeholder-certificate.form.expiry_date')}:{' '}
              {getDynamicDate(i18n, stakeholderCertificate?.expiry_date as string).toDateString()}
            </Typography>
          )}
        </Box>
      </CardContent>

      <CardActions>
        <Box display="flex" alignItems="center">
          <FileDrawer id={stakeholderCertificate.id} type={uploadableProjectFileTypes.certificate} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ModelActionComponent
            model="Certificate"
            model_id={stakeholderCertificate.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            title={stakeholderCertificate.title}
            postAction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />

          <RowOptions
            onEdit={() => onEdit(stakeholderCertificate)}
            onDelete={() => onDelete(stakeholderCertificate.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'certificate'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'certificate'
            }}
            item={stakeholderCertificate}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default StakeholderCertificateCard;
