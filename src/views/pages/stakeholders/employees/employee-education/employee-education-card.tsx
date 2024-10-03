import { Box, Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EmployeeEducation } from 'src/types/stakeholder/employee-education';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface EmployeeEducationCardProps {
  employeeEducation: EmployeeEducation;
  refetch: () => void;
  onEdit: (employeeEducation: EmployeeEducation) => void;
  onDelete: (id: string) => void;
}

const EmployeeEducationCard: React.FC<EmployeeEducationCardProps> = ({ employeeEducation, refetch, onEdit, onDelete }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 1 }}>
      <Box display="flex" justifyContent="space-between">
        {/* Info Column */}
        <Box mt={2}>
          <Typography variant="h6" fontWeight="bold">
            {t('stakeholder.employee-education.form.year')}: {new Date(employeeEducation.year).getFullYear()}
          </Typography>

          <Typography variant="body1">
            {t('stakeholder.employee-education.form.domain')}: {employeeEducation.domain}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.employee-education.form.department-name')}: {employeeEducation.department_name || t('common.none')}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.employee-education.form.nationality')}: {employeeEducation.nationality as string}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.employee-education.form.male')}: {employeeEducation.male}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.employee-education.form.female')}: {employeeEducation.female}
          </Typography>

          <Typography variant="body2">
            {t('stakeholder.employee-education.form.employee-educations')}: {employeeEducation.total_employees}
          </Typography>
        </Box>

        {/* Actions Column */}
        <Box display="flex" alignItems="center">
          <ModelActionComponent
            model="EmployeeEducation"
            model_id={employeeEducation.id}
            refetchModel={refetch}
            resubmit={() => {
              /* Handle resubmit action */
            }}
            title={t('stakeholder.employee-education.form.title')}
            postAction={() => {
              /* Handle post action */
            }}
          />

          <RowOptions
            onEdit={() => onEdit(employeeEducation)}
            onDelete={() => onDelete(employeeEducation.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'totalemployee'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'totalemployee'
            }}
            item={employeeEducation}
            options={[]}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default EmployeeEducationCard;
