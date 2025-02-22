"use client"

import type React from "react"

import { Box } from "@mui/material"
import type { FormikProps } from "formik"
import { useTranslation } from "react-i18next"
import type { IntersectionType } from "src/types/master/intersection-type"
import CustomTextBox from "src/views/shared/form/custom-text-box"
import CustomFileUpload from "src/views/shared/form/custome-file-selector"
import CustomSelect from "src/views/shared/form/custom-select"
import { useEffect, useState } from "react"
import masterTypeApiService from "src/services/master-data/master-type-service"

interface IntersectionTypeFormProps {
  formik: FormikProps<IntersectionType>
  defaultLocaleData?: IntersectionType
  file: File | null
  onFileChange: (file: File | null) => void
}

const IntersectionTypeForm: React.FC<IntersectionTypeFormProps> = ({ formik, file, onFileChange }) => {
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
        <CustomTextBox fullWidth label={t("master-data.intersection-type.title")} name="title" size="small" sx={{ mb: 2 }} />
      </Box>
      <Box mb={2}>
        <CustomTextBox
          fullWidth
          label={t("master-data.intersection-type.description")}
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
          label={t("master-data.intersection-type.project-type")}
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

export default IntersectionTypeForm

