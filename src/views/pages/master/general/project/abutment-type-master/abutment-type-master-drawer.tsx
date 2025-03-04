"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import AbutmentTypeMasterForm from "./abutment-type-master-form"
import type { AbutmentType } from "src/types/general/general-master"
import abutmentTypeMasterService from "src/services/general/project/abutment-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface AbutmentTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: AbutmentType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const AbutmentTypeMasterDrawer = (props: AbutmentTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createAbutmentTypeMaster = async (body: IApiPayload<AbutmentType>) => {
    return await abutmentTypeMasterService.create(body)
  }

  const editAbutmentTypeMaster = async (body: IApiPayload<AbutmentType>) => {
    return await abutmentTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: AbutmentType) => {
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

  const onActionSuccess = async (response: IApiResponse<AbutmentType>, payload: IApiPayload<AbutmentType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.abutmentType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-abutment-type" : "create-abutment-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<AbutmentType>
          edit={isEdit}
          title="master-data.general-master.abutment-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editAbutmentTypeMaster : createAbutmentTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<AbutmentType>) => {
            return (
              <>
                <AbutmentTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as AbutmentType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default AbutmentTypeMasterDrawer

