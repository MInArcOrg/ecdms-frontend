import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { BusinessFields } from 'src/types/general/general-master';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface BranchCardProps {
  branch: StakeholderBranch;
  refetch: () => void;
  onEdit: (branch: StakeholderBranch) => void;
  onDelete: (id: string) => void;
  onDetail: (branch: StakeholderBranch) => void;
  businessFields: BusinessFields[];
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, refetch, onEdit, onDelete, onDetail, businessFields }) => {
  const { t } = useTranslation();

  const getBusinessFieldTitle = (id: string) => {
    const field = businessFields.find((f) => f.id === id);
    return field ? field.title : 'N/A';
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(branch)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {branch.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranch.tinNumber')}: {branch.tin_number || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranch.businessFieldId')}: {getBusinessFieldTitle(branch.business_field_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholderBranch.description')}: {branch.description || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderBranch"
          model_id={branch?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderbranch'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderbranch'
          }}
          onEdit={() => onEdit(branch)}
          onDelete={() => onDelete(branch?.id || '')}
          item={branch}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default BranchCard;
