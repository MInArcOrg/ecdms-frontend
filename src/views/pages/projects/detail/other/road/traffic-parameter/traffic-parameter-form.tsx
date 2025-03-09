import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { TrafficParameter } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomSwitch from "src/views/shared/form/custom-switch"
import pedestrianFacilityMasterService from "src/services/general/project/pedestrian-facility-master-service"

import { useQuery } from "@tanstack/react-query"

interface TrafficParameterFormProps {
  formik: FormikProps<TrafficParameter>
  file: File | null
  onFileChange: (file: File | null) => void
}

const TrafficParameterForm: React.FC<TrafficParameterFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: pedestrianFacilities } = useQuery({
    queryKey: ["masterCategory", "pedestrianFacility"],
    queryFn: () => pedestrianFacilityMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-parameter.details.name")}
          placeholder={transl("project.other.traffic-parameter.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="pedestrian_facility_id"
          label={transl("project.other.traffic-parameter.details.pedestrian-facility-id")}
          placeholder={transl("project.other.traffic-parameter.details.pedestrian-facility-id")}
          options={
            pedestrianFacilities?.payload?.map((pedestrianFacility) => ({
              value: pedestrianFacility.id,
              label: pedestrianFacility.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-parameter.details.parking")}
          placeholder={transl("project.other.traffic-parameter.details.parking")}
          name="parking"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-parameter.details.design-traffic-flow")}
          placeholder={transl("project.other.traffic-parameter.details.design-traffic-flow")}
          name="design_traffic_flow"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-parameter.details.design-speed")}
          placeholder={transl("project.other.traffic-parameter.details.design-speed")}
          name="design_speed"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomSwitch
          label={transl("project.other.traffic-parameter.details.similar-for-all")}
          name="similar_for_all"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default TrafficParameterForm

