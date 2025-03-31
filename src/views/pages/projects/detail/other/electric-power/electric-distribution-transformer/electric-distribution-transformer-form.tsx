"use client"

import { Grid, Typography, Divider } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { ElectricDistributionTransformer } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"

interface ElectricDistributionTransformerFormProps {
  formik: FormikProps<ElectricDistributionTransformer>
  file: File | null
  onFileChange: (file: File | null) => void
  fireExtinguishingTechnologies:any[]
}

const ElectricDistributionTransformerForm: React.FC<ElectricDistributionTransformerFormProps> = ({ 
  formik, 
  file, 
  onFileChange, 
  fireExtinguishingTechnologies
}) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.electric-distribution-transformer.general-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl("project.other.electric-distribution-transformer.details.name")}
              placeholder={transl("project.other.electric-distribution-transformer.details.name")}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.electric-distribution-transformer.technical-specifications")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.service-area")}
              placeholder={transl("project.other.electric-distribution-transformer.details.service-area")}
              name="service_area"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.km2")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
            //   required
              label={transl("project.other.electric-distribution-transformer.details.fire-extinguishing-technology-id")}
              name="fire_extinguishing_technology_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                fireExtinguishingTechnologies?.map((tech: any) => ({
                  label: tech.title,
                  value: tech.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.installation-year")}
              placeholder={transl("project.other.electric-distribution-transformer.details.installation-year")}
              name="installation_year"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.transformers-total-number")}
              placeholder={transl("project.other.electric-distribution-transformer.details.transformers-total-number")}
              name="transformers_total_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.electric-distribution-transformer.location-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.gps-x-coordinates")}
              placeholder={transl("project.other.electric-distribution-transformer.details.gps-x-coordinates")}
              name="gps_x_coordinates"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.gps-y-coordinates")}
              placeholder={transl("project.other.electric-distribution-transformer.details.gps-y-coordinates")}
              name="gps_y_coordinates"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.electric-distribution-transformer.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.electric-distribution-transformer.details.other")}
              placeholder={transl("project.other.electric-distribution-transformer.details.other")}
              name="other"
              size="small"
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.electric-distribution-transformer.details.remark")}
          placeholder={transl("project.other.electric-distribution-transformer.details.remark")}
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

export default ElectricDistributionTransformerForm