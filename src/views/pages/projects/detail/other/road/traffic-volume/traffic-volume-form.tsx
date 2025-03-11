import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { TrafficVolume } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomDateTimePicker from "src/views/shared/form/custom-date-box"
import countTypeMasterService from "src/services/general/project/count-type-master-service"

import { useQuery } from "@tanstack/react-query"

interface TrafficVolumeFormProps {
  formik: FormikProps<TrafficVolume>
  file: File | null
  onFileChange: (file: File | null) => void
}

const TrafficVolumeForm: React.FC<TrafficVolumeFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: countTypes } = useQuery({
    queryKey: ["masterCategory", "countType"],
    queryFn: () => countTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.name")}
          placeholder={transl("project.other.traffic-volume.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="count_type_id"
          label={transl("project.other.traffic-volume.details.count-type-id")}
          placeholder={transl("project.other.traffic-volume.details.count-type-id")}
          options={
            countTypes?.payload?.map((type) => ({
              value: type.id,
              label: type.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.count-location-coordinate-x")}
          placeholder={transl("project.other.traffic-volume.details.count-location-coordinate-x")}
          name="count_location_coordinate_x"
          size="small"
          type="number"
          step="0.000001"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.count-location-coordinate-y")}
          placeholder={transl("project.other.traffic-volume.details.count-location-coordinate-y")}
          name="count_location_coordinate_y"
          size="small"
          type="number"
          step="0.000001"
          sx={{ mb: 2 }}
        />

        <CustomDateTimePicker
          label={transl("project.other.traffic-volume.details.count-time")}
          name="count_time"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.lane-number")}
          placeholder={transl("project.other.traffic-volume.details.lane-number")}
          name="lane_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.vehicle-number-per-hour")}
          placeholder={transl("project.other.traffic-volume.details.vehicle-number-per-hour")}
          name="vehicle_number_per_hour"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.average-daily-traffic-volume")}
          placeholder={transl("project.other.traffic-volume.details.average-daily-traffic-volume")}
          name="average_daily_traffic_volume"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.traffic-volume.details.corridor-importance-level")}
          placeholder={transl("project.other.traffic-volume.details.corridor-importance-level")}
          name="corridor_importance_level"
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

export default TrafficVolumeForm

