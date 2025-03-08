"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import SegmentGeometryForm from "./segment-geometry-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { SegmentGeometry } from "src/types/project/other"

interface SegmentGeometryDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  segmentGeometry: SegmentGeometry
  projectId: string
  model: string
}

const SegmentGeometryDrawer = (props: SegmentGeometryDrawerType) => {
  const { open, toggle, refetch, segmentGeometry, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    cross_section_type_id: yup.string().required("Cross section type is required"),
  })

  const isEdit = Boolean(segmentGeometry?.id)

  const createSegmentGeometry = async (body: IApiPayload<SegmentGeometry>) =>
    projectOtherApiService<SegmentGeometry>().create(model, body)

  const editSegmentGeometry = async (body: IApiPayload<SegmentGeometry>) =>
    projectOtherApiService<SegmentGeometry>().update(model, segmentGeometry?.id || "", body)

  const getPayload = (values: SegmentGeometry) => {
    return {
      data: {
        ...values,
        id: segmentGeometry?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<SegmentGeometry>, payload: IApiPayload<SegmentGeometry>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.segmentGeometry, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.segment-geometry.${isEdit ? `edit-segment-geometry` : `create-segment-geometry`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.segment-geometry.${isEdit ? `edit-segment-geometry` : `create-segment-geometry`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...segmentGeometry,
          }}
          createActionFunc={isEdit ? editSegmentGeometry : createSegmentGeometry}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SegmentGeometry>) => {
            return <SegmentGeometryForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default SegmentGeometryDrawer

