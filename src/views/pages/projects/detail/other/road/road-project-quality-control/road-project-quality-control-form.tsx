import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { RoadProjectQualityControl } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomTextArea from "src/views/shared/form/custom-text-box"
import projectPhaseMasterService from "src/services/general/project/project-phase-master-service"
import inspectionTypeMasterService from "src/services/general/project/inspection-type-master-service"

import { useQuery } from "@tanstack/react-query"

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
    queryKey: ["masterCategory", "projectPhase"],
    queryFn: () => projectPhaseMasterService.getAll({}),
  })

  const { data: inspectionTypes } = useQuery({
    queryKey: ["masterCategory", "inspectionType"],
    queryFn: () => inspectionTypeMasterService.getAll({}),
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

        <CustomSelectBox
          size="small"
          name="project_phase_id"
          label={transl("project.other.road-project-quality-control.details.project-phase-id")}
          placeholder={transl("project.other.road-project-quality-control.details.project-phase-id")}
          options={
            projectPhases?.payload?.map((phase) => ({
              value: phase.id,
              label: phase.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="inspection_type_id"
          label={transl("project.other.road-project-quality-control.details.inspection-type-id")}
          placeholder={transl("project.other.road-project-quality-control.details.inspection-type-id")}
          options={
            inspectionTypes?.payload?.map((type) => ({
              value: type.id,
              label: type.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-project-quality-control.details.defect-encountered")}
          placeholder={transl("project.other.road-project-quality-control.details.defect-encountered")}
          name="defect_encountered"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl("project.other.road-project-quality-control.details.remark")}
          placeholder={transl("project.other.road-project-quality-control.details.remark")}
          name="remark"
          size="small"
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

