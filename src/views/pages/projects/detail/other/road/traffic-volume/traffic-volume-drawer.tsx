"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import TrafficVolumeForm from "./traffic-volume-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { TrafficVolume } from "src/types/project/other"

interface TrafficVolumeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  trafficVolume: TrafficVolume
  projectId: string
  model: string
}

const TrafficVolumeDrawer = (props: TrafficVolumeDrawerType) => {
  const { open, toggle, refetch, trafficVolume, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    count_type_id: yup.string().required("Count type is required"),
  })

  const isEdit = Boolean(trafficVolume?.id)

  const createTrafficVolume = async (body: IApiPayload<TrafficVolume>) =>
    projectOtherApiService<TrafficVolume>().create(model, body)

  const editTrafficVolume = async (body: IApiPayload<TrafficVolume>) =>
    projectOtherApiService<TrafficVolume>().update(model, trafficVolume?.id || "", body)

  const getPayload = (values: TrafficVolume) => {
    return {
      data: {
        ...values,
        id: trafficVolume?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<TrafficVolume>, payload: IApiPayload<TrafficVolume>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.trafficVolume, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.traffic-volume.${isEdit ? `edit-traffic-volume` : `create-traffic-volume`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.traffic-volume.${isEdit ? `edit-traffic-volume` : `create-traffic-volume`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...trafficVolume,
          }}
          createActionFunc={isEdit ? editTrafficVolume : createTrafficVolume}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TrafficVolume>) => {
            return <TrafficVolumeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default TrafficVolumeDrawer

