import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { CulvertBasicData } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomSwitch from "src/views/shared/form/custom-switch"
import areaTopographyMasterService from "src/services/general/project/area-topography-master-service"

import { useQuery } from "@tanstack/react-query"

interface CulvertBasicDataFormProps {
  formik: FormikProps<CulvertBasicData>
  file: File | null
  onFileChange: (file: File | null) => void
}

const CulvertBasicDataForm: React.FC<CulvertBasicDataFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: areaTopographies } = useQuery({
    queryKey: ["masterCategory", "areaTopography"],
    queryFn: () => areaTopographyMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.name")}
          placeholder={transl("project.other.culvert-basic-data.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-name")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-name")}
          name="culvert_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-number")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-number")}
          name="culvert_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-coordinate-x")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-coordinate-x")}
          name="culvert_coordinate_x"
          size="small"
          type="number"
          step="0.000001"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-coordinate-y")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-coordinate-y")}
          name="culvert_coordinate_y"
          size="small"
          type="number"
          step="0.000001"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="area_topography_id"
          label={transl("project.other.culvert-basic-data.details.area-topography-id")}
          placeholder={transl("project.other.culvert-basic-data.details.area-topography-id")}
          options={
            areaTopographies?.payload?.map((areaTopography) => ({
              value: areaTopography.id,
              label: areaTopography.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.highest-water-level")}
          placeholder={transl("project.other.culvert-basic-data.details.highest-water-level")}
          name="highest_water_level"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.lowest-water-level")}
          placeholder={transl("project.other.culvert-basic-data.details.lowest-water-level")}
          name="lowest_water_level"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.construction-year")}
          placeholder={transl("project.other.culvert-basic-data.details.construction-year")}
          name="construction_year"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.contractor")}
          placeholder={transl("project.other.culvert-basic-data.details.contractor")}
          name="contractor"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.designer")}
          placeholder={transl("project.other.culvert-basic-data.details.designer")}
          name="designer"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-cost")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-cost")}
          name="culvert_cost"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl("project.other.culvert-basic-data.details.detour-possibility")}
          name="detour_possibility"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.road-alignment")}
          placeholder={transl("project.other.culvert-basic-data.details.road-alignment")}
          name="road_alignment"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.altitude")}
          placeholder={transl("project.other.culvert-basic-data.details.altitude")}
          name="altitude"
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

export default CulvertBasicDataForm

