import type React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { BusinessFields } from 'src/types/general/general-master';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';

interface BranchFormProps {
  formik: FormikProps<StakeholderBranch>;
  businessFields: BusinessFields[];
}

const BranchForm: React.FC<BranchFormProps> = ({ formik, businessFields }) => {
  const { t } = useTranslation();

  const businessFieldOptions = businessFields.map((field) => ({
    value: field.id,
    label: field.title
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholderBranch.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholderBranch.tinNumber')} name="tin_number" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('stakeholderBranch.businessFieldId')}
          name="business_field_id"
          options={businessFieldOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t('stakeholderBranch.description')}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholderBranch.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default BranchForm;
