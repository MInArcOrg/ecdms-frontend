"use client"

import { Grid, FormControlLabel, Switch } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { GeotechnicalInformation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"

interface GeotechnicalInformationFormProps {
  formik: FormikProps<GeotechnicalInformation>
  files: {
    seismicDesign: File | null
    geotechnicalReport: File | null
    foundationDesign: File | null
  }
  onFileChange: (fileType: string, file: File | null) => void
}

// Mock data for dropdowns - replace with actual data sources
const soilTypes = [
  { id: "soil-type-1", name: "Clay" },
  { id: "soil-type-2", name: "Sand" },
  { id: "soil-type-3", name: "Silt" },
  { id: "soil-type-4", name: "Rock" },
]

const groundWaterImpacts = [
  { id: "impact-1", name: "Low" },
  { id: "impact-2", name: "Medium" },
  { id: "impact-3", name: "High" },
]

const slopeStabilities = [
  { id: "stability-1", name: "Stable" },
  { id: "stability-2", name: "Moderate" },
  { id: "stability-3", name: "Unstable" },
]

const GeotechnicalInformationForm: React.FC<GeotechnicalInformationFormProps> = ({ formik, files, onFileChange }) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.geotechnical-information.details.name")}
          placeholder={transl("project.other.geotechnical-information.details.name")}
          name="name"
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl("project.other.geotechnical-information.details.soil-type")}
          name="soil_type_id"
          options={soilTypes.map((type) => ({ value: type.id, label: type.name }))}
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl("project.other.geotechnical-information.details.ground-water-impact")}
          name="ground_water_impact_id"
          options={groundWaterImpacts.map((impact) => ({ value: impact.id, label: impact.name }))}
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.geotechnical-information.details.soil-bearing-capacity")}
          placeholder={transl("project.other.geotechnical-information.details.soil-bearing-capacity")}
          name="soil_bearing_capacity"
          type="number"
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomSelect
          fullWidth
          label={transl("project.other.geotechnical-information.details.slope-stability")}
          name="slope_stability_id"
          options={slopeStabilities.map((stability) => ({ value: stability.id, label: stability.name }))}
          size="small"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Switch
              checked={formik.values.retaining_walls || false}
              onChange={(e) => formik.setFieldValue("retaining_walls", e.target.checked)}
              name="retaining_walls"
            />
          }
          label={transl("project.other.geotechnical-information.details.retaining-walls")}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.geotechnical-information.details.geological-hazard")}
          placeholder={transl("project.other.geotechnical-information.details.geological-hazard")}
          name="geological_hazard"
          size="small"
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.geotechnical-information.details.remark")}
          placeholder={transl("project.other.geotechnical-information.details.remark")}
          name="remark"
          size="small"
          multiline
          rows={3}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("project.other.geotechnical-information.file-types.seismic-design")}
          file={files.seismicDesign}
          onFileChange={(file) => onFileChange("seismicDesign", file)}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("project.other.geotechnical-information.file-types.geotechnical-report")}
          file={files.geotechnicalReport}
          onFileChange={(file) => onFileChange("geotechnicalReport", file)}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload
          label={transl("project.other.geotechnical-information.file-types.foundation-design")}
          file={files.foundationDesign}
          onFileChange={(file) => onFileChange("foundationDesign", file)}
        />
      </Grid>
    </Grid>
  )
}

export default GeotechnicalInformationForm

