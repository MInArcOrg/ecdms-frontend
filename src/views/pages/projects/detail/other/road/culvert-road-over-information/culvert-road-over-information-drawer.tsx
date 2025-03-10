"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CulvertRoadOverInformationForm from "./culvert-road-over-information-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { CulvertRoadOverInformation } from "src/types/project/other"

interface CulvertRoadOverInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  culvertRoadOverInformation: CulvertRoadOverInformation
  projectId: string
  model: string
}

const CulvertRoadOverInformationDrawer = (props: CulvertRoadOverInformationDrawerType) => {
  const { open, toggle, refetch, culvertRoadOverInformation, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    guard_rail_type_id: yup.string().required("Guard rail type is required"),
  })

  const isEdit = Boolean(culvertRoadOverInformation?.id)

  const createCulvertRoadOverInformation = async (body: IApiPayload<CulvertRoadOverInformation>) =>
    projectOtherApiService<CulvertRoadOverInformation>().create(model, body)

  const editCulvertRoadOverInformation = async (body: IApiPayload<CulvertRoadOverInformation>) =>
    projectOtherApiService<CulvertRoadOverInformation>().update(model, culvertRoadOverInformation?.id || "", body)

  const getPayload = (values: CulvertRoadOverInformation) => {
    return {
      data: {
        ...values,
        id: culvertRoadOverInformation?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<CulvertRoadOverInformation>,
    payload: IApiPayload<CulvertRoadOverInformation>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.culvertRoadOverInformation,
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
      title={`project.other.culvert-road-over-information.${isEdit ? `edit-culvert-road-over-information` : `create-culvert-road-over-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-road-over-information.${isEdit ? `edit-culvert-road-over-information` : `create-culvert-road-over-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertRoadOverInformation,
          }}
          createActionFunc={isEdit ? editCulvertRoadOverInformation : createCulvertRoadOverInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertRoadOverInformation>) => {
            return <CulvertRoadOverInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CulvertRoadOverInformationDrawer

