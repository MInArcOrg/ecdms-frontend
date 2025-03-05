"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import ExpansionJointTypeMasterForm from "./expansion-joint-type-master-form"
import type { ExpansionJointType } from "src/types/general/general-master"
import expansionJointTypeMasterService from "src/services/general/project/expansion-joint-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface ExpansionJointTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: ExpansionJointType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const ExpansionJointTypeMasterDrawer = (props: ExpansionJointTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createExpansionJointTypeMaster = async (body: IApiPayload<ExpansionJointType>) => {
    return await expansionJointTypeMasterService.create(body)
  }

  const editExpansionJointTypeMaster = async (body: IApiPayload<ExpansionJointType>) => {
    return await expansionJointTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: ExpansionJointType) => {
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
    response: IApiResponse<ExpansionJointType>,
    payload: IApiPayload<ExpansionJointType>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.expansionJointType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-expansion-joint-type" : "create-expansion-joint-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<ExpansionJointType>
          edit={isEdit}
          title="master-data.general-master.expansion-joint-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editExpansionJointTypeMaster : createExpansionJointTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<ExpansionJointType>) => {
            return (
              <>
                <ExpansionJointTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as ExpansionJointType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default ExpansionJointTypeMasterDrawer

