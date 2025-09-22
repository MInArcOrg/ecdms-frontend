import type React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FormikProps } from "formik";
import { gridSpacing } from "src/configs/app-constants";
import type { BranchAdditionalInformation } from "src/types/stakeholder/branch-additional-information";
import type { StakeholderBranch } from "src/types/stakeholder/stakeholder-branch";
import CustomTextBox from "src/views/shared/form/custom-text-box";
import CustomSelect from "src/views/shared/form/custom-select";

interface AdditionalInformationFormProps {
  formik: FormikProps<BranchAdditionalInformation>;
  stakeholderBranches: StakeholderBranch[];
}

const AdditionalInformationForm: React.FC<AdditionalInformationFormProps> = ({
  formik,
  stakeholderBranches,
}) => {
  const { t } = useTranslation();
  const { touched, errors } = formik;

  const branchOptions = stakeholderBranches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

  const showError = (fieldName: keyof BranchAdditionalInformation) => {
    return touched[fieldName] && errors[fieldName];
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={t("stakeholder.branch-additional-information.branch")}
          name="stakeholder_branch_id"
          options={branchOptions}
          size="small"
          sx={{ mb: 2 }}
          error={showError("stakeholder_branch_id")}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t(
            "stakeholder.branch-additional-information.additionalInformation",
          )}
          name="additional_information"
          size="small"
          sx={{ mb: 2 }}
          error={showError("additional_information")}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.branch-additional-information.reference")}
          name="reference"
          size="small"
          sx={{ mb: 2 }}
          error={showError("reference")}
        />
      </Grid>
    </Grid>
  );
};

export default AdditionalInformationForm;
