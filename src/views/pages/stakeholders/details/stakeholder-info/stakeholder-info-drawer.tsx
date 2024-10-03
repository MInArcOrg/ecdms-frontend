/* eslint-disable prettier/prettier */

import * as yup from "yup";
import { FormikProps } from "formik";
import { useState } from "react";
import stakeholderInfoApiService from "src/services/stakeholder/stakeholder-info-service";
import { uploadFile } from "src/services/utils/file-utils";
import { IApiPayload, IApiResponse } from "src/types/requests";
import { StakeholderInfo } from "src/types/stakeholder";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import StakeholderInfoForm from "./stakeholder-info-form";
import { uploadableStakeholderFileTypes } from "src/services/utils/file-constants";

interface StakeholderInfoDrawerType {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    stakeholderInfo: StakeholderInfo;
    stakeholder_id: string;
}

const validationSchema = yup.object().shape({
    id: yup.string().nullable(), // Optional, only required for updates
    capital: yup.string().nullable(), // Optional string
    general_manager: yup.string().nullable(), // Optional string
    description: yup.string().nullable(), // Optional text
});


const StakeholderInfoDrawer = (props: StakeholderInfoDrawerType) => {
    const { open, toggle, refetch, stakeholderInfo, stakeholder_id } = props;

    const [uploadableFile, setUploadableFile] = useState<File | null>(null);

    const onFileChange = (file: File | null) => {
        setUploadableFile(file);
    };

    const isEdit = stakeholderInfo?.id ? true : false;

    const createResource = async (body: IApiPayload<StakeholderInfo>) => {
        return await stakeholderInfoApiService.create(body);
    };

    const editResource = async (body: IApiPayload<StakeholderInfo>) => {
        return await stakeholderInfoApiService.update(stakeholderInfo?.id || "", body);
    };

    const getPayload = (values: StakeholderInfo) => {
        const payload = {
            data: {
                ...values,
                id: stakeholderInfo?.id,
                stakeholder_id: stakeholder_id,
            },
            files: uploadableFile ? [uploadableFile] : []
        };
        return payload;
    };

    const handleClose = () => {
        toggle();
    };

    const onActionSuccess = async (
        response: IApiResponse<StakeholderInfo>,
        payload: IApiPayload<StakeholderInfo>
    ) => {
        if (payload.files.length > 0) {
            await uploadFile(
                payload.files[0],
                uploadableStakeholderFileTypes.stakeholderInfo,
                response.payload.id,
                '',
                ''
            );
        }
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`stakeholder.stakeholder-info.${isEdit ? "edit-stakeholder-info" : "create-stakeholder-info"}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`stakeholder.stakeholder-info.${isEdit ? "edit-stakeholder-info" : "create-stakeholder-info"}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...stakeholderInfo
                    }}
                    createActionFunc={isEdit ? editResource : createResource}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<StakeholderInfo>) => (
                        <StakeholderInfoForm
                            file={uploadableFile}
                            onFileChange={onFileChange}
                            formik={formik}
                        />
                    )}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default StakeholderInfoDrawer;

