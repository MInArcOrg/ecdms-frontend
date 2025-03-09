import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { CulvertStructuralInformation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import pierTypeMasterService from "src/services/general/project/pier-type-master-service"
import abutmentTypeMasterService from "src/services/general/project/abutment-type-master-service"
import endwallTypeInletMasterService from "src/services/general/project/endwall-type-inlet-master-service"
import endwallTypeOutletMasterService from "src/services/general/project/endwall-type-outlet-master-service"
import pavedWaterWayTypeMasterService from "src/services/general/project/paved-water-way-type-master-service"
import soilTypeMasterService from "src/services/general/project/soil-type-master-service"

import { useQuery } from "@tanstack/react-query"

interface CulvertStructuralInformationFormProps {
  formik: FormikProps<CulvertStructuralInformation>
  file: File | null
  onFileChange: (file: File | null) => void
}

const CulvertStructuralInformationForm: React.FC<CulvertStructuralInformationFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: pierTypes } = useQuery({
    queryKey: ["masterCategory", "pierType"],
    queryFn: () => pierTypeMasterService.getAll({}),
  })

  const { data: abutmentTypes } = useQuery({
    queryKey: ["masterCategory", "abutmentType"],
    queryFn: () => abutmentTypeMasterService.getAll({}),
  })

  const { data: endwallTypeOutlet } = useQuery({
    queryKey: ["masterCategory", "endwall-type-outlet"],
    queryFn: () => endwallTypeOutletMasterService.getAll({}),
  })

  const { data: endwallTypeInlet } = useQuery({
    queryKey: ["masterCategory", "endwall-type-inlet"],
    queryFn: () => endwallTypeInletMasterService.getAll({}),
  })

  const { data: pavedWaterWayTypes } = useQuery({
    queryKey: ["masterCategory", "pavedWaterWayType"],
    queryFn: () => pavedWaterWayTypeMasterService.getAll({}),
  })

  const { data: soilTypes } = useQuery({
    queryKey: ["masterCategory", "soilType"],
    queryFn: () => soilTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.name")}
          placeholder={transl("project.other.culvert-structural-information.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.culvert-type")}
          placeholder={transl("project.other.culvert-structural-information.details.culvert-type")}
          name="culvert_type"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.culvert-barrel-length")}
          placeholder={transl("project.other.culvert-structural-information.details.culvert-barrel-length")}
          name="culvert_barrel_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.culvert-height")}
          placeholder={transl("project.other.culvert-structural-information.details.culvert-height")}
          name="culvert_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.opening-number")}
          placeholder={transl("project.other.culvert-structural-information.details.opening-number")}
          name="opening_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.opening-width")}
          placeholder={transl("project.other.culvert-structural-information.details.opening-width")}
          name="opening_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.total-culvert-width")}
          placeholder={transl("project.other.culvert-structural-information.details.total-culvert-width")}
          name="total_culvert_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.distance-between-barrels")}
          placeholder={transl("project.other.culvert-structural-information.details.distance-between-barrels")}
          name="distance_between_barrels"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.head-wall-length")}
          placeholder={transl("project.other.culvert-structural-information.details.head-wall-length")}
          name="head_wall_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="pier_type_id"
          label={transl("project.other.culvert-structural-information.details.pier-type-id")}
          placeholder={transl("project.other.culvert-structural-information.details.pier-type-id")}
          options={
            pierTypes?.payload?.map((pierType) => ({
              value: pierType.id,
              label: pierType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.pier-height")}
          placeholder={transl("project.other.culvert-structural-information.details.pier-height")}
          name="pier_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="abutment_type_id"
          label={transl("project.other.culvert-structural-information.details.abutment-type-id")}
          placeholder={transl("project.other.culvert-structural-information.details.abutment-type-id")}
          options={
            abutmentTypes?.payload?.map((abutmentType) => ({
              value: abutmentType.id,
              label: abutmentType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.abutment-average-height")}
          placeholder={transl("project.other.culvert-structural-information.details.abutment-average-height")}
          name="abutment_average_height"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="endwall_type_inlet_id"
          label={transl("project.other.culvert-structural-information.details.endwall-type-inlet-id")}
          placeholder={transl("project.other.culvert-structural-information.details.endwall-type-inlet-id")}
          options={
            endwallTypeInlet?.payload?.map((endwallTypeInlet) => ({
              value: endwallTypeInlet.id,
              label: endwallTypeInlet.title,
            })) || []
          }
        />
        <CustomSelectBox
          size="small"
          name="endwall_type_outlet_id"
          label={transl("project.other.culvert-structural-information.details.endwall-type-outlet-id")}
          placeholder={transl("project.other.culvert-structural-information.details.endwall-type-outlet-id")}
          options={
            endwallTypeOutlet?.payload?.map((endwallTypeOutlet) => ({
              value: endwallTypeOutlet.id,
              label: endwallTypeOutlet.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.culvert-structural-information.details.wingwall-average-length")}
          placeholder={transl("project.other.culvert-structural-information.details.wingwall-average-length")}
          name="wingwall_average_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="paved_water_way_type_id"
          label={transl("project.other.culvert-structural-information.details.paved-water-way-type-id")}
          placeholder={transl("project.other.culvert-structural-information.details.paved-water-way-type-id")}
          options={
            pavedWaterWayTypes?.payload?.map((pavedWaterWayType) => ({
              value: pavedWaterWayType.id,
              label: pavedWaterWayType.title,
            })) || []
          }
        />
        <CustomSelectBox
          size="small"
          name="soil_type_id"
          label={transl("project.other.culvert-structural-information.details.soil-type-id")}
          placeholder={transl("project.other.culvert-structural-information.details.soil-type-id")}
          options={
            soilTypes?.payload?.map((soilType) => ({
              value: soilType.id,
              label: soilType.title,
            })) || []
          }
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default CulvertStructuralInformationForm

