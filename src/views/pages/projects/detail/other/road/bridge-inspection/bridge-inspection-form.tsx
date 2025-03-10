import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { BridgeInspection } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomTextArea from "src/views/shared/form/custom-text-box"
import bridgePartDefectMasterService from "src/services/general/project/bridge-part-defect-master-service"
import damageTypeMasterService from "src/services/general/project/damage-type-master-service"
import damageConditionMasterService from "src/services/general/project/damage-condition-master-service"
import hydrologyDefectMasterService from "src/services/general/project/hydrology-defect-master-service"

import { useQuery } from "@tanstack/react-query"

interface BridgeInspectionFormProps {
  formik: FormikProps<BridgeInspection>
  file: File | null
  onFileChange: (file: File | null) => void
}

const BridgeInspectionForm: React.FC<BridgeInspectionFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: bridgePartDefects } = useQuery({
    queryKey: ["masterCategory", "bridgePartDefect"],
    queryFn: () => bridgePartDefectMasterService.getAll({}),
  })

  const { data: damageTypes } = useQuery({
    queryKey: ["masterCategory", "damageType"],
    queryFn: () => damageTypeMasterService.getAll({}),
  })

  const { data: damageConditions } = useQuery({
    queryKey: ["masterCategory", "damageCondition"],
    queryFn: () => damageConditionMasterService.getAll({}),
  })

  const { data: hydrologyDefects } = useQuery({
    queryKey: ["masterCategory", "hydrologyDefect"],
    queryFn: () => hydrologyDefectMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-inspection.details.name")}
          placeholder={transl("project.other.bridge-inspection.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-inspection.details.bridge-name")}
          placeholder={transl("project.other.bridge-inspection.details.bridge-name")}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="bridge_part_defect_id"
          label={transl("project.other.bridge-inspection.details.bridge-part-defect-id")}
          placeholder={transl("project.other.bridge-inspection.details.bridge-part-defect-id")}
          options={
            bridgePartDefects?.payload?.map((defect) => ({
              value: defect.id,
              label: defect.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="damage_type_id"
          label={transl("project.other.bridge-inspection.details.damage-type-id")}
          placeholder={transl("project.other.bridge-inspection.details.damage-type-id")}
          options={
            damageTypes?.payload?.map((type) => ({
              value: type.id,
              label: type.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="damage_condition_id"
          label={transl("project.other.bridge-inspection.details.damage-condition-id")}
          placeholder={transl("project.other.bridge-inspection.details.damage-condition-id")}
          options={
            damageConditions?.payload?.map((condition) => ({
              value: condition.id,
              label: condition.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomSelectBox
          size="small"
          name="hydrology_defect_id"
          label={transl("project.other.bridge-inspection.details.hydrology-defect-id")}
          placeholder={transl("project.other.bridge-inspection.details.hydrology-defect-id")}
          options={
            hydrologyDefects?.payload?.map((defect) => ({
              value: defect.id,
              label: defect.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl("project.other.bridge-inspection.details.maintenance-action")}
          placeholder={transl("project.other.bridge-inspection.details.maintenance-action")}
          name="maintenance_action"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl("project.other.bridge-inspection.details.bridge-history")}
          placeholder={transl("project.other.bridge-inspection.details.bridge-history")}
          name="bridge_history"
          size="small"
          sx={{ mb: 2 }}
        />

        <CustomTextArea
          fullWidth
          label={transl("project.other.bridge-inspection.details.inspector-remark")}
          placeholder={transl("project.other.bridge-inspection.details.inspector-remark")}
          name="inspector_remark"
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

export default BridgeInspectionForm

