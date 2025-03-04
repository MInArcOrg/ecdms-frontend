import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import IntersectionTypeMasterForm from "./intersection-type-master-form"
import type { IntersectionType } from "src/types/general/general-master"
import intersectionTypeMasterService from "src/services/general/project/intersection-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface IntersectionTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: IntersectionType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const IntersectionTypeMasterDrawer = (props: IntersectionTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createIntersectionTypeMaster = async (body: IApiPayload<IntersectionType>) => {
    return await intersectionTypeMasterService.create(body)
  }

  const editIntersectionTypeMaster = async (body: IApiPayload<IntersectionType>) => {
    return await intersectionTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: IntersectionType) => {
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
    response: IApiResponse<IntersectionType>,
    payload: IApiPayload<IntersectionType>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.intersectionType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-intersection-type" : "create-intersection-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<IntersectionType>
          edit={isEdit}
          title="master-data.general-master.intersection-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editIntersectionTypeMaster : createIntersectionTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<IntersectionType>) => {
            return (
              <>
                <IntersectionTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as IntersectionType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default IntersectionTypeMasterDrawer
