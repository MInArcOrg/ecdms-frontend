"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import BroadcastingInfrastructureAgeForm from "./broadcasting-infrastructure-age-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { BroadcastingInfrastructureAge, BroadcastingInfrastructure } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface BroadcastingInfrastructureAgeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  broadcastingInfrastructureAge: BroadcastingInfrastructureAge
  projectId: string
  otherSubMenu?: OtherMenuRoute
  broadcastingInfrastructures: BroadcastingInfrastructure[]
}

const BroadcastingInfrastructureAgeDrawer = (props: BroadcastingInfrastructureAgeDrawerType) => {
  const { 
    open, 
    toggle, 
    refetch, 
    broadcastingInfrastructureAge, 
    projectId, 
    otherSubMenu,
    broadcastingInfrastructures 
  } = props
  
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    broadcasting_infrastructure_id: yup.string().required("Broadcasting infrastructure is required"),
    antennas: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    transmitters: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    towers: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    cables: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    others: yup.string().nullable(),
  })

  const isEdit = Boolean(broadcastingInfrastructureAge?.id)

  const createBroadcastingInfrastructureAge = async (body: IApiPayload<BroadcastingInfrastructureAge>) =>
    projectOtherApiSecondService<BroadcastingInfrastructureAge>().create(otherSubMenu?.apiRoute || "", body)

  const editBroadcastingInfrastructureAge = async (body: IApiPayload<BroadcastingInfrastructureAge>) =>
    projectOtherApiSecondService<BroadcastingInfrastructureAge>().update(
      otherSubMenu?.apiRoute || "",
      broadcastingInfrastructureAge?.id || "",
      body,
    )

  const getPayload = (values: BroadcastingInfrastructureAge) => ({
    data: {
      project_id: projectId,
      broadcasting_infrastructure_id: values.broadcasting_infrastructure_id,
      antennas: values.antennas,
      transmitters: values.transmitters,
      towers: values.towers,
      cables: values.cables,
      others: values.others,
      id: broadcastingInfrastructureAge?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<BroadcastingInfrastructureAge>, 
    payload: IApiPayload<BroadcastingInfrastructureAge>
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0], 
        uploadableProjectFileTypes.other.broadcastingInfrastructureAge, 
        response.payload.id, 
        "", 
        ""
      )
    }
    
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.broadcasting-infrastructure-age.${isEdit ? `edit-broadcasting-infrastructure-age` : `create-broadcasting-infrastructure-age`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.broadcasting-infrastructure-age.${isEdit ? `edit-broadcasting-infrastructure-age` : `create-broadcasting-infrastructure-age`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...broadcastingInfrastructureAge,
          }}
          createActionFunc={isEdit ? editBroadcastingInfrastructureAge : createBroadcastingInfrastructureAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BroadcastingInfrastructureAge>) => {
            return (
              <BroadcastingInfrastructureAgeForm 
                file={uploadableFile} 
                onFileChange={onFileChange} 
                formik={formik}
                broadcastingInfrastructures={broadcastingInfrastructures}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default BroadcastingInfrastructureAgeDrawer
