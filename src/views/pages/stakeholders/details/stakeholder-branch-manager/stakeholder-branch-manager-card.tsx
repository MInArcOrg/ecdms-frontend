import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BranchManagerCardProps {
  branchManager: StakeholderBranchManager;
  refetch: () => void;
  onEdit: (branchManager: StakeholderBranchManager) => void;
  onDelete: (id: string) => void;
  onDetail: (branchManager: StakeholderBranchManager) => void;
  stakeholderBranches: StakeholderBranch[];
}

const BranchManagerCard: React.FC<BranchManagerCardProps> = ({
  branchManager,
  refetch,
  onEdit,
  onDelete,
  onDetail,
  stakeholderBranches
}) => {
  const { t } = useTranslation();

  const getBranchName = (id: string) => {
    const branch = stakeholderBranches.find((b) => b.id === id);
    return branch ? branch.name : 'N/A';
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(branchManager)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${branchManager.first_name} ${branchManager.last_name}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-manager.position')}: {branchManager.position}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-manager.department')}: {branchManager.department}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-manager.branch')}: {getBranchName(branchManager.stakeholder_branch_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-manager.phone')}: {branchManager.phone}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderBranchManager"
          model_id={branchManager?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderbranchmanager'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderbranchmanager'
          }}
          onEdit={() => onEdit(branchManager)}
          onDelete={() => onDelete(branchManager?.id || '')}
          item={branchManager}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BranchManagerCard;
