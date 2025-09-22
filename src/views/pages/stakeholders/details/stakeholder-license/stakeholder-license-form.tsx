import React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FormikProps } from "formik";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderLicense } from "src/types/stakeholder/stakeholder-license";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomDynamicDatePicker from "src/views/shared/form/custom-dynamic-date-box";

interface LicenseFormProps {
  formik: FormikProps<StakeholderLicense>;
}

const LicenseForm: React.FC<LicenseFormProps> = ({ formik }) => {
  const { t } = useTranslation();
  console.log("formik.errors", formik.errors);
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-license.form.license-type")}
          name="license_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-license.form.license-category")}
          name="license_category"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-license.form.license-name")}
          name="license_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-license.form.license-scope")}
          name="license_scope"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          multiline
          rows={3}
          fullWidth
          label={t("stakeholder.stakeholder-license.form.licensing-body")}
          name="licensing_body"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-license.form.license-number")}
          name="license_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      {/* Issue Date */}
      <Grid item xs={12}>
        <CustomDynamicDatePicker
          fullWidth
          label={t("stakeholder.stakeholder-certificate.form.issue-date")}
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
          label={t("stakeholder.stakeholder-certificate.form.expire-date")}
          name="expire_date"
          required
          showYearDropdown
          showMonthDropdown
          customInput={<CustomTextBox name="expire_date" />}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          label={t("stakeholder.stakeholder-license.form.remark")}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default LicenseForm;
