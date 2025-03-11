"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import RoadProjectQualityControlForm from "./road-project-quality-control-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { RoadProjectQualityControl } from "src/types/project/other"

interface RoadProjectQualityControlDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  roadProjectQualityControl: RoadProjectQualityControl
  projectId: string
  model: string
}

const RoadProjectQualityControlDrawer = (props: RoadProjectQualityControlDrawerType) => {
  const { open, toggle, refetch, roadProjectQualityControl, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    project_phase_id: yup.string().required("Project phase is required"),
    inspection_type_id: yup.string().required("Inspection type is required"),
  })

  const isEdit = Boolean(roadProjectQualityControl?.id)

  const createRoadProjectQualityControl = async (body: IApiPayload<RoadProjectQualityControl>) =>
    projectOtherApiService<RoadProjectQualityControl>().create(model, body)

  const editRoadProjectQualityControl = async (body: IApiPayload<RoadProjectQualityControl>) =>
    projectOtherApiService<RoadProjectQualityControl>().update(model, roadProjectQualityControl?.id || "", body)

  const getPayload = (values: RoadProjectQualityControl) => {
    return {
      data: {
        ...values,
        id: roadProjectQualityControl?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<RoadProjectQualityControl>,
    payload: IApiPayload<RoadProjectQualityControl>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.roadProjectQualityControl,
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
      title={`project.other.road-project-quality-control.${
        isEdit ? `edit-road-project-quality-control` : `create-road-project-quality-control`
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-project-quality-control.${
            isEdit ? `edit-road-project-quality-control` : `create-road-project-quality-control`
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadProjectQualityControl,
          }}
          createActionFunc={isEdit ? editRoadProjectQualityControl : createRoadProjectQualityControl}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadProjectQualityControl>) => {
            return <RoadProjectQualityControlForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default RoadProjectQualityControlDrawer

