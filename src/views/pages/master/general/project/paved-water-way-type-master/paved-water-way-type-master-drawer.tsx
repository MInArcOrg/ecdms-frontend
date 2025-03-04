"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import PavedWaterWayTypeMasterForm from "./paved-water-way-type-master-form"
import type { PavedWaterWayType } from "src/types/general/general-master"
import pavedWaterWayTypeMasterService from "src/services/general/project/paved-water-way-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface PavedWaterWayTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: PavedWaterWayType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const PavedWaterWayTypeMasterDrawer = (props: PavedWaterWayTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createPavedWaterWayTypeMaster = async (body: IApiPayload<PavedWaterWayType>) => {
    return await pavedWaterWayTypeMasterService.create(body)
  }

  const editPavedWaterWayTypeMaster = async (body: IApiPayload<PavedWaterWayType>) => {
    return await pavedWaterWayTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: PavedWaterWayType) => {
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
    response: IApiResponse<PavedWaterWayType>,
    payload: IApiPayload<PavedWaterWayType>,
  ) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.pavedWaterWayType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-paved-water-way-type" : "create-paved-water-way-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<PavedWaterWayType>
          edit={isEdit}
          title="master-data.general-master.paved-water-way-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editPavedWaterWayTypeMaster : createPavedWaterWayTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<PavedWaterWayType>) => {
            return (
              <>
                <PavedWaterWayTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as PavedWaterWayType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default PavedWaterWayTypeMasterDrawer

