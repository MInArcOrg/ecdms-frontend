"use client"
import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import ElectricDistributionTransformerTypeForm from "./electric-distribution-transformer-type-form"
import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { ElectricDistributionTransformerType, MiniGridStation } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface ElectricDistributionTransformerTypeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  electricDistributionTransformerType: ElectricDistributionTransformerType
  projectId: string
  otherSubMenu?: OtherMenuRoute
  miniGridStations: MiniGridStation[]
  transformerTypes: any[]
  protectionInstalled: any[]
  safetyProblemsEncountered: any[]
}

const ElectricDistributionTransformerTypeDrawer = (props: ElectricDistributionTransformerTypeDrawerType) => {
  const { 
    open, 
    toggle, 
    refetch, 
    electricDistributionTransformerType, 
    projectId, 
    otherSubMenu, 
    miniGridStations,
    transformerTypes,
    protectionInstalled,
    safetyProblemsEncountered
  } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    mini_grid_station_id: yup.string().required("Mini Grid Station is required"),
    name: yup.string().required("Name is required"),
    transformer_type_id: yup.string().required("Transformer Type is required"),
    cooling_type: yup.string().required("Cooling Type is required"),
    transformer_power_rating: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    lifetime: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Lifetime must be an integer"),
    protection_installed_id: yup.string().required("Protection Installed is required"),
    safety_problems_encountered_id: yup.string().required("Safety Problems Encountered is required"),
    work_accidents_number: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value))
      .integer("Work accidents number must be an integer"),
    on_site_safety_regulation_implemented: yup.boolean().nullable(),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(electricDistributionTransformerType?.id)

  const createElectricDistributionTransformerType = async (body: IApiPayload<ElectricDistributionTransformerType>) =>
    projectOtherApiSecondService<ElectricDistributionTransformerType>().create(otherSubMenu?.apiRoute || "", body)

  const editElectricDistributionTransformerType = async (body: IApiPayload<ElectricDistributionTransformerType>) =>
    projectOtherApiSecondService<ElectricDistributionTransformerType>().update(
      otherSubMenu?.apiRoute || "", 
      electricDistributionTransformerType?.id || "", 
      body
    )

  const getPayload = (values: ElectricDistributionTransformerType) => ({
    data: {
      project_id: projectId,
      mini_grid_station_id: values.mini_grid_station_id,
      name: values.name,
      transformer_type_id: values.transformer_type_id,
      cooling_type: values.cooling_type,
      transformer_power_rating: values.transformer_power_rating,
      lifetime: values.lifetime,
      protection_installed_id: values.protection_installed_id,
      safety_problems_encountered_id: values.safety_problems_encountered_id,
      work_accidents_number: values.work_accidents_number,
      on_site_safety_regulation_implemented: values.on_site_safety_regulation_implemented,
      remark: values.remark,
      id: electricDistributionTransformerType?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<ElectricDistributionTransformerType>, payload: IApiPayload<ElectricDistributionTransformerType>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.electric_distribution_transformer_type, response.payload.id, "", "")
    }

    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.electric-distribution-transformer-type.${isEdit ? `edit-electric-distribution-transformer-type` : `create-electric-distribution-transformer-type`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.electric-distribution-transformer-type.${isEdit ? `edit-electric-distribution-transformer-type` : `create-electric-distribution-transformer-type`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...electricDistributionTransformerType,
            cooling_type: electricDistributionTransformerType?.cooling_type || 'Oil Immersed',
          }}
          createActionFunc={isEdit ? editElectricDistributionTransformerType : createElectricDistributionTransformerType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ElectricDistributionTransformerType>) => {
            return <ElectricDistributionTransformerTypeForm 
              file={uploadableFile} 
              onFileChange={onFileChange} 
              formik={formik} 
              miniGridStations={miniGridStations}
              transformerTypes={transformerTypes}
              protectionInstalled={protectionInstalled}
              safetyProblemsEncountered={safetyProblemsEncountered}
            />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default ElectricDistributionTransformerTypeDrawer