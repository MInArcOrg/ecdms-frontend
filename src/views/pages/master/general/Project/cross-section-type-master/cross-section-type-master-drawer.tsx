import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import CrossSectionTypeMasterForm from "./cross-section-type-master-form"
import type { CrossSectionType } from "src/types/general/general-master"
import crossSectionTypeMasterService from "src/services/general/project/cross-section-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface CrossSectionTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: CrossSectionType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const CrossSectionTypeMasterDrawer = (props: CrossSectionTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createCrossSectionTypeMaster = async (body: IApiPayload<CrossSectionType>) => {
    return await crossSectionTypeMasterService.create(body)
  }

  const editCrossSectionTypeMaster = async (body: IApiPayload<CrossSectionType>) => {
    return await crossSectionTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: CrossSectionType) => {
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

  const onActionSuccess = async (response: IApiResponse<CrossSectionType>, payload: IApiPayload<CrossSectionType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.crossSectionType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-cross-section-type" : "create-cross-section-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<CrossSectionType>
          edit={isEdit}
          title="master-data.general-master.cross-section-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editCrossSectionTypeMaster : createCrossSectionTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<CrossSectionType>) => {
            return (
              <>
                <CrossSectionTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as CrossSectionType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default CrossSectionTypeMasterDrawer

