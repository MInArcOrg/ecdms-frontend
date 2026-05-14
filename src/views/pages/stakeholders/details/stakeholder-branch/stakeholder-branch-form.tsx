import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface BranchFormProps {
  formik: FormikProps<StakeholderBranch>;
}

const BranchForm: React.FC<BranchFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-branch.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t('stakeholder.stakeholder-branch.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-branch.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default BranchForm;
