import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import functionalClassificationApiService from "src/services/master-data/functional-classification-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { FunctionalClassification } from "src/types/master/functional-classification"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import FunctionalClassificationForm from "./functional-classification-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface FunctionalClassificationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  functionalClassification: FunctionalClassification
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const FunctionalClassificationDrawer: React.FC<FunctionalClassificationDrawerType> = (props) => {
  const { open, toggle, refetch, functionalClassification } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = functionalClassification?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createFunctionalClassification = async (body: IApiPayload<FunctionalClassification>) => {
    return await functionalClassificationApiService.create(body)
  }

  const editFunctionalClassification = async (body: IApiPayload<FunctionalClassification>) => {
    return await functionalClassificationApiService.update(functionalClassification?.id || "", body)
  }

  const getPayload = (values: FunctionalClassification) => ({
    data: {
      ...values,
      id: functionalClassification?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (
    response: IApiResponse<FunctionalClassification>,
    payload: IApiPayload<FunctionalClassification>,
  ) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.functional_classification, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.functional-classification.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.functional-classification.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={functionalClassification}
          createActionFunc={isEdit ? editFunctionalClassification : createFunctionalClassification}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<FunctionalClassification>) => {
            return (
              <FunctionalClassificationForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as FunctionalClassification}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default FunctionalClassificationDrawer

