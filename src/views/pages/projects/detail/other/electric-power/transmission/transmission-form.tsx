"use client"

import { Grid, Typography, Divider } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { Transmission } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface TransmissionFormProps {
  formik: FormikProps<Transmission>
  file: File | null
  onFileChange: (file: File | null) => void
}

const TransmissionForm: React.FC<TransmissionFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.transmission.transmission-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission.details.transmission-voltage")}
              placeholder={transl("project.other.transmission.details.transmission-voltage")}
              name="transmission_voltage"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.kv")}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission.details.distance-to-substation")}
              placeholder={transl("project.other.transmission.details.distance-to-substation")}
              name="distance_to_substation"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.kilometers")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission.details.transmission-lines-number")}
              placeholder={transl("project.other.transmission.details.transmission-lines-number")}
              name="transmission_lines_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.transmission.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl("project.other.transmission.details.remark")}
          placeholder={transl("project.other.transmission.details.remark")}
          name="remark"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default TransmissionForm