import { Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants"
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service"
import type { RoadMaintenanceActivity } from "src/types/project/other"
import CustomSelect from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"

interface RoadMaintenanceActivityFormProps {
  formik: FormikProps<RoadMaintenanceActivity>
  file: File | null
  onFileChange: (file: File | null) => void
}

const RoadMaintenanceActivityForm: React.FC<RoadMaintenanceActivityFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: maintenanceFrequencies } = useQuery({
    queryKey: ["maintenance-frequencies"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceFrequency.model },
      }),
  })

  const { data: maintenanceTypes } = useQuery({
    queryKey: ["maintenance-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.maintenanceType.model },
      }),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-activity.details.road-segment")}
          placeholder={transl("project.other.road-maintenance-activity.details.road-segment")}
          name="road_segment"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.road-maintenance-activity.details.maintenance-frequency")}
          placeholder={transl("project.other.road-maintenance-activity.details.maintenance-frequency")}
          name="maintenance_frequency_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            maintenanceFrequencies?.payload.map((frequency) => ({
              label: frequency.title,
              value: frequency.id,
            })) || []
          }
        />

        <CustomSelect
          fullWidth
          label={transl("project.other.road-maintenance-activity.details.maintenance-type")}
          placeholder={transl("project.other.road-maintenance-activity.details.maintenance-type")}
          name="maintenance_type_id"
          size="small"
          sx={{ mb: 2 }}
          options={
            maintenanceTypes?.payload.map((type) => ({
              label: type.title,
              value: type.id,
            })) || []
          }
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-activity.details.consultant")}
          placeholder={transl("project.other.road-maintenance-activity.details.consultant")}
          name="consultant"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextBox
          fullWidth
          label={transl("project.other.road-maintenance-activity.details.remark")}
          placeholder={transl("project.other.road-maintenance-activity.details.remark")}
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

export default RoadMaintenanceActivityForm

