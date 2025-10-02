// src/views/project/project-contact-person-form.tsx
import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { ProjectContactPerson } from "src/types/project/projext-contact-person";
import type { Stakeholder } from "src/types/stakeholder";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import { genderList } from "src/configs/app-constants";

interface ProjectContactPersonFormProps {
  formik: FormikProps<ProjectContactPerson>;
  stakeholders: Stakeholder[];
}

const ProjectContactPersonForm: React.FC<ProjectContactPersonFormProps> = ({
  formik,
  stakeholders,
}) => {
  const { t } = useTranslation();

  const stakeholderOptions = stakeholders.map((stakeholder) => ({
    value: stakeholder.id,
    label: stakeholder.trade_name,
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t("project.project-contact-person.form.stakeholder")}
          name="stakeholder_id"
          options={stakeholderOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.firstName")}
          name="first_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.middleName")}
          name="middle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.lastName")}
          name="last_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.position")}
          name="position"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.department")}
          name="department"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.nationalIdNo")}
          name="national_id_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox
          label={t("project.project-contact-person.form.gender")}
          name="gender"
          options={genderList(t)}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={t("project.project-contact-person.form.phone")}
          name="phone"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("project.project-contact-person.form.email")}
          name="email"
          type="email"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default ProjectContactPersonForm;
