import { Grid, FormControlLabel, Switch } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { CulvertBasicData } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"

interface CulvertBasicDataFormProps {
  formik: FormikProps<CulvertBasicData>
}

const CulvertBasicDataForm: React.FC<CulvertBasicDataFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation()

  const { data: areaTopographies } = useQuery({
    queryKey: ["area-topographies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.areaTopography.model },
      }),
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
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-coordinate-x")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-coordinate-x")}
          name="culvert_coordinate_x"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.culvert-coordinate-y")}
          placeholder={transl("project.other.culvert-basic-data.details.culvert-coordinate-y")}
          name="culvert_coordinate_y"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.culvert-basic-data.details.area-topography-id")}
          placeholder={transl("project.other.culvert-basic-data.details.area-topography-id")}
          name="area_topography_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            areaTopographies?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.highest-water-level")}
          placeholder={transl("project.other.culvert-basic-data.details.highest-water-level")}
          name="highest_water_level"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.lowest-water-level")}
          placeholder={transl("project.other.culvert-basic-data.details.lowest-water-level")}
          name="lowest_water_level"
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-basic-data.details.construction-year")}
          placeholder={transl("project.other.culvert-basic-data.details.construction-year")}
          name="construction_year"
          type="number"
          size="small"
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
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formik.values.detour_possibility || false}
              onChange={(e) => formik.setFieldValue("detour_possibility", e.target.checked)}
              name="detour_possibility"
            />
          }
          label={transl("project.other.culvert-basic-data.details.detour-possibility")}
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
          type="number"
          size="small"
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  )
}

export default CulvertBasicDataForm
