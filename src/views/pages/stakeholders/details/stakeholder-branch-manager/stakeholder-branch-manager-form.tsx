import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';

interface BranchManagerFormProps {
  formik: FormikProps<StakeholderBranchManager>;
  stakeholderBranches: StakeholderBranch[];
}

const BranchManagerForm: React.FC<BranchManagerFormProps> = ({ formik, stakeholderBranches }) => {
  const { t } = useTranslation();

  const branchOptions = stakeholderBranches.map((branch) => ({
    value: branch.id,
    label: branch.name
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.branch')}
          name="stakeholder_branch_id"
          options={branchOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.department')}
          name="department"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-branch-manager.position')} name="position" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.firstName')}
          name="first_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.middleName')}
          name="middle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.lastName')}
          name="last_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox label={t('stakeholder.stakeholder-branch-manager.gender')} name="gender" options={genderList(t)} sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={t('stakeholder.stakeholder-branch-manager.phone')}
          name="phone"
          size="small"
          sx={{ mb: 2 }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-branch-manager.email')} name="email" type='email' size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default BranchManagerForm;
