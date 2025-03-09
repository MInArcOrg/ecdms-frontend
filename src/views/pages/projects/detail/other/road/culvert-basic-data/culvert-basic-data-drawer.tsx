"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CulvertBasicDataForm from "./culvert-basic-data-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { CulvertBasicData } from "src/types/project/other"

interface CulvertBasicDataDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  culvertBasicData: CulvertBasicData
  projectId: string
  model: string
}

const CulvertBasicDataDrawer = (props: CulvertBasicDataDrawerType) => {
  const { open, toggle, refetch, culvertBasicData, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    culvert_name: yup.string().required("Culvert name is required"),
    area_topography_id: yup.string().required("Area topography is required"),
  })

  const isEdit = Boolean(culvertBasicData?.id)

  const createCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiService<CulvertBasicData>().create(model, body)

  const editCulvertBasicData = async (body: IApiPayload<CulvertBasicData>) =>
    projectOtherApiService<CulvertBasicData>().update(model, culvertBasicData?.id || "", body)

  const getPayload = (values: CulvertBasicData) => {
    return {
      data: {
        ...values,
        id: culvertBasicData?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<CulvertBasicData>, payload: IApiPayload<CulvertBasicData>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.other.culvertBasicData, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-basic-data.${isEdit ? `edit-culvert-basic-data` : `create-culvert-basic-data`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertBasicData,
          }}
          createActionFunc={isEdit ? editCulvertBasicData : createCulvertBasicData}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertBasicData>) => {
            return <CulvertBasicDataForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CulvertBasicDataDrawer

