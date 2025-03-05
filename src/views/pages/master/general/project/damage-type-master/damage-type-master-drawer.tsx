"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DamageTypeMasterForm from "./damage-type-master-form"
import type { DamageType } from "src/types/general/general-master"
import damageTypeMasterService from "src/services/general/project/damage-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DamageTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DamageType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DamageTypeMasterDrawer = (props: DamageTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDamageTypeMaster = async (body: IApiPayload<DamageType>) => {
    return await damageTypeMasterService.create(body)
  }

  const editDamageTypeMaster = async (body: IApiPayload<DamageType>) => {
    return await damageTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DamageType) => {
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

  const onActionSuccess = async (response: IApiResponse<DamageType>, payload: IApiPayload<DamageType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.damageType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-damage-type" : "create-damage-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DamageType>
          edit={isEdit}
          title="master-data.general-master.damage-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDamageTypeMaster : createDamageTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DamageType>) => {
            return (
              <>
                <DamageTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DamageType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DamageTypeMasterDrawer

