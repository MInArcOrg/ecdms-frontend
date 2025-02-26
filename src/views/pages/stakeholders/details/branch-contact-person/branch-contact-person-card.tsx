import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderBranchContactPerson } from 'src/types/stakeholder/branch-contact-person';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BranchContactPersonCardProps {
  branchContactPerson: StakeholderBranchContactPerson;
  refetch: () => void;
  onEdit: (branchContactPerson: StakeholderBranchContactPerson) => void;
  onDelete: (id: string) => void;
  onDetail: (branchContactPerson: StakeholderBranchContactPerson) => void;
  stakeholderBranches: StakeholderBranch[];
}

const BranchContactPersonCard: React.FC<BranchContactPersonCardProps> = ({
  branchContactPerson,
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
              onClick={() => onDetail(branchContactPerson)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {`${branchContactPerson.first_name} ${branchContactPerson.last_name}`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranchContactPerson.position')}: {branchContactPerson.position}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranchContactPerson.department')}: {branchContactPerson.department}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranchContactPerson.branch')}: {getBranchName(branchContactPerson.stakeholder_branch_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranchContactPerson.phone')}: {branchContactPerson.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranchContactPerson.email')}: {branchContactPerson.email || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderBranchContactPerson"
          model_id={branchContactPerson?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderbranchcontactperson'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderbranchcontactperson'
          }}
          onEdit={() => onEdit(branchContactPerson)}
          onDelete={() => onDelete(branchContactPerson?.id || '')}
          item={branchContactPerson}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BranchContactPersonCard;
