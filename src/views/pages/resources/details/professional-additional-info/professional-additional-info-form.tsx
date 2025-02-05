import { Grid } from '@mui/material';
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { ProfessionalAdditionalInfo } from "src/types/resource"
import CustomTextBox from "src/views/shared/form/custom-text-box"

interface AdditionalInfoFormProps {
  formik: FormikProps<ProfessionalAdditionalInfo>
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ formik }) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("professional.additional-info.information")}
          name="additional_information"
          size="small"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={t("professional.additional-info.reference")}
          name="reference"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  )
}

export default AdditionalInfoForm

