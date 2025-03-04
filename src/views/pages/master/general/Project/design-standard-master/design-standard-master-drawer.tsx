import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignStandardMasterForm from "./design-standard-master-form"
import type { DesignStandard } from "src/types/general/general-master"
import designStandardMasterService from "src/services/general/project/design-standard-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DesignStandardMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DesignStandard
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DesignStandardMasterDrawer = (props: DesignStandardMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDesignStandardMaster = async (body: IApiPayload<DesignStandard>) => {
    return await designStandardMasterService.create(body)
  }

  const editDesignStandardMaster = async (body: IApiPayload<DesignStandard>) => {
    return await designStandardMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DesignStandard) => {
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

  const onActionSuccess = async (response: IApiResponse<DesignStandard>, payload: IApiPayload<DesignStandard>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.designStandard, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-design-standard" : "create-design-standard"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DesignStandard>
          edit={isEdit}
          title="master-data.general-master.design-standards"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDesignStandardMaster : createDesignStandardMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignStandard>) => {
            return (
              <>
                <DesignStandardMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DesignStandard}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DesignStandardMasterDrawer

