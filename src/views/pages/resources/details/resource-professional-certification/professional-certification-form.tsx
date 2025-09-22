import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { ProfessionalCertification } from "src/types/resource";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomDatePicker from "src/views/shared/form/custom-date-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface CertificationFormProps {
  formik: FormikProps<ProfessionalCertification>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const CertificationForm: React.FC<CertificationFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.certification.certificate-title")}
          name="certificate_title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.certification.certification-type")}
          name="certification_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.certification.certifying-body")}
          name="certifying_body"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          fullWidth
          label={t("resources.professional.certification.issue-date")}
          name="issue_date"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          fullWidth
          label={t("resources.professional.certification.expire-date")}
          name="expire_date"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.certification.certification-number")}
          name="certification_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.certification.certification-scope")}
          name="certification_scope"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          label={t("resources.professional.certification.remark")}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomFileUpload
          label={t("common.form.file-upload")}
          file={file}
          onFileChange={onFileChange}
        />
      </Grid>
    </Grid>
  );
};

export default CertificationForm;
