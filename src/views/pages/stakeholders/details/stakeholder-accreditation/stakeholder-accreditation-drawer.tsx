import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';

import { useState } from 'react';
import stakeholderAccreditationApiService from 'src/services/stakeholder/stakeholder-accreditation-service';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { uploadFile, useInvalidateFileQueries } from 'src/services/utils/file-utils';
import { StakeholderAccreditation } from 'src/types/stakeholder/stakeholder-accreditation';
import StakeholderAccreditationForm from './stakeholder-accreditation-form';

interface StakeholderAccreditationDrawerType {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    stakeholderAccreditation: StakeholderAccreditation;
    stakeholderId: string;
}

const StakeholderAccreditationDrawer = (props: StakeholderAccreditationDrawerType) => {
    const { open, toggle, refetch, stakeholderAccreditation, stakeholderId } = props;
    const [uploadableFile, setUploadableFile] = useState<File | null>(null);
    const invalidateFileQueries = useInvalidateFileQueries();

    const onFileChange = (file: File | null) => {
        setUploadableFile(file);
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('Title is required')
    });

    const isEdit = Boolean(stakeholderAccreditation?.id);

    const createStakeholderAccreditation = async (body: IApiPayload<StakeholderAccreditation>) =>
        stakeholderAccreditationApiService.create(body);

    const editStakeholderAccreditation = async (body: IApiPayload<StakeholderAccreditation>) =>
        stakeholderAccreditationApiService.update(stakeholderAccreditation?.id || '', body);

    const getPayload = (values: StakeholderAccreditation) => ({
        data: {
            ...values,
            id: stakeholderAccreditation?.id,
            stakeholder_id: stakeholderId,
            title: values.title,
            description: values.description,
        },
        files: uploadableFile ? [uploadableFile] : []
    });

    const handleClose = () => toggle();

    const onActionSuccess = async (response: IApiResponse<StakeholderAccreditation>, payload: IApiPayload<StakeholderAccreditation>) => {
        if (payload.files.length > 0) {
            await uploadFile(payload.files[0], uploadableStakeholderFileTypes.stakeholderAccreditation, response.payload.id, '', '');
        }
        invalidateFileQueries(response.payload.id, uploadableStakeholderFileTypes.stakeholderAccreditation);
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`stakeholder.stakeholder-accreditation.${isEdit ? 'edit' : 'create'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`stakeholder.stakeholder-accreditation.title`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...stakeholderAccreditation,
                        title: stakeholderAccreditation?.title || '',
                        description: stakeholderAccreditation?.description || '',
                    }}
                    createActionFunc={isEdit ? editStakeholderAccreditation : createStakeholderAccreditation}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<StakeholderAccreditation>) => {
                        return <StakeholderAccreditationForm file={uploadableFile} onFileChange={onFileChange} formik={formik} />;
                    }}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default StakeholderAccreditationDrawer;
