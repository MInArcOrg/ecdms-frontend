import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { ProfessionalWorkExperience } from "src/types/resource";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomDatePicker from "src/views/shared/form/custom-date-box";
import CustomFileUpload from "src/views/shared/form/custome-file-selector";

interface ExperienceFormProps {
  formik: FormikProps<ProfessionalWorkExperience>;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
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
          label={t("resources.professional.work-experience.company-name")}
          name="company_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.work-experience.position")}
          name="position"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("resources.professional.work-experience.department")}
          name="department"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={3}
          label={t("resources.professional.work-experience.task-description")}
          name="task_description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          fullWidth
          label={t("resources.professional.work-experience.start-date")}
          name="start_date"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomDatePicker
          fullWidth
          label={t("resources.professional.work-experience.end-date")}
          name="end_date"
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

export default ExperienceForm;
