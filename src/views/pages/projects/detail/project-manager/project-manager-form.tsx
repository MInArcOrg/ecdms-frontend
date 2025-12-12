import { Grid } from '@mui/material';
import type { FormikProps } from 'formik';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import type { ProjectManager } from 'src/types/project/project-manager';
import type { Stakeholder } from 'src/types/stakeholder';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import { genderList } from 'src/configs/app-constants';

interface ManagerFormProps {
  formik: FormikProps<ProjectManager>;
  stakeholders: Stakeholder[];
}

const ManagerForm: React.FC<ManagerFormProps> = ({ formik, stakeholders }) => {
  const { t } = useTranslation();

  const stakeholderOptions = stakeholders.map((stakeholder) => ({
    value: stakeholder.id,
    label: stakeholder.trade_name
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t('project.other.project-manager.stakeholder')}
          name="stakeholder_id"
          options={stakeholderOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('project.other.project-manager.firstName')} name="first_name"
          formatAsName={true} size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('project.other.project-manager.middleName')} name="middle_name"
          formatAsName={true} size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('project.other.project-manager.lastName')} name="last_name"
          formatAsName={true} size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox fullWidth label={t('project.other.project-manager.position')} name="position" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t('project.other.project-manager.nationalIdNo')}
          name="national_id_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox label={t('project.other.project-manager.gender')} name="gender" options={genderList(t)} />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput fullWidth label={t('project.other.project-manager.phone')} name="phone" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox fullWidth label={t('project.other.project-manager.email')} name="email" type="email" size="small" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  );
};

export default ManagerForm;
