import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { StakeholderMachinery } from "src/types/stakeholder/stakeholder-machinery"
import CustomTextBox from "src/views/shared/form/custom-text-box"


interface MachineryFormProps {
  formik: FormikProps<StakeholderMachinery>
}

const MachineryForm: React.FC<MachineryFormProps> = ({ formik }) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t("stakeholder.machinery.name")} name="name" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.plate-no")}
          name="plate_no"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.brand-name")}
          name="brand_name"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t("stakeholder.machinery.model")} name="model" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox fullWidth label={t("stakeholder.machinery.year")} name="year" size="small" sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.chassis-number")}
          name="chassis_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.engine-number")}
          name="engine_number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.capacity")}
          name="capacity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.purpose")}
          name="purpose"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.quantity")}
          name="quantity"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.current-situation")}
          name="current_situation"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomTextBox
          fullWidth
          label={t("stakeholder.machinery.location")}
          name="location"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  )
}

export default MachineryForm

