import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignTrafficFlowMasterForm from "./design-traffic-flow-master-form"
import type { DesignTrafficFlow } from "src/types/general/general-master"
import designTrafficFlowMasterService from "src/services/general/project/design-traffic-flow-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DesignTrafficFlowMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DesignTrafficFlow
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DesignTrafficFlowMasterDrawer = (props: DesignTrafficFlowMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDesignTrafficFlowMaster = async (body: IApiPayload<DesignTrafficFlow>) => {
    return await designTrafficFlowMasterService.create(body)
  }

  const editDesignTrafficFlowMaster = async (body: IApiPayload<DesignTrafficFlow>) => {
    return await designTrafficFlowMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DesignTrafficFlow) => {
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
    response: IApiResponse<DesignTrafficFlow>,
    payload: IApiPayload<DesignTrafficFlow>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.designTrafficFlow, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-design-traffic-flow" : "create-design-traffic-flow"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DesignTrafficFlow>
          edit={isEdit}
          title="master-data.general-master.design-traffic-flows"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDesignTrafficFlowMaster : createDesignTrafficFlowMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignTrafficFlow>) => {
            return (
              <>
                <DesignTrafficFlowMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DesignTrafficFlow}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DesignTrafficFlowMasterDrawer

