import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface PositionCardProps {
  position: StakeholderPosition;
  refetch: () => void;
  onEdit: (position: StakeholderPosition) => void;
  onDelete: (id: string) => void;
  onDetail: (position: StakeholderPosition) => void;
  departments: StakeholderDepartment[];
}

const PositionCard: React.FC<PositionCardProps> = ({ position, refetch, onEdit, onDelete, onDetail, departments }) => {
  const { t } = useTranslation();

  const getParentDepartmentName = (id: string) => {
    const parentDepartment = departments.find((d) => d.id === id);
    return parentDepartment ? parentDepartment.name : 'N/A';
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(position)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {position.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.parent-department')}: {getParentDepartmentName(position.stakeholder_department_id)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.required-education')}: {position.required_education || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.required-work-experience')}: {position.required_work_experience || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.salary')}: {position.salary || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.no-of-professionals')}: {position.no_of_professionals || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.description')}: {position.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.position.reference')}: {position.reference || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderPosition"
          model_id={position?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderposition'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderposition'
          }}
          onEdit={() => onEdit(position)}
          onDelete={() => onDelete(position?.id || '')}
          item={position}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default PositionCard;
