import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { CulvertRoadOverInformation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import guardRailTypeMasterService from "src/services/general/project/guard-rail-type-master-service"

import { useQuery } from "@tanstack/react-query"

interface CulvertRoadOverInformationFormProps {
  formik: FormikProps<CulvertRoadOverInformation>
  file: File | null
  onFileChange: (file: File | null) => void
}

const CulvertRoadOverInformationForm: React.FC<CulvertRoadOverInformationFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: guardRailTypes } = useQuery({
    queryKey: ["masterCategory", "guardRailType"],
    queryFn: () => guardRailTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.name")}
          placeholder={transl("project.other.culvert-road-over-information.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.carriage-way-width")}
          placeholder={transl("project.other.culvert-road-over-information.details.carriage-way-width")}
          name="carriage_way_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.side-walk-width")}
          placeholder={transl("project.other.culvert-road-over-information.details.side-walk-width")}
          name="side_walk_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.lane-number")}
          placeholder={transl("project.other.culvert-road-over-information.details.lane-number")}
          name="lane_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.head-wall-to-head-wall")}
          placeholder={transl("project.other.culvert-road-over-information.details.head-wall-to-head-wall")}
          name="head_wall_to_head_wall"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.average-fill-height")}
          placeholder={transl("project.other.culvert-road-over-information.details.average-fill-height")}
          name="average_fill_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="guard_rail_type_id"
          label={transl("project.other.culvert-road-over-information.details.guard-rail-type-id")}
          placeholder={transl("project.other.culvert-road-over-information.details.guard-rail-type-id")}
          options={
            guardRailTypes?.payload?.map((guardRailType) => ({
              value: guardRailType.id,
              label: guardRailType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-road-over-information.details.parapet-length")}
          placeholder={transl("project.other.culvert-road-over-information.details.parapet-length")}
          name="parapet_length"
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

export default CulvertRoadOverInformationForm

