import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';

interface DepartmentFormProps {
  formik: FormikProps<StakeholderDepartment>;
  departments: StakeholderDepartment[];
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ formik, departments }) => {
  const { t } = useTranslation();
  const { touched, errors } = formik;
  console.log('formik errors', formik.errors)
  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name
  }));

  const showError = (fieldName: keyof StakeholderDepartment) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-department.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
          error={showError('name')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholder.stakeholder-department.parentDepartment')}
          name="parent_department_id"
          options={departmentOptions}
          size="small"
          sx={{ mb: 2 }}
          error={showError('parent_department_id')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t('stakeholder.stakeholder-department.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
          error={showError('description')}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-department.reference')}
          name="reference"
          size="small"
          sx={{ mb: 2 }}
          error={showError('reference')}
        />
      </Grid>
    </Grid>
  );
};

export default DepartmentForm;
