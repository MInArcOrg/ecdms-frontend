"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import TelecomInfrastructureComponentForm from "./telecom-infrastructure-component-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { TelecomInfrastructureComponent } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface TelecomInfrastructureComponentDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  telecomInfrastructureComponent: TelecomInfrastructureComponent
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const TelecomInfrastructureComponentDrawer = (props: TelecomInfrastructureComponentDrawerType) => {
  const { open, toggle, refetch, telecomInfrastructureComponent, projectId, otherSubMenu } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    mobile_network_type_id: yup.string().required("Mobile network type is required"),
    cables: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    wires: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    routers: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    switches: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    hubs: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    repeaters: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    antennas: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    towers: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(telecomInfrastructureComponent?.id)

  const createTelecomInfrastructureComponent = async (body: IApiPayload<TelecomInfrastructureComponent>) =>
    projectOtherApiSecondService<TelecomInfrastructureComponent>().create(otherSubMenu?.apiRoute || "", body)

  const editTelecomInfrastructureComponent = async (body: IApiPayload<TelecomInfrastructureComponent>) =>
    projectOtherApiSecondService<TelecomInfrastructureComponent>().update(
      otherSubMenu?.apiRoute || "",
      telecomInfrastructureComponent?.id || "",
      body,
    )

  const getPayload = (values: TelecomInfrastructureComponent) => ({
    data: {
      project_id: projectId,
      mobile_network_type_id: values.mobile_network_type_id,
      cables: values.cables,
      wires: values.wires,
      routers: values.routers,
      switches: values.switches,
      hubs: values.hubs,
      repeaters: values.repeaters,
      antennas: values.antennas,
      towers: values.towers,
      remark: values.remark,
      id: telecomInfrastructureComponent?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<TelecomInfrastructureComponent>,
    payload: IApiPayload<TelecomInfrastructureComponent>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.telecomInfrastructureComponent,
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
      title={`project.other.telecom-infrastructure-component.${isEdit ? `edit-telecom-infrastructure-component` : `create-telecom-infrastructure-component`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.telecom-infrastructure-component.${isEdit ? `edit-telecom-infrastructure-component` : `create-telecom-infrastructure-component`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...telecomInfrastructureComponent,
          }}
          createActionFunc={isEdit ? editTelecomInfrastructureComponent : createTelecomInfrastructureComponent}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TelecomInfrastructureComponent>) => {
            return (
              <TelecomInfrastructureComponentForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default TelecomInfrastructureComponentDrawer

