import { Box, Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TotalEmployee } from 'src/types/stakeholder/total-employee';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TotalEmployeeCardProps {
  totalEmployee: TotalEmployee;
  refetch: () => void;
  onEdit: (totalEmployee: TotalEmployee) => void;
  onDelete: (id: string) => void;
}

const TotalEmployeeCard: React.FC<TotalEmployeeCardProps> = ({ totalEmployee, refetch, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 1 }}>
      <Box display="flex" justifyContent="space-between">
        {/* Info Column */}
        <Box mt={2}>
          <Typography variant="h6" fontWeight="bold">
            {t('stakeholder.total-employee.form.year')}: {new Date(totalEmployee.year).getFullYear()}
          </Typography>

          <Typography variant="body1">
            {t('stakeholder.total-employee.form.domain')}: {totalEmployee.domain}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.total-employee.form.department-name')}: {totalEmployee.department_name || t('common.none')}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.total-employee.form.nationality')}: {totalEmployee.nationality as string}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.total-employee.form.male')}: {totalEmployee.male}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.total-employee.form.female')}: {totalEmployee.female}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.total-employee.form.total-employees')}: {totalEmployee.total_employees}
          </Typography>
        </Box>

        {/* Actions Column */}
        <Box display="flex" alignItems="center">
          <ModelActionComponent
            model="TotalEmployee"
            model_id={totalEmployee.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title={t('stakeholder.total-employee.form.title')}
            postAction={() => {
              /* Handle post action */
            }}
          />

          <RowOptions
            onEdit={() => onEdit(totalEmployee)}
            onDelete={() => onDelete(totalEmployee.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'totalemployee'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'totalemployee'
            }}
            item={totalEmployee}
            options={[]}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default TotalEmployeeCard;
