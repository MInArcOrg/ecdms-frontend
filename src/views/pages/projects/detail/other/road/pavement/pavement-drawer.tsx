"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import PavementForm from "./pavement-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { Pavement } from "src/types/project/other"

interface PavementDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  pavement: Pavement
  projectId: string
  model: string
}

const PavementDrawer = (props: PavementDrawerType) => {
  const { open, toggle, refetch, pavement, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    road_length_type_id: yup.string().required("Road length type is required"),
  })

  const isEdit = Boolean(pavement?.id)

  const createPavement = async (body: IApiPayload<Pavement>) => projectOtherApiService<Pavement>().create(model, body)

  const editPavement = async (body: IApiPayload<Pavement>) =>
    projectOtherApiService<Pavement>().update(model, pavement?.id || "", body)

  const getPayload = (values: Pavement) => {
    return {
      data: {
        ...values,
        id: pavement?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<Pavement>, payload: IApiPayload<Pavement>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.pavement, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.pavement.${isEdit ? `edit-pavement` : `create-pavement`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.pavement.${isEdit ? `edit-pavement` : `create-pavement`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...pavement,
          }}
          createActionFunc={isEdit ? editPavement : createPavement}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Pavement>) => {
            return <PavementForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default PavementDrawer

