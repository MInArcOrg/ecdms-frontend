import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TelecomInfrastructure } from 'src/types/project/other';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';

interface TelecomInfrastructureFormProps {
  formik: FormikProps<TelecomInfrastructure>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const TelecomInfrastructureForm: React.FC<TelecomInfrastructureFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.name')}
          placeholder={transl('project.other.telecom-infrastructure.form.name')}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.specifications')}
          placeholder={transl('project.other.telecom-infrastructure.form.specifications')}
          name="specifications"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.coverage-area')}
          placeholder={transl('project.other.telecom-infrastructure.form.coverage-area')}
          name="coverage_area"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.no-of-families-coverage')}
          placeholder={transl('project.other.telecom-infrastructure.form.no-of-families-coverage')}
          name="no_of_families_coverage"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.service-period')}
          name="service_period"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="service_period" />}
        />
        <CustomDynamicDatePicker
          fullWidth
          label={transl('project.other.telecom-infrastructure.form.inauguration-date')}
          name="inauguration_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="inauguration_date" />}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default TelecomInfrastructureForm;
