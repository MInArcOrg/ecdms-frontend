import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface JointVentureFormProps {
  formik: FormikProps<JointVenture>;
}

const JointVentureForm: React.FC<JointVentureFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('jointVenture.name')} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t('jointVenture.memberCompaniesNo')}
          name="member_companies_no"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('jointVenture.description')} name="description" multiline rows={4} size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('jointVenture.reference')} name="reference" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default JointVentureForm;
