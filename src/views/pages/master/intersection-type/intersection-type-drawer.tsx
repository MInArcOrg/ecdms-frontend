import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import intersectionTypeApiService from "src/services/master-data/intersection-type-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { IntersectionType } from "src/types/master/intersection-type"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import IntersectionTypeForm from "./intersection-type-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface IntersectionTypeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  intersectionType: IntersectionType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const IntersectionTypeDrawer: React.FC<IntersectionTypeDrawerType> = (props) => {
  const { open, toggle, refetch, intersectionType } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = intersectionType?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createIntersectionType = async (body: IApiPayload<IntersectionType>) => {
    return await intersectionTypeApiService.create(body)
  }

  const editIntersectionType = async (body: IApiPayload<IntersectionType>) => {
    return await intersectionTypeApiService.update(intersectionType?.id || "", body)
  }

  const getPayload = (values: IntersectionType) => ({
    data: {
      ...values,
      id: intersectionType?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (response: IApiResponse<IntersectionType>, payload: IApiPayload<IntersectionType>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.intersection_type, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.intersection-type.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.intersection-type.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={intersectionType}
          createActionFunc={isEdit ? editIntersectionType : createIntersectionType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<IntersectionType>) => {
            return (
              <IntersectionTypeForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as IntersectionType}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default IntersectionTypeDrawer

