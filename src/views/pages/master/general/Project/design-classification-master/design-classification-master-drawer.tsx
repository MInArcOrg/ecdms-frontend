import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignClassificationMasterForm from "./design-classification-master-form"
import type { DesignClassification } from "src/types/general/general-master"
import designClassificationMasterService from "src/services/general/project/design-classification-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DesignClassificationMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DesignClassification
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DesignClassificationMasterDrawer = (props: DesignClassificationMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDesignClassificationMaster = async (body: IApiPayload<DesignClassification>) => {
    return await designClassificationMasterService.create(body)
  }

  const editDesignClassificationMaster = async (body: IApiPayload<DesignClassification>) => {
    return await designClassificationMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DesignClassification) => {
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
    response: IApiResponse<DesignClassification>,
    payload: IApiPayload<DesignClassification>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.designClassification, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-design-classification" : "create-design-classification"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DesignClassification>
          edit={isEdit}
          title="master-data.general-master.design-classifications"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDesignClassificationMaster : createDesignClassificationMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DesignClassification>) => {
            return (
              <>
                <DesignClassificationMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DesignClassification}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DesignClassificationMasterDrawer

