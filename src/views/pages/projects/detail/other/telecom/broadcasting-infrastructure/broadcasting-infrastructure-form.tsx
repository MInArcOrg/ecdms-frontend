"use client"

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { BroadcastingInfrastructure } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface BroadcastingInfrastructureFormProps {
  formik: FormikProps<BroadcastingInfrastructure>
  file: File | null
  onFileChange: (file: File | null) => void
}

const BroadcastingInfrastructureForm: React.FC<BroadcastingInfrastructureFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: broadcastingInfrastructureTypes } = useQuery({
    queryKey: ["broadcasting-infrastructure-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.broadcastingInfrastructureType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomSelect
          fullWidth
          label={transl("project.other.broadcasting-infrastructure.details.broadcasting-infrastructure-type")}
          placeholder={transl("project.other.broadcasting-infrastructure.details.broadcasting-infrastructure-type")}
          name="broadcasting_infrastructure_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            broadcastingInfrastructureTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.broadcasting-infrastructure.infrastructure-components")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.broadcasting_network || false}
                  onChange={(e) => formik.setFieldValue("broadcasting_network", e.target.checked)}
                  name="broadcasting_network"
                />
              }
              label={transl("project.other.broadcasting-infrastructure.details.broadcasting-network")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.antennas || false}
                  onChange={(e) => formik.setFieldValue("antennas", e.target.checked)}
                  name="antennas"
                />
              }
              label={transl("project.other.broadcasting-infrastructure.details.antennas")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.transmitters || false}
                  onChange={(e) => formik.setFieldValue("transmitters", e.target.checked)}
                  name="transmitters"
                />
              }
              label={transl("project.other.broadcasting-infrastructure.details.transmitters")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.towers || false}
                  onChange={(e) => formik.setFieldValue("towers", e.target.checked)}
                  name="towers"
                />
              }
              label={transl("project.other.broadcasting-infrastructure.details.towers")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.cables || false}
                  onChange={(e) => formik.setFieldValue("cables", e.target.checked)}
                  name="cables"
                />
              }
              label={transl("project.other.broadcasting-infrastructure.details.cables")}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.broadcasting-infrastructure.details.others")}
          placeholder={transl("project.other.broadcasting-infrastructure.details.others")}
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

export default BroadcastingInfrastructureForm

