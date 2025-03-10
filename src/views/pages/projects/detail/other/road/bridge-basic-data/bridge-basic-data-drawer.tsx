"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgeBasicDataForm from "./bridge-basic-data-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { BridgeBasicData } from "src/types/project/other"

interface BridgeBasicDataDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  bridgeBasicData: BridgeBasicData
  projectId: string
  model: string
}

const BridgeBasicDataDrawer = (props: BridgeBasicDataDrawerType) => {
  const { open, toggle, refetch, bridgeBasicData, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
  })

  const isEdit = Boolean(bridgeBasicData?.id)

  const createBridgeBasicData = async (body: IApiPayload<BridgeBasicData>) =>
    projectOtherApiService<BridgeBasicData>().create(model, body)

  const editBridgeBasicData = async (body: IApiPayload<BridgeBasicData>) =>
    projectOtherApiService<BridgeBasicData>().update(model, bridgeBasicData?.id || "", body)

  const getPayload = (values: BridgeBasicData) => {
    return {
      data: {
        ...values,
        id: bridgeBasicData?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<BridgeBasicData>, payload: IApiPayload<BridgeBasicData>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.bridgeBasicData, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.bridge-basic-data.${isEdit ? `edit-bridge-basic-data` : `create-bridge-basic-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-basic-data.${isEdit ? `edit-bridge-basic-data` : `create-bridge-basic-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeBasicData,
          }}
          createActionFunc={isEdit ? editBridgeBasicData : createBridgeBasicData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeBasicData>) => {
            return <BridgeBasicDataForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgeBasicDataDrawer

