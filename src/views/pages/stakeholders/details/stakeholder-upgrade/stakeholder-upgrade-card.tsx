import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderUpgrade } from 'src/types/stakeholder/stakeholder-upgrade';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface UpgradeCardProps {
  upgrade: StakeholderUpgrade;
  refetch: () => void;
  onEdit: (upgrade: StakeholderUpgrade) => void;
  onDelete: (id: string) => void;
  onDetail: (upgrade: StakeholderUpgrade) => void;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(upgrade)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${upgrade.stakeholder_id}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-upgrade.form.upgrade-type')}: {upgrade.upgrade_type_id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-upgrade.form.previous-level')}: {upgrade.previous_level || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-upgrade.form.upgraded-level')}: {upgrade.upgraded_level || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-upgrade.form.ownership-percentage')}: {upgrade.ownership_percentage ?? 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-upgrade.form.description')}: {upgrade.description || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderUpgrade"
          model_id={upgrade?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'upgrade'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'upgrade'
          }}
          onEdit={() => onEdit(upgrade)}
          onDelete={() => onDelete(upgrade?.id || '')}
          item={upgrade}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default UpgradeCard;
