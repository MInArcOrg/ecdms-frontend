"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import AccessoryForm from "./accessory-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { Accessory } from "src/types/project/other"

interface AccessoryDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  accessory: Accessory
  projectId: string
  model: string
}

const AccessoryDrawer = (props: AccessoryDrawerType) => {
  const { open, toggle, refetch, accessory, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  })

  const isEdit = Boolean(accessory?.id)

  const createAccessory = async (body: IApiPayload<Accessory>) =>
    projectOtherApiService<Accessory>().create(model, body)

  const editAccessory = async (body: IApiPayload<Accessory>) =>
    projectOtherApiService<Accessory>().update(model, accessory?.id || "", body)

  const getPayload = (values: Accessory) => {
    return {
      data: {
        ...values,
        id: accessory?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<Accessory>, payload: IApiPayload<Accessory>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.accessory, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.accessory.${isEdit ? `edit-accessory` : `create-accessory`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.accessory.${isEdit ? `edit-accessory` : `create-accessory`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...accessory,
          }}
          createActionFunc={isEdit ? editAccessory : createAccessory}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Accessory>) => {
            return <AccessoryForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default AccessoryDrawer

