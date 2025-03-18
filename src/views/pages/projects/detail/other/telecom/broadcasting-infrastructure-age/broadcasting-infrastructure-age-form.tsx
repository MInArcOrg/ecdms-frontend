"use client"

import { Grid, Typography, Divider } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { BroadcastingInfrastructureAge, BroadcastingInfrastructure } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface BroadcastingInfrastructureAgeFormProps {
  formik: FormikProps<BroadcastingInfrastructureAge>
  file: File | null
  onFileChange: (file: File | null) => void
  broadcastingInfrastructures: BroadcastingInfrastructure[]
}

const BroadcastingInfrastructureAgeForm: React.FC<BroadcastingInfrastructureAgeFormProps> = ({
  formik,
  file,
  onFileChange,
  broadcastingInfrastructures,
}) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl("project.other.broadcasting-infrastructure-age.details.broadcasting-infrastructure")}
          placeholder={transl("project.other.broadcasting-infrastructure-age.details.broadcasting-infrastructure")}
          name="broadcasting_infrastructure_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            broadcastingInfrastructures.map((infra) => ({
              label: infra.broadcasting_infrastructure_type_id || infra.id,
              value: infra.id,
            })) || []
          }
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.broadcasting-infrastructure-age.infrastructure-age")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.broadcasting-infrastructure-age.details.antennas")}
              placeholder={transl("project.other.broadcasting-infrastructure-age.details.antennas")}
              name="antennas"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.broadcasting-infrastructure-age.details.transmitters")}
              placeholder={transl("project.other.broadcasting-infrastructure-age.details.transmitters")}
              name="transmitters"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.broadcasting-infrastructure-age.details.towers")}
              placeholder={transl("project.other.broadcasting-infrastructure-age.details.towers")}
              name="towers"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.broadcasting-infrastructure-age.details.cables")}
              placeholder={transl("project.other.broadcasting-infrastructure-age.details.cables")}
              name="cables"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.broadcasting-infrastructure-age.details.others")}
          placeholder={transl("project.other.broadcasting-infrastructure-age.details.others")}
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

export default BroadcastingInfrastructureAgeForm

