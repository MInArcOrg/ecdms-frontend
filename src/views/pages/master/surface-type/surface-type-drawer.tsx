import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import surfaceTypeApiService from "src/services/master-data/surface-type-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { SurfaceType } from "src/types/master/surface-type"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import SurfaceTypeForm from "./surface-type-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface SurfaceTypeDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  surfaceType: SurfaceType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const SurfaceTypeDrawer: React.FC<SurfaceTypeDrawerType> = (props) => {
  const { open, toggle, refetch, surfaceType } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = surfaceType?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createSurfaceType = async (body: IApiPayload<SurfaceType>) => {
    return await surfaceTypeApiService.create(body)
  }

  const editSurfaceType = async (body: IApiPayload<SurfaceType>) => {
    return await surfaceTypeApiService.update(surfaceType?.id || "", body)
  }

  const getPayload = (values: SurfaceType) => ({
    data: {
      ...values,
      id: surfaceType?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (response: IApiResponse<SurfaceType>, payload: IApiPayload<SurfaceType>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.surface_type, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer title={`master-data.surface-type.${isEdit ? "edit" : "create"}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.surface-type.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={surfaceType}
          createActionFunc={isEdit ? editSurfaceType : createSurfaceType}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<SurfaceType>) => {
            return (
              <SurfaceTypeForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as SurfaceType}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default SurfaceTypeDrawer

