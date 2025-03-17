"use client"

import type { FormikProps } from "formik"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import RoadMaintenanceActivityForm from "./road-maintenance-activity-form"

import { useState } from "react"
import projectOtherApiSecondService from "src/services/project/project-other-second-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"
import { uploadFile } from "src/services/utils/file-utils"
import type { RoadMaintenanceActivity } from "src/types/project/other"
import type { OtherMenuRoute } from "src/pages/projects/[typeId]/details/[id]/other/(subMenuItems)"

interface RoadMaintenanceActivityDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  roadMaintenanceActivity: RoadMaintenanceActivity
  projectId: string
  otherSubMenu?: OtherMenuRoute
}

const RoadMaintenanceActivityDrawer = (props: RoadMaintenanceActivityDrawerType) => {
  const { open, toggle, refetch, roadMaintenanceActivity, projectId, otherSubMenu } = props
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const validationSchema = yup.object().shape({
    road_segment: yup.string().required("Road segment is required"),
    maintenance_frequency_id: yup.string().nullable(),
    maintenance_type_id: yup.string().nullable(),
    consultant: yup.string().nullable(),
    remark: yup.string().nullable(),
  })

  const isEdit = Boolean(roadMaintenanceActivity?.id)

  const createRoadMaintenanceActivity = async (body: IApiPayload<RoadMaintenanceActivity>) =>
    projectOtherApiSecondService<RoadMaintenanceActivity>().create(otherSubMenu?.apiRoute || "", body)

  const editRoadMaintenanceActivity = async (body: IApiPayload<RoadMaintenanceActivity>) =>
    projectOtherApiSecondService<RoadMaintenanceActivity>().update(
      otherSubMenu?.apiRoute || "",
      roadMaintenanceActivity?.id || "",
      body,
    )

  const getPayload = (values: RoadMaintenanceActivity) => ({
    data: {
      project_id: projectId,
      road_segment: values.road_segment,
      maintenance_frequency_id: values.maintenance_frequency_id,
      maintenance_type_id: values.maintenance_type_id,
      consultant: values.consultant,
      remark: values.remark,
      id: roadMaintenanceActivity?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => toggle()

  const onActionSuccess = async (
    response: IApiResponse<RoadMaintenanceActivity>,
    payload: IApiPayload<RoadMaintenanceActivity>,
  ) => {
    if (payload.files.length > 0) {
      await uploadFile(
        payload.files[0],
        uploadableProjectFileTypes.other.maintenanceRecord,
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
      title={`project.other.road-maintenance-activity.${isEdit ? `edit-road-maintenance-activity` : `create-road-maintenance-activity`}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`project.other.road-maintenance-activity.${isEdit ? `edit-road-maintenance-activity` : `create-road-maintenance-activity`}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...roadMaintenanceActivity,
          }}
          createActionFunc={isEdit ? editRoadMaintenanceActivity : createRoadMaintenanceActivity}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<RoadMaintenanceActivity>) => {
            return <RoadMaintenanceActivityForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default RoadMaintenanceActivityDrawer

