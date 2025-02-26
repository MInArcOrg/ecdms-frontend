import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ManagerCardProps {
  manager: StakeholderManager;
  refetch: () => void;
  onEdit: (manager: StakeholderManager) => void;
  onDelete: (id: string) => void;
  onDetail: (manager: StakeholderManager) => void;
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(manager)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${manager.first_name} ${manager.last_name}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-manager.department')}: {manager.department}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-manager.position')}: {manager.position || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-manager.email')}: {manager.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-manager.phoneNo')}: {manager.phone_no}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderManager"
          model_id={manager?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholdermanager'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholdermanager'
          }}
          onEdit={() => onEdit(manager)}
          onDelete={() => onDelete(manager?.id || '')}
          item={manager}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default ManagerCard;
