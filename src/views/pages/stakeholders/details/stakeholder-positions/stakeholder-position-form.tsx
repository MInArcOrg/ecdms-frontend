import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';

interface PositionFormProps {
  formik: FormikProps<StakeholderPosition>;
  departments: StakeholderDepartment[];
}

const PositionForm: React.FC<PositionFormProps> = ({ formik, departments }) => {
  const { t } = useTranslation();

  const departmentOptions = departments.map((department) => ({
    value: department.id,
    label: department.name
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.position.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholder.position.parent-department')}
          name="stakeholder_department_id"
          options={departmentOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.position.required-education')}
          name="required_education"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.position.required-work-experience')}
          name="required_work_experience"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.position.salary')} name="salary" size="small" sx={{ mb: 2 }} type="number" />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.position.no-of-professionals')}
          name="no_of_professionals"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.position.description')}
          name="description"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.position.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default PositionForm;
