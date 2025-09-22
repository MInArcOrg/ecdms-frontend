import { Grid } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { StakeholderCertificate } from "src/types/stakeholder/stakeholder-certificate";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";

interface StakeholderCertificateFormProps {
  formik: FormikProps<StakeholderCertificate>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const StakeholderCertificateForm: React.FC<StakeholderCertificateFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation();

  return (
    <Grid container spacing={3}>
      {/* Title Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.title")}
          placeholder={transl("stakeholder.stakeholder-certificate.form.title")}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Date of Issue */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.issue-date")}
          name="issue_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="issue_date" />}
        />
      </Grid>

      {/* Type Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.type")}
          placeholder={transl("stakeholder.stakeholder-certificate.form.type")}
          name="type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Scope Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.scope")}
          placeholder={transl("stakeholder.stakeholder-certificate.form.scope")}
          name="scope"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Certifying Body Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl(
            "stakeholder.stakeholder-certificate.form.certifying-body",
          )}
          placeholder={transl(
            "stakeholder.stakeholder-certificate.form.certifying_body",
          )}
          name="certifying_body"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Certification Number Field */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl(
            "stakeholder.stakeholder-certificate.form.certification-number",
          )}
          placeholder={transl(
            "stakeholder.stakeholder-certificate.form.certification_number",
          )}
          name="certification_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* Issue Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.issue-date")}
          name="issue_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="issue_date" />}
        />
      </Grid>

      {/* Expire Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={transl("stakeholder.stakeholder-certificate.form.expire-date")}
          name="expire_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="expire_date" />}
        />
      </Grid>

      {/* Remark */}
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          label={transl("stakeholder.stakeholder-certificate.form.remark")}
          placeholder={transl(
            "stakeholder.stakeholder-certificate.form.remark",
          )}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>

      {/* File Upload */}
      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("common.form.file-upload")}
          file={file}
          onFileChange={onFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default StakeholderCertificateForm;
