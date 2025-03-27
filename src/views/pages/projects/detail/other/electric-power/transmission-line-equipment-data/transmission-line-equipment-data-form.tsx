"use client"

import { Grid, Typography, Divider } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { TransmissionLineEquipmentData, TransmissionLineInformation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"

interface TransmissionLineEquipmentDataFormProps {
  formik: FormikProps<TransmissionLineEquipmentData>
  file: File | null
  onFileChange: (file: File | null) => void
  transmissionLines: TransmissionLineInformation[]
}

const TransmissionLineEquipmentDataForm: React.FC<TransmissionLineEquipmentDataFormProps> = ({
  formik,
  file,
  onFileChange,
  transmissionLines,
}) => {
  const { t: transl } = useTranslation()

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.transmission-line-equipment-data.general-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
            //   required
              label={transl("project.other.transmission-line-equipment-data.details.transmission-line-id")}
              name="transmission_line_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                transmissionLines?.map((line: any) => ({
                  label: line.name,
                  value: line.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              required
              label={transl("project.other.transmission-line-equipment-data.details.name")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.name")}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.transmission-line-equipment-data.equipment-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.insulator-type")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.insulator-type")}
              name="insulator_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.ground-wire-type")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.ground-wire-type")}
              name="ground_wire_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.fiber-optics-number")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.fiber-optics-number")}
              name="fiber_optics_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.opgw-uts")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.opgw-uts")}
              name="opgw_uts"
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
              label={transl("project.other.transmission-line-equipment-data.details.opgw-weight")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.opgw-weight")}
              name="opgw_weight"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.owner-operator")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.owner-operator")}
              name="owner_operator"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.transmission-line-equipment-data.tower-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.tower-grounding")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.tower-grounding")}
              name="tower_grounding"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.tower-circuit-arrangement")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.tower-circuit-arrangement")}
              name="tower_circuit_arrangement"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.transmission-line-equipment-data.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.transmission-line-equipment-data.details.other-equipment")}
              placeholder={transl("project.other.transmission-line-equipment-data.details.other-equipment")}
              name="other_equipment"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <CustomTextBox
          fullWidth
          label={transl("project.other.transmission-line-equipment-data.details.remark")}
          placeholder={transl("project.other.transmission-line-equipment-data.details.remark")}
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

export default TransmissionLineEquipmentDataForm

