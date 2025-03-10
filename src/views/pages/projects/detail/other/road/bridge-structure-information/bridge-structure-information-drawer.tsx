"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgeStructureInformationForm from "./bridge-structure-information-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { BridgeStructureInformation } from "src/types/project/other"

interface BridgeStructureInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  bridgeStructureInformation: BridgeStructureInformation
  projectId: string
  model: string
}

const BridgeStructureInformationDrawer = (props: BridgeStructureInformationDrawerType) => {
  const { open, toggle, refetch, bridgeStructureInformation, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
    bridge_structure_type_id: yup.string().required("Bridge structure type is required"),
  })

  const isEdit = Boolean(bridgeStructureInformation?.id)

  const createBridgeStructureInformation = async (body: IApiPayload<BridgeStructureInformation>) =>
    projectOtherApiService<BridgeStructureInformation>().create(model, body)

  const editBridgeStructureInformation = async (body: IApiPayload<BridgeStructureInformation>) =>
    projectOtherApiService<BridgeStructureInformation>().update(model, bridgeStructureInformation?.id || "", body)

  const getPayload = (values: BridgeStructureInformation) => {
    return {
      data: {
        ...values,
        id: bridgeStructureInformation?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<BridgeStructureInformation>,
    payload: IApiPayload<BridgeStructureInformation>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.bridgeStructureInformation,
        response.payload.id,
        "",
        "",
      )
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.bridge-structure-information.${
        isEdit ? `edit-bridge-structure-information` : `create-bridge-structure-information`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-structure-information.${
            isEdit ? `edit-bridge-structure-information` : `create-bridge-structure-information`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeStructureInformation,
          }}
          createActionFunc={isEdit ? editBridgeStructureInformation : createBridgeStructureInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeStructureInformation>) => {
            return <BridgeStructureInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgeStructureInformationDrawer
