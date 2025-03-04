import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DrivewayAccessPointMasterForm from "./driveway-access-point-master-form"
import type { DrivewayAccessPoint } from "src/types/general/general-master"
import drivewayAccessPointMasterService from "src/services/general/project/driveway-access-point-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DrivewayAccessPointMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DrivewayAccessPoint
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DrivewayAccessPointMasterDrawer = (props: DrivewayAccessPointMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDrivewayAccessPointMaster = async (body: IApiPayload<DrivewayAccessPoint>) => {
    return await drivewayAccessPointMasterService.create(body)
  }

  const editDrivewayAccessPointMaster = async (body: IApiPayload<DrivewayAccessPoint>) => {
    return await drivewayAccessPointMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DrivewayAccessPoint) => {
    const payload = {
      data: {
        ...values,
        id: masterData?.id,
      },
      files: uploadableFile ? [uploadableFile] : [],
    }
    return payload
  }

  const handleClose = () => {
    toggle()
  }

  const onActionSuccess = async (
    response: IApiResponse<DrivewayAccessPoint>,
    payload: IApiPayload<DrivewayAccessPoint>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.drivewayAccessPoint, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-driveway-access-point" : "create-driveway-access-point"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DrivewayAccessPoint>
          edit={isEdit}
          title="master-data.general-master.driveway-access-points"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDrivewayAccessPointMaster : createDrivewayAccessPointMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DrivewayAccessPoint>) => {
            return (
              <>
                <DrivewayAccessPointMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DrivewayAccessPoint}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DrivewayAccessPointMasterDrawer

