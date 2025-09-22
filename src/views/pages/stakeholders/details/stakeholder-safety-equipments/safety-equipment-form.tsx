import { Grid } from "@mui/material";
import type { FormikProps } from "formik";
import type React from "react";
import { useTranslation } from "react-i18next";
import { gridSpacing } from "src/configs/app-constants";
import type { SafetyEquipment } from "src/types/stakeholder/stakeholder-safety-equipment";
import CustomTextBox from "src/views/shared/form/custom-text-box";

interface SafetyEquipmentFormProps {
  formik: FormikProps<SafetyEquipment>;
}

const SafetyEquipmentForm: React.FC<SafetyEquipmentFormProps> = ({
  formik,
}) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.serial-no")}
          name="serial_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.brand-name")}
          name="brand_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.model")}
          name="model"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.year")}
          name="year"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.capacity")}
          name="capacity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.purpose")}
          name="purpose"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.quantity")}
          name="quantity"
          size="small"
          sx={{ mb: 2 }}
          type="number"
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.current-situation")}
          name="current_situation"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.safety-equipment.location")}
          name="location"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default SafetyEquipmentForm;
