"use client"

import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { Accessory } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomSwitch from "src/views/shared/form/custom-switch"

interface AccessoryFormProps {
  formik: FormikProps<Accessory>
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({ formik }) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.name")}
          placeholder={transl("project.other.accessory.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.under-passes")}
          placeholder={transl("project.other.accessory.details.under-passes")}
          name="under_passes"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.ramps")}
          placeholder={transl("project.other.accessory.details.ramps")}
          name="ramps"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.traffic-signals")}
          placeholder={transl("project.other.accessory.details.traffic-signals")}
          name="traffic_signals"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.repair-stations")}
          placeholder={transl("project.other.accessory.details.repair-stations")}
          name="repair_stations"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />


        <CustomSwitch
          label={transl("project.other.accessory.details.bicycle-lanes")}
          name="bicycle_lanes"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.accessory.details.bicycle-signals")}
          placeholder={transl("project.other.accessory.details.bicycle-signals")}
          name="bicycle_signals"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomSwitch label={transl("project.other.accessory.details.culvert")} name="culvert" sx={{ mb: 2 }} />
        <CustomSwitch label={transl("project.other.accessory.details.bridge")} name="bridge" sx={{ mb: 2 }} />
      </Grid>
    </Grid>
  )
}

export default AccessoryForm

