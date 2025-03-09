"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CulvertStructuralInformationForm from "./culvert-structural-information-form"

import { useState } from "react"
import projectOtherApiService from "src/services/project/project-other-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { CulvertStructuralInformation } from "src/types/project/other"

interface CulvertStructuralInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  culvertStructuralInformation: CulvertStructuralInformation
  projectId: string
  model: string
}

const CulvertStructuralInformationDrawer = (props: CulvertStructuralInformationDrawerType) => {
  const { open, toggle, refetch, culvertStructuralInformation, projectId, model } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    pier_type_id: yup.string().required("Pier type is required"),
    abutment_type_id: yup.string().required("Abutment type is required"),
    endwall_type_inlet_id: yup.string().required("Endwall type inlet is required"),
    endwall_type_outlet_id: yup.string().required("Endwall type outlet is required"),
    paved_water_way_type_id: yup.string().required("Paved water way type is required"),
    soil_type_id: yup.string().required("Soil type is required"),
  })

  const isEdit = Boolean(culvertStructuralInformation?.id)

  const createCulvertStructuralInformation = async (body: IApiPayload<CulvertStructuralInformation>) =>
    projectOtherApiService<CulvertStructuralInformation>().create(model, body)

  const editCulvertStructuralInformation = async (body: IApiPayload<CulvertStructuralInformation>) =>
    projectOtherApiService<CulvertStructuralInformation>().update(model, culvertStructuralInformation?.id || "", body)

  const getPayload = (values: CulvertStructuralInformation) => {
    return {
      data: {
        ...values,
        id: culvertStructuralInformation?.id,
        project_id: projectId,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
  }

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<CulvertStructuralInformation>,
    payload: IApiPayload<CulvertStructuralInformation>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.culvertStructuralInformation,
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
      title={`project.other.culvert-structural-information.${isEdit ? `edit-culvert-structural-information` : `create-culvert-structural-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.culvert-structural-information.${isEdit ? `edit-culvert-structural-information` : `create-culvert-structural-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...culvertStructuralInformation,
          }}
          createActionFunc={isEdit ? editCulvertStructuralInformation : createCulvertStructuralInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CulvertStructuralInformation>) => {
            return (
              <CulvertStructuralInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CulvertStructuralInformationDrawer

