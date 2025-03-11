"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import RoadDrainageForm from "./road-drainage-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { RoadDrainage } from "src/types/project/other"

interface RoadDrainageDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  roadDrainage: RoadDrainage
  projectId: string
  model: string
}

const RoadDrainageDrawer = (props: RoadDrainageDrawerType) => {
  const { open, toggle, refetch, roadDrainage, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    current_condition_id: yup.string().required("Current condition is required"),
  })

  const isEdit = Boolean(roadDrainage?.id)

  const createRoadDrainage = async (body: IApiPayload<RoadDrainage>) =>
    projectOtherApiService<RoadDrainage>().create(model, body)

  const editRoadDrainage = async (body: IApiPayload<RoadDrainage>) =>
    projectOtherApiService<RoadDrainage>().update(model, roadDrainage?.id || "", body)

  const getPayload = (values: RoadDrainage) => {
    return {
      data: {
        ...values,
        id: roadDrainage?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<RoadDrainage>, payload: IApiPayload<RoadDrainage>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.roadDrainage, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.road-drainage.${isEdit ? `edit-road-drainage` : `create-road-drainage`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-drainage.${isEdit ? `edit-road-drainage` : `create-road-drainage`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadDrainage,
          }}
          createActionFunc={isEdit ? editRoadDrainage : createRoadDrainage}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadDrainage>) => {
            return <RoadDrainageForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default RoadDrainageDrawer

