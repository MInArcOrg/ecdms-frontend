import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import CustomTextBox from 'src/views/shared/form/custom-text-box';
import CustomFileUpload from 'src/views/shared/form/custome-file-selector';
import CustomDynamicDatePicker from 'src/views/shared/form/custom-dynamic-date-box';

interface StakeholderCertificateFormProps {
  formik: FormikProps<StakeholderCertificate>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderCertificateForm: React.FC<StakeholderCertificateFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Title Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.title')}
          placeholder={transl('stakeholder.stakeholder-certificate.form.title')}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Certificate Number Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.certificate_no')}
          placeholder={transl('stakeholder.stakeholder-certificate.form.certificate_no')}
          name="certificate_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Date of Issue */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.date_of_issue')}
          name="date_of_issue"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="issue_date" />}
        />
      </Grid>

      {/* Expiry Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.expiry_date')}
          name="expiry_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="expiry_date" />}
        />
      </Grid>

      {/* Initial Certificate Number */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.initial_certificate_no')}
          placeholder={transl('stakeholder.stakeholder-certificate.form.initial_certificate_no')}
          name="initial_certificate_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Initial Certificate Issue Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.initial_certificate_issue_date')}
          name="initial_certificate_issue_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="initial_certificate_issue_date" />}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl('stakeholder.stakeholder-certificate.form.description')}
          placeholder={transl('stakeholder.stakeholder-certificate.form.description')}
          name="description"
          multiline
          rows="4"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload label={transl('common.form.file-upload')} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  );
};

export default StakeholderCertificateForm;
