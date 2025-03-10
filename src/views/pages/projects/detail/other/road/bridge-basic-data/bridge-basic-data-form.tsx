import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { BridgeBasicData } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface BridgeBasicDataFormProps {
  formik: FormikProps<BridgeBasicData>
  file: File | null
  onFileChange: (file: File | null) => void
}

const BridgeBasicDataForm: React.FC<BridgeBasicDataFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.name")}
          placeholder={transl("project.other.bridge-basic-data.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.bridge-name")}
          placeholder={transl("project.other.bridge-basic-data.details.bridge-name")}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.bridge-number")}
          placeholder={transl("project.other.bridge-basic-data.details.bridge-number")}
          name="bridge_number"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.bridge-length")}
          placeholder={transl("project.other.bridge-basic-data.details.bridge-length")}
          name="bridge_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.bridge-width")}
          placeholder={transl("project.other.bridge-basic-data.details.bridge-width")}
          name="bridge_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.construction-year")}
          placeholder={transl("project.other.bridge-basic-data.details.construction-year")}
          name="construction_year"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.contractor")}
          placeholder={transl("project.other.bridge-basic-data.details.contractor")}
          name="contractor"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.designer")}
          placeholder={transl("project.other.bridge-basic-data.details.designer")}
          name="designer"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.bridge-cost")}
          placeholder={transl("project.other.bridge-basic-data.details.bridge-cost")}
          name="bridge_cost"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.land-capacity")}
          placeholder={transl("project.other.bridge-basic-data.details.land-capacity")}
          name="land_capacity"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-basic-data.details.average-daily-traffic")}
          placeholder={transl("project.other.bridge-basic-data.details.average-daily-traffic")}
          name="average_daily_traffic"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default BridgeBasicDataForm

