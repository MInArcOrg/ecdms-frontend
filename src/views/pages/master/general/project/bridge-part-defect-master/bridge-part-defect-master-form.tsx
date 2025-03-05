import type React from "react"
import { useQuery } from "@tanstack/react-query"
import type { FormikProps } from "formik"
import { useTranslation } from "react-i18next"
import masterTypeApiService from "src/services/master-data/master-type-service"
import type { BridgePartDefect } from "src/types/general/general-master"
import CustomSelectBox from "src/views/shared/form/custom-select"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import { Box } from "@mui/material"

interface BridgePartDefectMasterFormProps {
  formik: FormikProps<BridgePartDefect>
  defaultLocaleData?: BridgePartDefect
  onFileChange: (file: File | null) => void
  file: File | null
}

const BridgePartDefectMasterForm: React.FC<BridgePartDefectMasterFormProps> = ({ formik, file, onFileChange }) => {
  const { data: projectTypes } = useQuery({
    queryKey: ["masterCategory", "project"],
    queryFn: () => masterTypeApiService.getAll("project", {}),
  })
  const { t: transl } = useTranslation()

  return (
    <>
      <Box>
        <CustomSelectBox
          size="small"
          name="project_type_id"
          label={transl("master-data.form.project-type")}
          options={
            projectTypes?.payload?.map((projectType) => ({
              value: projectType.id,
              label: projectType.title,
            })) || []
          }
        />
      </Box>
      <Box>
        <CustomTextBox
          fullWidth
          label={transl("master-data.form.title")}
          placeholder={transl("master-data.form.title")}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box>
        <CustomTextBox
          fullWidth
          label={transl("master-data.form.description")}
          placeholder={transl("master-data.form.description")}
          name="description"
          multiline={true}
          rows="4"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <CustomFileUpload label={"File Upload"} file={file} onFileChange={onFileChange} />
    </>
  )
}

export default BridgePartDefectMasterForm

