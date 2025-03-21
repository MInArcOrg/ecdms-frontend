"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import SolarResourceInformationForm from "./solar-resource-information-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { SolarResourceInformation } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface SolarResourceInformationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  solarResourceInformation: SolarResourceInformation
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const SolarResourceInformationDrawer = (props: SolarResourceInformationDrawerType) => {
  const { open, toggle, refetch, solarResourceInformation, projectId, otherSubMenu } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    annual_solar_radiation: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    solar_panel_efficiency: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .max(100, "Efficiency cannot exceed 100%"),
    annual_energy_production: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    plant_life: yup
      .number()
      .nullable()
      .integer("Must be an integer")
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(solarResourceInformation?.id)

  const createSolarResourceInformation = async (body: IApiPayload<SolarResourceInformation>) =>
    projectOtherApiSecondService<SolarResourceInformation>().create(otherSubMenu?.apiRoute || "", body)

  const editSolarResourceInformation = async (body: IApiPayload<SolarResourceInformation>) =>
    projectOtherApiSecondService<SolarResourceInformation>().update(
      otherSubMenu?.apiRoute || "",
      solarResourceInformation?.id || "",
      body,
    )

  const getPayload = (values: SolarResourceInformation) => ({
    data: {
      project_id: projectId,
      annual_solar_radiation: values.annual_solar_radiation,
      solar_panel_efficiency: values.solar_panel_efficiency,
      annual_energy_production: values.annual_energy_production,
      plant_life: values.plant_life,
      remark: values.remark,
      id: solarResourceInformation?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<SolarResourceInformation>,
    payload: IApiPayload<SolarResourceInformation>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.solarResourceInformation,
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
      title={`project.other.solar-resource-information.${isEdit ? `edit-solar-resource-information` : `create-solar-resource-information`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.solar-resource-information.${isEdit ? `edit-solar-resource-information` : `create-solar-resource-information`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...solarResourceInformation,
          }}
          createActionFunc={isEdit ? editSolarResourceInformation : createSolarResourceInformation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SolarResourceInformation>) => {
            return <SolarResourceInformationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default SolarResourceInformationDrawer

