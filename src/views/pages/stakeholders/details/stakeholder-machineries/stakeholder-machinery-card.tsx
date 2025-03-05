import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderMachinery } from 'src/types/stakeholder/stakeholder-machinery';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface MachineryCardProps {
  machinery: StakeholderMachinery;
  refetch: () => void;
  onEdit: (machinery: StakeholderMachinery) => void;
  onDelete: (id: string) => void;
  onDetail: (machinery: StakeholderMachinery) => void;
}

const MachineryCard: React.FC<MachineryCardProps> = ({ machinery, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(machinery)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {machinery.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.machinery.plate-no')}: {machinery.plate_no}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.machinery.brand-name')}: {machinery.brand_name || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.machinery.model')}: {machinery.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.machinery.year')}: {machinery.year || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.machinery.engine-number')}: {machinery.engine_number}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderMachinery"
          model_id={machinery?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholdermachinery'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholdermachinery'
          }}
          onEdit={() => onEdit(machinery)}
          onDelete={() => onDelete(machinery?.id || '')}
          item={machinery}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default MachineryCard;
