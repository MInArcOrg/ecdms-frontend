import { FormikProps } from 'formik';
import { useState } from 'react';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AddressForm from './professional-address-form';
import professionalAddressApiService from 'src/services/resource/professional-address-service';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { uploadFile } from 'src/services/utils/file-utils';
import { ProfessionalAddress } from 'src/types/resource';

interface AddressDrawerType {
    open: boolean;
    toggle: () => void;
    refetch: () => void;
    address: ProfessionalAddress;
    professionalId: string;
}

const AddressDrawer = (props: AddressDrawerType) => {
    const { open, toggle, refetch, address, professionalId } = props;
    const [uploadableFile, setUploadableFile] = useState<File | null>(null);
    const onFileChange = (file: File | null) => {
        setUploadableFile(file);
    };

    const validationSchema = yup.object().shape({
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required')
    });

    const isEdit = Boolean(address?.id);

    const createAddress = async (body: IApiPayload<ProfessionalAddress>) =>
        professionalAddressApiService.create(body);

    const editAddress = async (body: IApiPayload<ProfessionalAddress>) =>
        professionalAddressApiService.update(address?.id || '', body);

    const getPayload = (values: ProfessionalAddress) => {
        return {
            data: {
                ...values,
                id: address?.id,
                professional_id: professionalId
            },
            files: uploadableFile ? [uploadableFile] : []
        };
    };

    const handleClose = () => toggle();

    const onActionSuccess = async (response: IApiResponse<ProfessionalAddress>, payload: IApiPayload<ProfessionalAddress>) => {
        if (payload.files.length > 0) {
            uploadFile(payload.files[0], uploadableResourceFileTypes.resource, response.payload?.id || '', '', '');
        }
        refetch();
        handleClose();
    };

    return (
        <CustomSideDrawer
            title={`professional.address.${isEdit ? 'edit' : 'create'}`}
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={isEdit}
                    title={`professional.address.${isEdit ? 'edit' : 'create'}`}
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={{
                        ...(address as ProfessionalAddress)
                    }}
                    createActionFunc={isEdit ? editAddress : createAddress}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<ProfessionalAddress>) => {
                        return <AddressForm formik={formik} />;
                    }}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default AddressDrawer;