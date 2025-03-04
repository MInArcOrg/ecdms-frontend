"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import PierTypeMasterForm from "./pier-type-master-form"
import type { PierType } from "src/types/general/general-master"
import pierTypeMasterService from "src/services/general/project/pier-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface PierTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: PierType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const PierTypeMasterDrawer = (props: PierTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createPierTypeMaster = async (body: IApiPayload<PierType>) => {
    return await pierTypeMasterService.create(body)
  }

  const editPierTypeMaster = async (body: IApiPayload<PierType>) => {
    return await pierTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: PierType) => {
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

  const onActionSuccess = async (response: IApiResponse<PierType>, payload: IApiPayload<PierType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.pierType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-pier-type" : "create-pier-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<PierType>
          edit={isEdit}
          title="master-data.general-master.pier-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editPierTypeMaster : createPierTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<PierType>) => {
            return (
              <>
                <PierTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as PierType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default PierTypeMasterDrawer

