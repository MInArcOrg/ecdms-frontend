import type { FormikProps } from "formik"
import type React from "react"
import { useState } from "react"
import designClassificationApiService from "src/services/master-data/design-classification-service"
import { uploadFile } from "src/services/utils/file-utils"
import type { IApiPayload, IApiResponse } from "src/types/requests"
import type { DesignClassification } from "src/types/master/design-classification"
import CustomSideDrawer from "src/views/shared/drawer/side-drawer"
import FormPageWrapper from "src/views/shared/form/form-wrapper"
import * as yup from "yup"
import DesignClassificationForm from "./design-classification-form"
import { uploadableResourceFileTypes } from "src/services/utils/file-constants"

interface DesignClassificationDrawerType {
    open: boolean
    toggle: () => void
    refetch: () => void
    designClassification: DesignClassification
}

const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    project_type_id: yup.string().required("Project Type is required"),
})

const DesignClassificationDrawer: React.FC<DesignClassificationDrawerType> = (props) => {
    const { open, toggle, refetch, designClassification } = props

    const [uploadableFile, setUploadableFile] = useState<File | null>(null)

    const isEdit = designClassification?.id ? true : false
    const onFileChange = (file: File | null) => {
        setUploadableFile(file)
    }

    const createDesignClassification = async (body: IApiPayload<DesignClassification>) => {
        return await designClassificationApiService.create(body)
    }

    const editDesignClassification = async (body: IApiPayload<DesignClassification>) => {
        return await designClassificationApiService.update(designClassification?.id || "", body)
    }

    const getPayload = (values: DesignClassification) => ({
        data: {
            ...values,
            id: designClassification?.id,
        },
        files: uploadableFile ? [uploadableFile] : [],
    })

    const handleClose = () => {
        toggle()
        setUploadableFile(null)
    }

    const onActionSuccess = async (
        response: IApiResponse<DesignClassification>,
        payload: IApiPayload<DesignClassification>,
    ) => {
        if (payload.files.length > 0) {
            if (response.payload.id) {
                uploadFile(payload.files[0], uploadableResourceFileTypes.design_classification, response.payload.id, "", "")
            }
        }
        refetch()
        toggle()
        refetch()
        handleClose()
    }

    return (
        <CustomSideDrawer
            title={`master-data.design-classification.${isEdit ? "edit" : "create"}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`master-data.design-classification.${isEdit ? "edit" : "create"}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={designClassification}
                    createActionFunc={isEdit ? editDesignClassification : createDesignClassification}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<DesignClassification>) => {
                        return (
                            <DesignClassificationForm
                                file={uploadableFile}
                                onFileChange={onFileChange}
                                formik={formik}
                                defaultLocaleData={{} as DesignClassification}
                            />
                        )
                    }}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    )
}

export default DesignClassificationDrawer

