import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import SurfaceTypeMasterForm from "./surface-type-master-form"
import type { SurfaceType } from "src/types/general/general-master"
import surfaceTypeMasterService from "src/services/general/project/surface-type-master-service"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface SurfaceTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: SurfaceType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const SurfaceTypeMasterDrawer = (props: SurfaceTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createSurfaceTypeMaster = async (body: IApiPayload<SurfaceType>) => {
    return await surfaceTypeMasterService.create(body)
  }

  const editSurfaceTypeMaster = async (body: IApiPayload<SurfaceType>) => {
    return await surfaceTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: SurfaceType) => {
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

  const onActionSuccess = async (response: IApiResponse<SurfaceType>, payload: IApiPayload<SurfaceType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableResourceFileTypes.surface_type, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-surface-type" : "create-surface-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<SurfaceType>
          edit={isEdit}
          title="master-data.general-master.surface-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editSurfaceTypeMaster : createSurfaceTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SurfaceType>) => {
            return (
              <>
                <SurfaceTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as SurfaceType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default SurfaceTypeMasterDrawer

