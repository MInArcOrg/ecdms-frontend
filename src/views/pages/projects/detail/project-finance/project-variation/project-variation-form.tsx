import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import { ProjectVariation } from 'src/types/project/project-finance';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface ProjectVariationFormProps {
  formik: FormikProps<ProjectVariation>;
  percentagetCalculator: (value: number) => number;
  amountCalculator: (value: number) => number;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ProjectVariationForm: React.FC<ProjectVariationFormProps> = ({
  formik,
  percentagetCalculator,
  amountCalculator,
  file,
  onFileChange
}) => {
  const { t: transl } = useTranslation();

  // Handle value change and update the corresponding field
  const handleValueChange = useCallback(
    (name: keyof ProjectVariation, value: number) => {
      if (name === 'amount') {
        // Update percentage when amount changes
        const calculatedPercentage = percentagetCalculator(value);
        formik.setFieldValue('percentage', calculatedPercentage);
      } else if (name === 'percentage') {
        // Update amount when percentage changes
        const calculatedAmount = amountCalculator(value);
        formik.setFieldValue('amount', calculatedAmount);
      }
    },
    [formik, percentagetCalculator, amountCalculator]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-variation.form.amount')}
          placeholder={transl('project.project-variation.form.amount')}
          name="amount"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange('amount', Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-variation.form.amount-percent')}
          placeholder={transl('project.project-variation.form.amount-percent')}
          name="percentage"
          size="small"
          type="number"
          onValueChange={(value: string | number) => handleValueChange('percentage', Number(value))}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.project-variation.form.approval-date')}
          name="approval_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="approval_date" />}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-variation.form.extension-time')}
          placeholder={transl('project.project-variation.form.extension-time')}
          name="extension_time"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-variation.form.justification')}
          placeholder={transl('project.project-variation.form.justification')}
          name="justification"
          multiline
          rows="4"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.project-variation.form.remark')}
          placeholder={transl('project.project-variation.form.remark')}
          name="remark"
          multiline
          rows="4"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default ProjectVariationForm;
