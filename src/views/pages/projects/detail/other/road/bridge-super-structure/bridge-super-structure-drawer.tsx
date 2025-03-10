"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BridgeSuperStructureForm from "./bridge-super-structure-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { BridgeSuperStructure } from "src/types/project/other"

interface BridgeSuperStructureDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  bridgeSuperStructure: BridgeSuperStructure
  projectId: string
  model: string
}

const BridgeSuperStructureDrawer = (props: BridgeSuperStructureDrawerType) => {
  const { open, toggle, refetch, bridgeSuperStructure, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    bridge_name: yup.string().required("Bridge name is required"),
    bridge_structure_type_id: yup.string().required("Bridge structure type is required"),
    span_support_type_id: yup.string().required("Span support type is required"),
    deck_slab_type_id: yup.string().required("Deck slab type is required"),
  })

  const isEdit = Boolean(bridgeSuperStructure?.id)

  const createBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiService<BridgeSuperStructure>().create(model, body)

  const editBridgeSuperStructure = async (body: IApiPayload<BridgeSuperStructure>) =>
    projectOtherApiService<BridgeSuperStructure>().update(model, bridgeSuperStructure?.id || "", body)

  const getPayload = (values: BridgeSuperStructure) => {
    return {
      data: {
        ...values,
        id: bridgeSuperStructure?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<BridgeSuperStructure>,
    payload: IApiPayload<BridgeSuperStructure>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.bridgeSuperStructure, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.bridge-super-structure.${
        isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.bridge-super-structure.${
            isEdit ? `edit-bridge-super-structure` : `create-bridge-super-structure`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...bridgeSuperStructure,
          }}
          createActionFunc={isEdit ? editBridgeSuperStructure : createBridgeSuperStructure}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BridgeSuperStructure>) => {
            return <BridgeSuperStructureForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BridgeSuperStructureDrawer

