import { Grid } from "@mui/material"
import type { FormikProps } from "formik"
import type React from "react"
import { useTranslation } from "react-i18next"
import { gridSpacing } from "src/configs/app-constants"
import type { BridgeSuperStructure } from "src/types/project/other"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelectBox from "src/views/shared/form/custom-select"
import bridgeStructureTypeMasterService from "src/services/general/project/bridge-structure-type-master-service"
import spanSupportTypeMasterService from "src/services/general/project/span-support-type-master-service"
import deckSlabTypeMasterService from "src/services/general/project/deck-slab-type-master-service "

import { useQuery } from "@tanstack/react-query"

interface BridgeSuperStructureFormProps {
  formik: FormikProps<BridgeSuperStructure>
  file: File | null
  onFileChange: (file: File | null) => void
}

const BridgeSuperStructureForm: React.FC<BridgeSuperStructureFormProps> = ({ formik, file, onFileChange }) => {
  const { t: transl } = useTranslation()

  const { data: bridgeStructureTypes } = useQuery({
    queryKey: ["masterCategory", "bridgeStructureType"],
    queryFn: () => bridgeStructureTypeMasterService.getAll({}),
  })

  const { data: spanSupportTypes } = useQuery({
    queryKey: ["masterCategory", "spanSupportType"],
    queryFn: () => spanSupportTypeMasterService.getAll({}),
  })

  const { data: deckSlabTypes } = useQuery({
    queryKey: ["masterCategory", "deckSlabType"],
    queryFn: () => deckSlabTypeMasterService.getAll({}),
  })

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.name")}
          placeholder={transl("project.other.bridge-super-structure.details.name")}
          name="name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.bridge-name")}
          placeholder={transl("project.other.bridge-super-structure.details.bridge-name")}
          name="bridge_name"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="bridge_structure_type_id"
          label={transl("project.other.bridge-super-structure.details.bridge-structure-type-id")}
          placeholder={transl("project.other.bridge-super-structure.details.bridge-structure-type-id")}
          options={
            bridgeStructureTypes?.payload?.map((bridgeStructureType) => ({
              value: bridgeStructureType.id,
              label: bridgeStructureType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.span-number")}
          placeholder={transl("project.other.bridge-super-structure.details.span-number")}
          name="span_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.span-composition")}
          placeholder={transl("project.other.bridge-super-structure.details.span-composition")}
          name="span_composition"
          size="small"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.total-span-length")}
          placeholder={transl("project.other.bridge-super-structure.details.total-span-length")}
          name="total_span_length"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.carriage-width")}
          placeholder={transl("project.other.bridge-super-structure.details.carriage-width")}
          name="carriage_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.side-walk-width")}
          placeholder={transl("project.other.bridge-super-structure.details.side-walk-width")}
          name="side_walk_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.lane-number")}
          placeholder={transl("project.other.bridge-super-structure.details.lane-number")}
          name="lane_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomSelectBox
          size="small"
          name="span_support_type_id"
          label={transl("project.other.bridge-super-structure.details.span-support-type-id")}
          placeholder={transl("project.other.bridge-super-structure.details.span-support-type-id")}
          options={
            spanSupportTypes?.payload?.map((spanSupportType) => ({
              value: spanSupportType.id,
              label: spanSupportType.title,
            })) || []
          }
        />
        <CustomSelectBox
          size="small"
          name="deck_slab_type_id"
          label={transl("project.other.bridge-super-structure.details.deck-slab-type-id")}
          placeholder={transl("project.other.bridge-super-structure.details.deck-slab-type-id")}
          options={
            deckSlabTypes?.payload?.map((deckSlabType) => ({
              value: deckSlabType.id,
              label: deckSlabType.title,
            })) || []
          }
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.girder-number")}
          placeholder={transl("project.other.bridge-super-structure.details.girder-number")}
          name="girder_number"
          size="small"
          type="number"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.girder-depth")}
          placeholder={transl("project.other.bridge-super-structure.details.girder-depth")}
          name="girder_depth"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.girder-spacing")}
          placeholder={transl("project.other.bridge-super-structure.details.girder-spacing")}
          name="girder_spacing"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
        <CustomTextBox
          fullWidth
          label={transl("project.other.bridge-super-structure.details.girder-width")}
          placeholder={transl("project.other.bridge-super-structure.details.girder-width")}
          name="girder_width"
          size="small"
          type="number"
          step="0.01"
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12}>
        <CustomFileUpload label={transl("common.form.file-upload")} file={file} onFileChange={onFileChange} />
      </Grid>
    </Grid>
  )
}

export default BridgeSuperStructureForm

