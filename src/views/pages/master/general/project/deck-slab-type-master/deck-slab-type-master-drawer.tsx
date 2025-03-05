"use client"

import type { FormikProps } from "formik"
import { useState } from "react"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DeckSlabTypeMasterForm from "./deck-slab-type-master-form"
import type { DeckSlabType } from "src/types/general/general-master"
import deckSlabTypeMasterService from "src/services/general/project/deck-slab-type-master-service"
import { uploadableProjectFileTypes } from "src/services/utils/file-constants"

interface DeckSlabTypeMasterDrawerType {
  open: boolean
  toggle: () => void
  refetch: () => void
  masterData: DeckSlabType
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
})

const DeckSlabTypeMasterDrawer = (props: DeckSlabTypeMasterDrawerType) => {
  const { open, toggle, refetch, masterData } = props

  const isEdit = Boolean(masterData?.id)
  const [uploadableFile, setUploadableFile] = useState<File | null>(null)
  const onFileChange = (file: File | null) => {
    setUploadableFile(file)
  }
  const createDeckSlabTypeMaster = async (body: IApiPayload<DeckSlabType>) => {
    return await deckSlabTypeMasterService.create(body)
  }

  const editDeckSlabTypeMaster = async (body: IApiPayload<DeckSlabType>) => {
    return await deckSlabTypeMasterService.update(masterData?.id || "", body)
  }

  const getPayload = (values: DeckSlabType) => {
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

  const onActionSuccess = async (response: IApiResponse<DeckSlabType>, payload: IApiPayload<DeckSlabType>) => {
    if (payload.files.length > 0) {
      uploadFile(payload.files[0], uploadableProjectFileTypes.deckSlabType, response.payload.id, "", "")
    }
    refetch()
    handleClose()
  }

  return (
    <CustomSideDrawer
      title={`master-data.general-master.${isEdit ? "edit-deck-slab-type" : "create-deck-slab-type"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper<DeckSlabType>
          edit={isEdit}
          title="master-data.general-master.deck-slab-types"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={masterData}
          createActionFunc={isEdit ? editDeckSlabTypeMaster : createDeckSlabTypeMaster}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<DeckSlabType>) => {
            return (
              <>
                <DeckSlabTypeMasterForm
                  file={uploadableFile}
                  onFileChange={onFileChange}
                  formik={formik}
                  defaultLocaleData={{} as DeckSlabType}
                />
              </>
            )
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  )
}

export default DeckSlabTypeMasterDrawer

