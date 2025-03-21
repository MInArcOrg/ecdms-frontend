"use client"

import { Grid, Typography, Divider, FormControlLabel, Checkbox } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { EnvironmentalAndSocialImpact } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface EnvironmentalAndSocialImpactFormProps {
  formik: FormikProps<EnvironmentalAndSocialImpact>
  file: File | null
  onFileChange: (file: File | null) => void
}

const EnvironmentalAndSocialImpactForm: React.FC<EnvironmentalAndSocialImpactFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.environmental-and-social-impact.environmental-impact-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.environmental_impact_assessment_conducted || false}
                  onChange={(e) => formik.setFieldValue("environmental_impact_assessment_conducted", e.target.checked)}
                  name="environmental_impact_assessment_conducted"
                />
              }
              label={transl(
                "project.other.environmental-and-social-impact.details.environmental-impact-assessment-conducted",
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.mitigation_measures_implemented || false}
                  onChange={(e) => formik.setFieldValue("mitigation_measures_implemented", e.target.checked)}
                  name="mitigation_measures_implemented"
                />
              }
              label={transl("project.other.environmental-and-social-impact.details.mitigation-measures-implemented")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.environmental-and-social-impact.social-impact-details")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.social_impact_assessment_conducted || false}
                  onChange={(e) => formik.setFieldValue("social_impact_assessment_conducted", e.target.checked)}
                  name="social_impact_assessment_conducted"
                />
              }
              label={transl("project.other.environmental-and-social-impact.details.social-impact-assessment-conducted")}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.resettlement_and_compensation_measures_implemented || false}
                  onChange={(e) =>
                    formik.setFieldValue("resettlement_and_compensation_measures_implemented", e.target.checked)
                  }
                  name="resettlement_and_compensation_measures_implemented"
                />
              }
              label={transl(
                "project.other.environmental-and-social-impact.details.resettlement-and-compensation-measures-implemented",
              )}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.environmental-and-social-impact.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl("project.other.environmental-and-social-impact.details.remark")}
          placeholder={transl("project.other.environmental-and-social-impact.details.remark")}
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

export default EnvironmentalAndSocialImpactForm

