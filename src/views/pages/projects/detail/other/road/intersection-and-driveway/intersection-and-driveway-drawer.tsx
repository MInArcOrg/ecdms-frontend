"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import IntersectionAndDrivewayForm from "./intersection-and-driveway-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { IntersectionAndDriveway } from "src/types/project/other"

interface IntersectionAndDrivewayDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  intersectionAndDriveway: IntersectionAndDriveway
  projectId: string
  model: string
}

const IntersectionAndDrivewayDrawer = (props: IntersectionAndDrivewayDrawerType) => {
  const { open, toggle, refetch, intersectionAndDriveway, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    intersection_type_id: yup.string().required("Intersection type is required"),
    driveway_access_point_id: yup.string().required("Driveway access point is required"),
  })

  const isEdit = Boolean(intersectionAndDriveway?.id)

  const createIntersectionAndDriveway = async (body: IApiPayload<IntersectionAndDriveway>) =>
    projectOtherApiService<IntersectionAndDriveway>().create(model, body)

  const editIntersectionAndDriveway = async (body: IApiPayload<IntersectionAndDriveway>) =>
    projectOtherApiService<IntersectionAndDriveway>().update(model, intersectionAndDriveway?.id || "", body)

  const getPayload = (values: IntersectionAndDriveway) => {
    return {
      data: {
        ...values,
        id: intersectionAndDriveway?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<IntersectionAndDriveway>,
    payload: IApiPayload<IntersectionAndDriveway>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.intersectionAndDriveway,
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
      title={`project.other.intersection-and-driveway.${isEdit ? `edit-intersection-and-driveway` : `create-intersection-and-driveway`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.intersection-and-driveway.${isEdit ? `edit-intersection-and-driveway` : `create-intersection-and-driveway`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...intersectionAndDriveway,
          }}
          createActionFunc={isEdit ? editIntersectionAndDriveway : createIntersectionAndDriveway}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<IntersectionAndDriveway>) => {
            return <IntersectionAndDrivewayForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default IntersectionAndDrivewayDrawer

