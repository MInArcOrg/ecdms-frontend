import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderBranchAddress } from 'src/types/stakeholder/stakeholder-branch-address';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BranchAddressCardProps {
  branchAddress: StakeholderBranchAddress;
  refetch: () => void;
  onEdit: (branchAddress: StakeholderBranchAddress) => void;
  onDelete: (id: string) => void;
  onDetail: (branchAddress: StakeholderBranchAddress) => void;
  stakeholderBranches: StakeholderBranch[];
}

const BranchAddressCard: React.FC<BranchAddressCardProps> = ({
  branchAddress,
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
              onClick={() => onDetail(branchAddress)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {getBranchName(branchAddress.stakeholder_branch_id)}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-address.country')}: {branchAddress.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-address.region')}: {branchAddress.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-address.city')}: {branchAddress.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-address.subcity')}: {branchAddress.subcity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-branch-address.woreda')}: {branchAddress.woreda}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderBranchAddress"
          model_id={branchAddress?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderbranchaddress'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderbranchaddress'
          }}
          onEdit={() => onEdit(branchAddress)}
          onDelete={() => onDelete(branchAddress?.id || '')}
          item={branchAddress}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BranchAddressCard;
