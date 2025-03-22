import { Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { RoadProjectQualityControl } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface RoadProjectQualityControlFormProps {
  formik: FormikProps<RoadProjectQualityControl>
  file: File | null
  onFileChange: (file: File | null) => void
}

const RoadProjectQualityControlForm: React.FC<RoadProjectQualityControlFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: projectPhases } = useQuery({
    queryKey: ["project-phases"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.projectPhase.model },
      }),
  })

  const { data: inspectionTypes } = useQuery({
    queryKey: ["inspection-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.inspectionType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-project-quality-control.details.name")}
          placeholder={transl("project.other.road-project-quality-control.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.road-project-quality-control.details.project-phase-id")}
          placeholder={transl("project.other.road-project-quality-control.details.project-phase-id")}
          name="project_phase_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            projectPhases?.payload.map((phase) => ({
              label: phase.title,
              value: phase.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.road-project-quality-control.details.inspection-type-id")}
          placeholder={transl("project.other.road-project-quality-control.details.inspection-type-id")}
          name="inspection_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            inspectionTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-project-quality-control.details.defect-encountered")}
          placeholder={transl("project.other.road-project-quality-control.details.defect-encountered")}
          name="defect_encountered"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-project-quality-control.details.remark")}
          placeholder={transl("project.other.road-project-quality-control.details.remark")}
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

export default RoadProjectQualityControlForm

