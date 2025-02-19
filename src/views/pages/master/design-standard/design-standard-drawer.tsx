import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import designStandardApiService from "src/services/master-data/design-standard-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { DesignStandard } from "src/types/master/design-standard"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignStandardForm from "./design-standard-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface DesignStandardDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  designStandard: DesignStandard
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  project_type_id: yup.string().required("Project Type is required"),
})

const DesignStandardDrawer: React.FC<DesignStandardDrawerType> = (props) => {
  const { open, toggle, refetch, designStandard } = props

  const [uploadableFile, setUploadableFile] = useState<File | null>(null)

  const isEdit = designStandard?.id ? true : false
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }

  const createDesignStandard = async (body: IApiPayload<DesignStandard>) => {
    return await designStandardApiService.create(body)
  }

  const editDesignStandard = async (body: IApiPayload<DesignStandard>) => {
    return await designStandardApiService.update(designStandard?.id || "", body)
  }

  const getPayload = (values: DesignStandard) => ({
    data: {
      ...values,
      id: designStandard?.id,
    },
    files: uploadableFile ? [uploadableFile] : [],
  })

  const handleClose = () => {
    toggle()
    setUploadableFile(null)
  }

  const onActionSuccess = async (response: IApiResponse<DesignStandard>, payload: IApiPayload<DesignStandard>) => {
    if (payload.files.length > 0) {
      if (response.payload.id) {
        uploadFile(payload.files[0], uploadableResourceFileTypes.design_standard, response.payload.id, "", "")
      }
    }
    refetch()
    toggle()
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.design-standard.${isEdit ? "edit" : "create"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`master-data.design-standard.${isEdit ? "edit" : "create"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={designStandard}
          createActionFunc={isEdit ? editDesignStandard : createDesignStandard}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignStandard>) => {
            return (
              <DesignStandardForm
                file={uploadableFile}
                onFileChange={onFileChange}
                formik={formik}
                defaultLocaleData={{} as DesignStandard}
              />
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DesignStandardDrawer

