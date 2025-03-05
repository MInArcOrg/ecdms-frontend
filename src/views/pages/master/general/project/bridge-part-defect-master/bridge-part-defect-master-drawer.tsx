"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgePartDefectMasterForm from "./bridge-part-defect-master-form"
import type { BridgePartDefect } from "src/types/general/general-master"
import bridgePartDefectMasterService from "src/services/general/project/bridge-part-defect-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface BridgePartDefectMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: BridgePartDefect
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const BridgePartDefectMasterDrawer = (props: BridgePartDefectMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createBridgePartDefectMaster = async (body: IApiPayload<BridgePartDefect>) => {
    return await bridgePartDefectMasterService.create(body)
  }

  const editBridgePartDefectMaster = async (body: IApiPayload<BridgePartDefect>) => {
    return await bridgePartDefectMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: BridgePartDefect) => {
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

  const onActionSuccess = async (response: IApiResponse<BridgePartDefect>, payload: IApiPayload<BridgePartDefect>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.bridgePartDefect, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-bridge-part-defect" : "create-bridge-part-defect"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<BridgePartDefect>
          edit={isEdit}
          title="master-data.general-master.bridge-part-defects"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editBridgePartDefectMaster : createBridgePartDefectMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgePartDefect>) => {
            return (
              <>
                <BridgePartDefectMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as BridgePartDefect}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgePartDefectMasterDrawer

