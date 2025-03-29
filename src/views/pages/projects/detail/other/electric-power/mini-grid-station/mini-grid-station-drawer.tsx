"use client"
import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import MiniGridStationForm from "./mini-grid-station-form"
import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { MiniGridStation } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface MiniGridStationDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  miniGridStation: MiniGridStation
  projectId: string
  otherSubMenu?: OtherMenuRoute
  substations: any[]
}

const MiniGridStationDrawer = (props: MiniGridStationDrawerType) => {
  const { open, toggle, refetch, miniGridStation, projectId, otherSubMenu, substations } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    substation_id: yup.string().required("Substation is required"),
    name: yup.string().required("Name is required"),
    minigrid_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    battery_type_id: yup.string().nullable(),
    battery_size: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    inverter: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    system_voltage: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    expected_annual_generation: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? null : value)),
    diesel_generator: yup.string().required("Diesel Generator is required"),
    owner_operator: yup.string().nullable(),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(miniGridStation?.id)

  const createMiniGridStation = async (body: IApiPayload<MiniGridStation>) =>
    projectOtherApiSecondService<MiniGridStation>().create(otherSubMenu?.apiRoute || "", body)

  const editMiniGridStation = async (body: IApiPayload<MiniGridStation>) =>
    projectOtherApiSecondService<MiniGridStation>().update(
      otherSubMenu?.apiRoute || "", 
      miniGridStation?.id || "", 
      body
    )

  const getPayload = (values: MiniGridStation) => ({
    data: {
      project_id: projectId,
      substation_id: values.substation_id,
      name: values.name,
      minigrid_size: values.minigrid_size,
      battery_type_id: values.battery_type_id,
      battery_size: values.battery_size,
      inverter: values.inverter,
      system_voltage: values.system_voltage,
      expected_annual_generation: values.expected_annual_generation,
      diesel_generator: values.diesel_generator,
      owner_operator: values.owner_operator,
      remark: values.remark,
      id: miniGridStation?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (response: IApiResponse<MiniGridStation>, payload: IApiPayload<MiniGridStation>) => {
    if (payload.files.length > 0) {
      await uploadFile(payload.files[0], uploadableProjectFileTypes.other.mini_grid_station, response.payload.id, "", "")
    }

    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`project.other.mini-grid-station.${isEdit ? `edit-mini-grid-station` : `create-mini-grid-station`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.mini-grid-station.${isEdit ? `edit-mini-grid-station` : `create-mini-grid-station`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...miniGridStation,
            diesel_generator: miniGridStation?.diesel_generator || 'Not Equipped',
          }}
          createActionFunc={isEdit ? editMiniGridStation : createMiniGridStation}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<MiniGridStation>) => {
            return <MiniGridStationForm 
              file={uploadableFile} 
              onFileChange={onFileChange} 
              formik={formik} 
              substations={substations}
            />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default MiniGridStationDrawer