import { Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { Pavement } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"

interface PavementFormProps {
  formik: FormikProps<Pavement>
}

const PavementForm: React.FC<PavementFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation()

  const { data: roadLengthTypes } = useQuery({
    queryKey: ["road-length-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.roadLengthType.model },
      }),
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
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.curve-length")}
          placeholder={transl("project.other.pavement.details.curve-length")}
          name="curve_length"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.pavement.details.road-length-type-id")}
          placeholder={transl("project.other.pavement.details.road-length-type-id")}
          name="road_length_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            roadLengthTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.road-pavement-thickness")}
          placeholder={transl("project.other.pavement.details.road-pavement-thickness")}
          name="road_pavement_thickness"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.pavement.details.paved-road-surface-width")}
          placeholder={transl("project.other.pavement.details.paved-road-surface-width")}
          name="paved_road_surface_width"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  )
}

export default PavementForm

