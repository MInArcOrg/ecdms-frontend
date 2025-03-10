import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { BridgeStructureInformation } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomTextArea from "src/views/shared/form/custom-text-box"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"

import { useQuery } from "@tanstack/react-query"

interface BridgeStructureInformationFormProps {
  formik: FormikProps<BridgeStructureInformation>
  file: File | null
  onFileChange: (file: File | null) => void
}

const BridgeStructureInformationForm: React.FC<BridgeStructureInformationFormProps> = ({
  formik,
  file,
  onFileChange,
}) => {
  const { t: transl } = useTranslation()

  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["masterCategory", "bridgeStructureType"],
    queryFn: () => bridgeStructureTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.name")}
          placeholder={transl("project.other.bridge-structure-information.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.bridge-name")}
          placeholder={transl("project.other.bridge-structure-information.details.bridge-name")}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        
        <CustomSelectBox
          size="small"
          name="bridge_structure_type_id"
          label={transl("project.other.bridge-structure-information.details.bridge-structure-type-id")}
          placeholder={transl("project.other.bridge-structure-information.details.bridge-structure-type-id")}
          options={
            bridgeStructureTypes?.payload?.map((type) => ({
              value: type.id,
              label: type.title,
            })) || []
          }
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.east-region")}
          placeholder={transl("project.other.bridge-structure-information.details.east-region")}
          name="east_region"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.west-region")}
          placeholder={transl("project.other.bridge-structure-information.details.west-region")}
          name="west_region"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.central-region")}
          placeholder={transl("project.other.bridge-structure-information.details.central-region")}
          name="central_region"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.north-region")}
          placeholder={transl("project.other.bridge-structure-information.details.north-region")}
          name="north_region"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.south-region")}
          placeholder={transl("project.other.bridge-structure-information.details.south-region")}
          name="south_region"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-structure-information.details.ring-road")}
          placeholder={transl("project.other.bridge-structure-information.details.ring-road")}
          name="ring_road"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        
        <CustomTextArea
          fullWidth
          label={transl("project.other.bridge-structure-information.details.remark")}
          placeholder={transl("project.other.bridge-structure-information.details.remark")}
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

export default BridgeStructureInformationForm
