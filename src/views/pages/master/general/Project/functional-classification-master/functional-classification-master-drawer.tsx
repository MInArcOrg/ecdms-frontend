import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import FunctionalClassificationMasterForm from "./functional-classification-master-form"
import type { FunctionalClassification } from "src/types/general/general-master"
import functionalClassificationMasterService from "src/services/general/project/functional-classification-master-service"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface FunctionalClassificationMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: FunctionalClassification
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const FunctionalClassificationMasterDrawer = (props: FunctionalClassificationMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createFunctionalClassificationMaster = async (body: IApiPayload<FunctionalClassification>) => {
    return await functionalClassificationMasterService.create(body)
  }

  const editFunctionalClassificationMaster = async (body: IApiPayload<FunctionalClassification>) => {
    return await functionalClassificationMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: FunctionalClassification) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
    return payload
  }

  const handleClose = () => {
    toggle()
  }

  const onActionSuccess = async (
    response: IApiResponse<FunctionalClassification>,
    payload: IApiPayload<FunctionalClassification>,
  ) => {
    if (payload.files.length > 0) {
     uploadFile(payload.files[0], uploadableResourceFileTypes.functional_classification, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

//    if (payload.files.length > 0) {
//         if (response.payload.id) {
//           uploadFile(payload.files[0], uploadableResourceFileTypes.functional_classification, response.payload.id, "", "")
//         }
//       }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-functional-classification" : "create-functional-classification"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<FunctionalClassification>
          edit={isEdit}
          title="master-data.general-master.functional-classifications"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editFunctionalClassificationMaster : createFunctionalClassificationMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<FunctionalClassification>) => {
            return (
              <>
                <FunctionalClassificationMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as FunctionalClassification}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default FunctionalClassificationMasterDrawer

