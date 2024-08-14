import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { institutionType } from 'src/constants/bond-constants';
import { ProjectBond } from 'src/types/project/project-finance';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomSelect from 'src/views/shared/form/custom-select';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectBondFormProps {
  formik: FormikProps<ProjectBond>;
  percentagetCalculator: (value: number) => number;
  amountCalculator: (value: number) => number;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectBondForm: React.FC<ProjectBondFormProps> = ({ formik, percentagetCalculator, amountCalculator, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  // Handle value change and update the corresponding field
  const handleValueChange = useCallback(
    (name: keyof ProjectBond, value: number) => {
      if (name === 'amount') {
        // Update percentage when amount changes
        const calculatedPercentage = percentagetCalculator(value);
        formik.setFieldValue('percent', calculatedPercentage);
      } else if (name === 'percent') {
        // Update amount when percentage changes
        const calculatedAmount = amountCalculator(value);
        formik.setFieldValue('amount', calculatedAmount);
      }
    },
    [formik, percentagetCalculator, amountCalculator]
  );

  const institutionOptions = Object.values(institutionType).map((type) => ({
    value: type.value,
    label: type.name
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <CustomSelect
          size="small"
          name="institution_type"
          label={transl('project.project-bond.form.institution-type')}
          options={institutionOptions}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.amount')}
          placeholder={transl('project.project-bond.form.amount')}
          name="amount"
          size="small"
          type="number"
          value={formik.values.amount}
          onValueChange={(value: string | number) => handleValueChange('amount', Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.amount-percent')}
          placeholder={transl('project.project-bond.form.amount-percent')}
          name="percent"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange('percent', Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-bond.form.issue-date')}
          name="issue_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="issue_date" />}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-bond.form.expiration-date')}
          name="expiration_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="expiration_date" />}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.issuing-institute')}
          placeholder={transl('project.project-bond.form.issuing-institute')}
          name="issuing_institute"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.institute-branch')}
          placeholder={transl('project.project-bond.form.institute-branch')}
          name="institute_branch"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.branch-address')}
          placeholder={transl('project.project-bond.form.branch-address')}
          name="branch_address"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput name="phone" size="small" label={transl('project.project-bond.form.phone')} />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-bond.form.remark')}
          placeholder={transl('project.project-bond.form.remark')}
          name="remark"
          multiline
          rows={2}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectBondForm;
