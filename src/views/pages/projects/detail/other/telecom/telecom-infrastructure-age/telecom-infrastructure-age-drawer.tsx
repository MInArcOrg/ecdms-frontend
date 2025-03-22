"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import TelecomInfrastructureAgeForm from "./telecom-infrastructure-age-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { TelecomInfrastructureAge } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface TelecomInfrastructureAgeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  telecomInfrastructureAge: TelecomInfrastructureAge
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const TelecomInfrastructureAgeDrawer = (props: TelecomInfrastructureAgeDrawerType) => {
  const { open, toggle, refetch, telecomInfrastructureAge, projectId, otherSubMenu } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    cables: yup.boolean().nullable(),
    wires: yup.boolean().nullable(),
    routers: yup.boolean().nullable(),
    switches: yup.boolean().nullable(),
    hubs: yup.boolean().nullable(),
    repeaters: yup.boolean().nullable(),
    antennas: yup.boolean().nullable(),
    towers: yup.boolean().nullable(),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(telecomInfrastructureAge?.id)

  const createTelecomInfrastructureAge = async (body: IApiPayload<TelecomInfrastructureAge>) =>
    projectOtherApiSecondService<TelecomInfrastructureAge>().create(otherSubMenu?.apiRoute || "", body)

  const editTelecomInfrastructureAge = async (body: IApiPayload<TelecomInfrastructureAge>) =>
    projectOtherApiSecondService<TelecomInfrastructureAge>().update(
      otherSubMenu?.apiRoute || "",
      telecomInfrastructureAge?.id || "",
      body,
    )

  const getPayload = (values: TelecomInfrastructureAge) => ({
    data: {
      project_id: projectId,
      cables: values.cables,
      wires: values.wires,
      routers: values.routers,
      switches: values.switches,
      hubs: values.hubs,
      repeaters: values.repeaters,
      antennas: values.antennas,
      towers: values.towers,
      remark: values.remark,
      id: telecomInfrastructureAge?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<TelecomInfrastructureAge>,
    payload: IApiPayload<TelecomInfrastructureAge>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.infrastructureAge,
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
      title={`project.other.telecom-infrastructure-age.${isEdit ? `edit-telecom-infrastructure-age` : `create-telecom-infrastructure-age`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.telecom-infrastructure-age.${isEdit ? `edit-telecom-infrastructure-age` : `create-telecom-infrastructure-age`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...telecomInfrastructureAge,
          }}
          createActionFunc={isEdit ? editTelecomInfrastructureAge : createTelecomInfrastructureAge}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<TelecomInfrastructureAge>) => {
            return <TelecomInfrastructureAgeForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default TelecomInfrastructureAgeDrawer

