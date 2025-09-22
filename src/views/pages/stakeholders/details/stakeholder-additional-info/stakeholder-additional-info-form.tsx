import type React from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { FormikProps } from "formik";
import { gridSpacing } from "src/configs/app-constants";
import type { StakeholderAdditionalInformation } from "src/types/stakeholder/stakeholder-additional-information";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface AdditionalInformationFormProps {
  formik: FormikProps<StakeholderAdditionalInformation>;
}

const AdditionalInformationForm: React.FC<AdditionalInformationFormProps> = ({
  formik,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          multiline
          rows={4}
          label={t(
            "stakeholder.stakeholder-additional-information.additionalInformation",
          )}
          name="additional_information"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.stakeholder-additional-information.reference")}
          name="reference"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default AdditionalInformationForm;
