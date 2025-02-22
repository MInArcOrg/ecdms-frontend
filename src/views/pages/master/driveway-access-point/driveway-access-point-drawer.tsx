import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import drivewayAccessPointApiService from "src/services/master-data/driveway-access-point-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { DrivewayAccessPoint } from "src/types/master/driveway-access-point"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DrivewayAccessPointForm from "./driveway-access-point-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface DrivewayAccessPointDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  drivewayAccessPoint: DrivewayAccessPoint
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const DrivewayAccessPointDrawer: React.FC<DrivewayAccessPointDrawerType> = (props) => {
  const { open, toggle, refetch, drivewayAccessPoint } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = drivewayAccessPoint?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createDrivewayAccessPoint = async (body: IApiPayload<DrivewayAccessPoint>) => {
    return await drivewayAccessPointApiService.create(body)
  }

  const editDrivewayAccessPoint = async (body: IApiPayload<DrivewayAccessPoint>) => {
    return await drivewayAccessPointApiService.update(drivewayAccessPoint?.id || "", body)
  }

  const getPayload = (values: DrivewayAccessPoint) => ({
    data: {
      ...values,
      id: drivewayAccessPoint?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (
    response: IApiResponse<DrivewayAccessPoint>,
    payload: IApiPayload<DrivewayAccessPoint>,
  ) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.driveway_access_point, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.driveway-access-point.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.driveway-access-point.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={drivewayAccessPoint}
          createActionFunc={isEdit ? editDrivewayAccessPoint : createDrivewayAccessPoint}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DrivewayAccessPoint>) => {
            return (
              <DrivewayAccessPointForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as DrivewayAccessPoint}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DrivewayAccessPointDrawer

