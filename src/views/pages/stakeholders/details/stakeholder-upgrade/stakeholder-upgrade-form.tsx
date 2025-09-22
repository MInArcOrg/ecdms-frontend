import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderUpgrade } from "src/types/stakeholder/stakeholder-upgrade";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface UpgradeFormProps {
  formik: FormikProps<StakeholderUpgrade>;
}

const UpgradeForm: React.FC<UpgradeFormProps> = ({ formik }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-upgrade.form.upgrade-type")}
          name="upgrade_type"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-upgrade.form.previous-level")}
          name="previous_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-upgrade.form.upgraded-level")}
          name="upgraded_level"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-upgrade.form.ownership-percentage")}
          name="ownership_percentage"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t("stakeholder.stakeholder-upgrade.form.description")}
          name="description"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default UpgradeForm;
