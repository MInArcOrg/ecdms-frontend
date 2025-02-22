import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import crossSectionTypeApiService from "src/services/master-data/cross-section-type-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { CrossSectionType } from "src/types/master/cross-section-type"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CrossSectionTypeForm from "./cross-section-type-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface CrossSectionTypeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  crossSectionType: CrossSectionType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const CrossSectionTypeDrawer: React.FC<CrossSectionTypeDrawerType> = (props) => {
  const { open, toggle, refetch, crossSectionType } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = crossSectionType?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createCrossSectionType = async (body: IApiPayload<CrossSectionType>) => {
    return await crossSectionTypeApiService.create(body)
  }

  const editCrossSectionType = async (body: IApiPayload<CrossSectionType>) => {
    return await crossSectionTypeApiService.update(crossSectionType?.id || "", body)
  }

  const getPayload = (values: CrossSectionType) => ({
    data: {
      ...values,
      id: crossSectionType?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (response: IApiResponse<CrossSectionType>, payload: IApiPayload<CrossSectionType>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.cross_section_type, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master.cross-section-type.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master.cross-section-type.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={crossSectionType}
          createActionFunc={isEdit ? editCrossSectionType : createCrossSectionType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CrossSectionType>) => {
            return (
              <CrossSectionTypeForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as CrossSectionType}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CrossSectionTypeDrawer

