import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface DepartmentCardProps {
  department: StakeholderDepartment;
  refetch: () => void;
  onEdit: (department: StakeholderDepartment) => void;
  onDelete: (id: string) => void;
  onDetail: (department: StakeholderDepartment) => void;
  departments: StakeholderDepartment[];
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department, refetch, onEdit, onDelete, onDetail, departments }) => {
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
              onClick={() => onDetail(department)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {department.name}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-department.parentDepartment')}: {getParentDepartmentName(department.parent_department_id || '')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-department.description')}: {department.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-department.reference')}: {department.reference || t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderDepartment"
          model_id={department?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderdepartment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderdepartment'
          }}
          onEdit={() => onEdit(department)}
          onDelete={() => onDelete(department?.id || '')}
          item={department}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default DepartmentCard;
