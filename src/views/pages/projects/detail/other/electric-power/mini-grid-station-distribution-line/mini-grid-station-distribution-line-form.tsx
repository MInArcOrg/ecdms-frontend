"use client"

import { Grid, Typography, Divider } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { MiniGridStationDistributionLine, MiniGridStation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"
import { useQuery } from "@tanstack/react-query"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"

interface MiniGridStationDistributionLineFormProps {
  formik: FormikProps<MiniGridStationDistributionLine>
  file: File | null
  onFileChange: (file: File | null) => void
  miniGridStations: MiniGridStation[]
}

const MiniGridStationDistributionLineForm: React.FC<MiniGridStationDistributionLineFormProps> = ({ formik, file, onFileChange, miniGridStations }) => {
  const { t: transl } = useTranslation()
  
  // Fetch transformer types for dropdown
  const { data: transformerTypes } = useQuery({
    queryKey: ["transformer-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.transformerType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {transl("project.other.mini-grid-station-distribution-line.general-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.mini-grid-station-distribution-line.details.mini-grid-station-id")}
              name="mini_grid_station_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                miniGridStations?.map((station: MiniGridStation) => ({
                  label: station.name,
                  value: station.id,
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
              label={transl("project.other.mini-grid-station-distribution-line.details.name")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.name")}
              name="name"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.mini-grid-station-distribution-line.line-specifications")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.mini-grid-station-distribution-line.details.system-type")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.system-type")}
              name="system_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.mini-grid-station-distribution-line.details.lines-type")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.lines-type")}
              name="lines_type"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.mini-grid-station-distribution-line.details.line-length")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.line-length")}
              name="line_length"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.km")}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.mini-grid-station-distribution-line.details.poles")}
              name="poles"
              size="small"
              sx={{ mb: 2 }}
              options={[
                { label: "Concrete", value: "Concrete" },
                { label: "Wood", value: "Wood" },
                { label: "Steel", value: "Steel" },
              ]}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.mini-grid-station-distribution-line.transformer-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomSelect
              fullWidth
              required
              label={transl("project.other.mini-grid-station-distribution-line.details.transformer-type-id")}
              name="transformer_type_id"
              size="small"
              sx={{ mb: 2 }}
              options={
                transformerTypes?.payload.map((type: any) => ({
                  label: type.title,
                  value: type.id,
                })) || []
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.mini-grid-station-distribution-line.details.transformers-number")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.transformers-number")}
              name="transformers_number"
              type="number"
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextBox
              fullWidth
              label={transl("project.other.mini-grid-station-distribution-line.details.transformers-size")}
              placeholder={transl("project.other.mini-grid-station-distribution-line.details.transformers-size")}
              name="transformers_size"
              type="number"
              size="small"
              sx={{ mb: 2 }}
              helperText={transl("common.kva")}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          {transl("project.other.mini-grid-station-distribution-line.additional-information")}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <CustomTextBox
          fullWidth
          label={transl("project.other.mini-grid-station-distribution-line.details.remark")}
          placeholder={transl("project.other.mini-grid-station-distribution-line.details.remark")}
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

export default MiniGridStationDistributionLineForm