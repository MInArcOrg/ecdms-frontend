"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import EndwallTypeOutletMasterForm from "./endwall-type-outlet-master-form"
import type { EndwallTypeOutlet } from "src/types/general/general-master"
import endwallTypeOutletMasterService from "src/services/general/project/endwall-type-outlet-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface EndwallTypeOutletMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: EndwallTypeOutlet
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const EndwallTypeOutletMasterDrawer = (props: EndwallTypeOutletMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createEndwallTypeOutletMaster = async (body: IApiPayload<EndwallTypeOutlet>) => {
    return await endwallTypeOutletMasterService.create(body)
  }

  const editEndwallTypeOutletMaster = async (body: IApiPayload<EndwallTypeOutlet>) => {
    return await endwallTypeOutletMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: EndwallTypeOutlet) => {
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
    response: IApiResponse<EndwallTypeOutlet>,
    payload: IApiPayload<EndwallTypeOutlet>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.endwallTypeOutlet, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-endwall-type-outlet" : "create-endwall-type-outlet"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<EndwallTypeOutlet>
          edit={isEdit}
          title="master-data.general-master.endwall-type-outlets"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editEndwallTypeOutletMaster : createEndwallTypeOutletMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<EndwallTypeOutlet>) => {
            return (
              <>
                <EndwallTypeOutletMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as EndwallTypeOutlet}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default EndwallTypeOutletMasterDrawer

