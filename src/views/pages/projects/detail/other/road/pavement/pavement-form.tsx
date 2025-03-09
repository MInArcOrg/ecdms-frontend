import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { Pavement } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import roadLengthTypeMasterService from "src/services/general/project/road-length-type-master-service"

import { useQuery } from "@tanstack/react-query"

interface PavementFormProps {
  formik: FormikProps<Pavement>
  file: File | null
  onFileChange: (file: File | null) => void
}

const PavementForm: React.FC<PavementFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: roadLengthTypes } = useQuery({
    queryKey: ["masterCategory", "roadLengthType"],
    queryFn: () => roadLengthTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.name")}
          placeholder={transl("project.other.pavement.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.tangent-length")}
          placeholder={transl("project.other.pavement.details.tangent-length")}
          name="tangent_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.curve-length")}
          placeholder={transl("project.other.pavement.details.curve-length")}
          name="curve_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="road_length_type_id"
          label={transl("project.other.pavement.details.road-length-type-id")}
          placeholder={transl("project.other.pavement.details.road-length-type-id")}
          options={
            roadLengthTypes?.payload?.map((roadLengthType) => ({
              value: roadLengthType.id,
              label: roadLengthType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.road-pavement-thickness")}
          placeholder={transl("project.other.pavement.details.road-pavement-thickness")}
          name="road_pavement_thickness"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.paved-road-surface-width")}
          placeholder={transl("project.other.pavement.details.paved-road-surface-width")}
          name="paved_road_surface_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default PavementForm

