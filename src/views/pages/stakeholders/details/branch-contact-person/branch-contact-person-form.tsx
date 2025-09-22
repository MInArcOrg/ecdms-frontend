import type React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FormikProps } from "formik";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderBranchContactPerson } from "src/types/stakeholder/branch-contact-person";
import type { StakeholderBranch } from "src/types/stakeholder/stakeholder-branch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSelect from "src/views/shared/form/custom-select";
import CustomPhoneInput from "src/views/shared/form/custom-phone-box";
import CustomRadioBox from "src/views/shared/form/custom-radio-box";
import { genderList } from "src/configs/app-constants";

interface BranchContactPersonFormProps {
  formik: FormikProps<StakeholderBranchContactPerson>;
  stakeholderBranches: StakeholderBranch[];
}

const BranchContactPersonForm: React.FC<BranchContactPersonFormProps> = ({
  formik,
  stakeholderBranches,
}) => {
  const { t } = useTranslation();

  const branchOptions = stakeholderBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.branch")}
          name="stakeholder_branch_id"
          options={branchOptions}
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.department")}
          name="department"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.position")}
          name="position"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.firstName")}
          name="first_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.middleName")}
          name="middle_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.lastName")}
          name="last_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomRadioBox
          label={t("stakeholder.stakeholder-branch-contact-person.gender")}
          name="gender"
          options={genderList(t)}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomPhoneInput
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.phone")}
          name="phone"
          size="small"
          sx={{ mb: 2 }}
          required
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-branch-contact-person.email")}
          name="email"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default BranchContactPersonForm;
