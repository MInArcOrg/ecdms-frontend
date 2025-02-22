"use client"

import type React from "react"

import { Box } from "@mui/material"
import type { FormikProps } from "formik"
import { useTranslation } from "react-i18next"
import type { DrivewayAccessPoint } from "src/types/master/driveway-access-point"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"
import { useEffect, useState } from "react"
import masterTypeApiService from "src/services/master-data/master-type-service"

interface DrivewayAccessPointFormProps {
  formik: FormikProps<DrivewayAccessPoint>
  defaultLocaleData?: DrivewayAccessPoint
  file: File | null
  onFileChange: (file: File | null) => void
}

const DrivewayAccessPointForm: React.FC<DrivewayAccessPointFormProps> = ({ formik, file, onFileChange }) => {
  const { t } = useTranslation()
  const [projectTypes, setProjectTypes] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    const fetchProjectTypes = async () => {
      try {
        const response = await masterTypeApiService.getAll("project", { })
        const types = response.payload.map((type) => ({
          value: type.id,
          label: type.title,
        }))
        setProjectTypes(types)
      } catch (error) {
        console.error("Error fetching project types:", error)
      }
    }

    fetchProjectTypes()
  }, [])

  return (
    <>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t("master-data.driveway-access-point.title")}
          name="title"
          size="small"
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t("master-data.driveway-access-point.description")}
          name="description"
          size="small"
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box mb={2}>
        <CustomSelect
          fullWidth
          label={t("master-data.driveway-access-point.project-type")}
          name="project_type_id"
          size="small"
          options={projectTypes}
          sx={{ mb: 2 }}
        />
      </Box>
      <CustomFileUpload label={t("common.form.file-upload")} file={file} onFileChange={onFileChange} />
    </>
  )
}

export default DrivewayAccessPointForm

