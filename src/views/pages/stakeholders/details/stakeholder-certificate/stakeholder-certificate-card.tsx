import { Box, Chip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Icon from 'src/@core/components/icon';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { getDynamicDate } from 'src/views/components/custom/ethio-calendar/ethio-calendar-utils';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';

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
    <SharedItemViewCard
      createdAt={stakeholderCertificate.created_at}
      t={t}
      actions={
        <>
          <FileDrawer id={stakeholderCertificate.id} type={uploadableProjectFileTypes.certificate} />
          <ModelActionComponent
            model="Certificate"
            model_id={stakeholderCertificate.id}
            refetchModel={refetch}
            resubmit={() => { }}
            title={stakeholderCertificate.title}
            postAction={() => { }}
          />
          <RowOptions
            onEdit={() => onEdit(stakeholderCertificate)}
            onDelete={() => onDelete(stakeholderCertificate.id)}
            editPermissionRule={{
              action: 'update',
              subject: 'certificate'
            }}
            deletePermissionRule={{
              action: 'delete',
              subject: 'certificate'
            }}
            item={stakeholderCertificate}
            options={[]}
          />
        </>
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold" color="primary">
          {stakeholderCertificate.title}
        </Typography>
        {stakeholderCertificate.certification_number && (
          <Chip label={stakeholderCertificate.certification_number} color="primary" variant="outlined" size="small" />
        )}
      </Box>
      <Box mt={2} display="flex" flexDirection="column" gap={1}>
        <Box display="flex" alignItems="center">
          <Icon icon="mdi:calendar-blank" fontSize={20} color="action" />
          {stakeholderCertificate.issue_date && (
            <Typography variant="body2" color="textSecondary" ml={1} mr={3}>
              {t('stakeholder.stakeholder-certificate.form.issue-date')}: {getDynamicDate(i18n, stakeholderCertificate?.issue_date as string).toDateString()}
            </Typography>
          )}
          {stakeholderCertificate.expire_date && (
            <Typography variant="body2" color="textSecondary">
              {t('stakeholder.stakeholder-certificate.form.expire-date')}: {getDynamicDate(i18n, stakeholderCertificate?.expire_date as string).toDateString()}
            </Typography>
          )}
        </Box>
        {stakeholderCertificate.type && (
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-certificate.form.type')}: {stakeholderCertificate.type}
          </Typography>
        )}
        {stakeholderCertificate.scope && (
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-certificate.form.scope')}: {stakeholderCertificate.scope}
          </Typography>
        )}
        {stakeholderCertificate.certifying_body && (
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-certificate.form.certifying-body')}: {stakeholderCertificate.certifying_body}
          </Typography>
        )}
        {stakeholderCertificate.remark && (
          <Typography variant="body2" color="textSecondary">
            {t('stakeholder.stakeholder-certificate.form.remark')}: {stakeholderCertificate.remark}
          </Typography>
        )}
      </Box>
    </SharedItemViewCard>
  );
};

export default StakeholderCertificateCard;
