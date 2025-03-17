"use client"

import { Grid, FormControlLabel, Checkbox, Typography, Divider } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { SatelliteNetwork } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface SatelliteNetworkFormProps {
  formik: FormikProps<SatelliteNetwork>
  file: File | null
  onFileChange: (file: File | null) => void
}

const SatelliteNetworkForm: React.FC<SatelliteNetworkFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: satelliteNetworkTypes } = useQuery({
    queryKey: ["satellite-network-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.satelliteNetworkType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl("project.other.satellite-network.details.satellite-network-type")}
          placeholder={transl("project.other.satellite-network.details.satellite-network-type")}
          name="satellite_network_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            satelliteNetworkTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.satellite-network.network-components")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.satellite || false}
                  onChange={(e) => formik.setFieldValue("satellite", e.target.checked)}
                  name="satellite"
                />
              }
              label={transl("project.other.satellite-network.details.satellite")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.ground_stations || false}
                  onChange={(e) => formik.setFieldValue("ground_stations", e.target.checked)}
                  name="ground_stations"
                />
              }
              label={transl("project.other.satellite-network.details.ground-stations")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.modems || false}
                  onChange={(e) => formik.setFieldValue("modems", e.target.checked)}
                  name="modems"
                />
              }
              label={transl("project.other.satellite-network.details.modems")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.routers || false}
                  onChange={(e) => formik.setFieldValue("routers", e.target.checked)}
                  name="routers"
                />
              }
              label={transl("project.other.satellite-network.details.routers")}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.satellite-network.details.others")}
          placeholder={transl("project.other.satellite-network.details.others")}
          name="others"
          size="small"
          multiline
          rows={3}
          sx={{ mt: 2, mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default SatelliteNetworkForm

