"use client"

import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { RoadMaintenanceData } from "src/types/project/other"
import CustomDatePicker from "src/views/shared/form/custom-date-box"
import CustomTextArea from "src/views/shared/form/custom-text-box"
import CustomTextBox from "src/views/shared/form/custom-text-box"

interface RoadMaintenanceDataFormProps {
  formik: FormikProps<RoadMaintenanceData>
}

const RoadMaintenanceDataForm: React.FC<RoadMaintenanceDataFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-data.details.road-segment")}
          placeholder={transl("project.other.road-maintenance-data.details.road-segment")}
          name="road_segment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomDatePicker
          fullWidth
          label={transl("project.other.road-maintenance-data.details.maintenance-start-date")}
          placeholder={transl("project.other.road-maintenance-data.details.maintenance-start-date")}
          name="maintenance_start_date"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomDatePicker
          fullWidth
          label={transl("project.other.road-maintenance-data.details.maintenance-end-date")}
          placeholder={transl("project.other.road-maintenance-data.details.maintenance-end-date")}
          name="maintenance_end_date"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-data.details.weather-condition")}
          placeholder={transl("project.other.road-maintenance-data.details.weather-condition")}
          name="weather_condition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-data.details.pavement-condition")}
          placeholder={transl("project.other.road-maintenance-data.details.pavement-condition")}
          name="pavement_condition"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl("project.other.road-maintenance-data.details.remark")}
          placeholder={transl("project.other.road-maintenance-data.details.remark")}
          name="remark"
          size="small"
          sx={{ mb: 2 }}
          rows={3}
        />
      </Grid>
    </Grid>
  )
}

export default RoadMaintenanceDataForm

