import React from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import type { StakeholderUpgrade } from 'src/types/stakeholder/stakeholder-upgrade';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomDatePicker from 'src/views/shared/form/custom-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';

interface UpgradeFormProps {
  formik: FormikProps<StakeholderUpgrade>;
}

const UpgradeForm: React.FC<UpgradeFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-upgrade.upgradeType')} name="upgrade_type" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-upgrade.previousLevel')} name="previous_level" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-upgrade.upgradedLevel')} name="upgraded_level" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('stakeholder.stakeholder-upgrade.ownershipPercentage')} name="ownership_percentage" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth multiline rows={4} label={t('stakeholder.stakeholder-upgrade.description')} name="description" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default UpgradeForm;
