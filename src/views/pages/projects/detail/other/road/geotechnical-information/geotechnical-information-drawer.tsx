"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import GeotechnicalInformationForm from "./geotechnical-information-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { GeotechnicalInformation } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface GeotechnicalInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  geotechnicalInformation: GeotechnicalInformation
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const GeotechnicalInformationDrawer = (props: GeotechnicalInformationDrawerType) => {
  const { open, toggle, refetch, geotechnicalInformation, projectId, otherSubMenu } = props
  const [uploadableFiles, setUploadableFiles] = useState<{
    seismicDesign: File | null
    geotechnicalReport: File | null
    foundationDesign: File | null
  }>({
    seismicDesign: null,
    geotechnicalReport: null,
    foundationDesign: null,
  })

  const onFileChange = (fileType: string, file: File | null) => {
    setUploadableFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }))
  }

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    soil_type_id: yup.string().required("Soil type is required"),
    ground_water_impact_id: yup.string().required("Ground water impact is required"),
    slope_stability_id: yup.string().required("Slope stability is required"),
    soil_bearing_capacity: yup.number().nullable(),
    retaining_walls: yup.boolean().nullable(),
    geological_hazard: yup.string().nullable(),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(geotechnicalInformation?.id)

  const createGeotechnicalInformation = async (body: IApiPayload<GeotechnicalInformation>) =>
    projectOtherApiSecondService<GeotechnicalInformation>().create(otherSubMenu?.apiRoute || "", body)

  const editGeotechnicalInformation = async (body: IApiPayload<GeotechnicalInformation>) =>
    projectOtherApiSecondService<GeotechnicalInformation>().update(
      otherSubMenu?.apiRoute || "",
      geotechnicalInformation?.id || "",
      body,
    )

  const getPayload = (values: GeotechnicalInformation) => ({
    data: {
      project_id: projectId,
      name: values.name,
      soil_type_id: values.soil_type_id,
      ground_water_impact_id: values.ground_water_impact_id,
      soil_bearing_capacity: values.soil_bearing_capacity,
      slope_stability_id: values.slope_stability_id,
      retaining_walls: values.retaining_walls,
      geological_hazard: values.geological_hazard,
      remark: values.remark,
      id: geotechnicalInformation?.id,
    },
    files: [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<GeotechnicalInformation>,
    payload: IApiPayload<GeotechnicalInformation>,
  ) => {
    const recordId = response.payload.id

    // Upload each file type if provided
    if (uploadableFiles.seismicDesign) {
      await uploadFile(uploadableFiles.seismicDesign, uploadableProjectFileTypes.other.seismicDesign, recordId, "", "")
    }

    if (uploadableFiles.geotechnicalReport) {
      await uploadFile(
        uploadableFiles.geotechnicalReport,
        uploadableProjectFileTypes.other.geotechnicalReport,
        recordId,
        "",
        "",
      )
    }

    if (uploadableFiles.foundationDesign) {
      await uploadFile(
        uploadableFiles.foundationDesign,
        uploadableProjectFileTypes.other.foundationDesign,
        recordId,
        "",
        "",
      )
    }

    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.geotechnical-information.${isEdit ? `edit-geotechnical-information` : `create-geotechnical-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.geotechnical-information.${isEdit ? `edit-geotechnical-information` : `create-geotechnical-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...geotechnicalInformation,
          }}
          createActionFunc={isEdit ? editGeotechnicalInformation : createGeotechnicalInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<GeotechnicalInformation>) => {
            return <GeotechnicalInformationForm files={uploadableFiles} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default GeotechnicalInformationDrawer

