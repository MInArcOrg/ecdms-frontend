"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import TrafficParameterForm from "./traffic-parameter-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { TrafficParameter } from "src/types/project/other"

interface TrafficParameterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  trafficParameter: TrafficParameter
  projectId: string
  model: string
}

const TrafficParameterDrawer = (props: TrafficParameterDrawerType) => {
  const { open, toggle, refetch, trafficParameter, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    pedestrian_facility_id: yup.string().required("Pedestrian facility is required"),
  })

  const isEdit = Boolean(trafficParameter?.id)

  const createTrafficParameter = async (body: IApiPayload<TrafficParameter>) =>
    projectOtherApiService<TrafficParameter>().create(model, body)

  const editTrafficParameter = async (body: IApiPayload<TrafficParameter>) =>
    projectOtherApiService<TrafficParameter>().update(model, trafficParameter?.id || "", body)

  const getPayload = (values: TrafficParameter) => {
    return {
      data: {
        ...values,
        id: trafficParameter?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<TrafficParameter>, payload: IApiPayload<TrafficParameter>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.trafficParameter, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.traffic-parameter.${isEdit ? `edit-traffic-parameter` : `create-traffic-parameter`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.traffic-parameter.${isEdit ? `edit-traffic-parameter` : `create-traffic-parameter`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...trafficParameter,
          }}
          createActionFunc={isEdit ? editTrafficParameter : createTrafficParameter}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TrafficParameter>) => {
            return <TrafficParameterForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default TrafficParameterDrawer

