import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import designTrafficFlowApiService from "src/services/master-data/design-traffic-flow-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { DesignTrafficFlow } from "src/types/master/design-traffic-flow"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignTrafficFlowForm from "./design-traffic-flow-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface DesignTrafficFlowDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  designTrafficFlow: DesignTrafficFlow
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const DesignTrafficFlowDrawer: React.FC<DesignTrafficFlowDrawerType> = (props) => {
  const { open, toggle, refetch, designTrafficFlow } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = designTrafficFlow?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createDesignTrafficFlow = async (body: IApiPayload<DesignTrafficFlow>) => {
    return await designTrafficFlowApiService.create(body)
  }

  const editDesignTrafficFlow = async (body: IApiPayload<DesignTrafficFlow>) => {
    return await designTrafficFlowApiService.update(designTrafficFlow?.id || "", body)
  }

  const getPayload = (values: DesignTrafficFlow) => ({
    data: {
      ...values,
      id: designTrafficFlow?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (
    response: IApiResponse<DesignTrafficFlow>,
    payload: IApiPayload<DesignTrafficFlow>,
  ) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.design_traffic_flow, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.design-traffic-flow.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.design-traffic-flow.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={designTrafficFlow}
          createActionFunc={isEdit ? editDesignTrafficFlow : createDesignTrafficFlow}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignTrafficFlow>) => {
            return (
              <DesignTrafficFlowForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as DesignTrafficFlow}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DesignTrafficFlowDrawer

