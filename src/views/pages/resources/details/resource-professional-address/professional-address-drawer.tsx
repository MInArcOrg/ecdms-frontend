import { FormikProps } from 'formik';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AddressForm from './professional-address-form';
import professionalAddressApiService from 'src/services/resource/professional-address-service';
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

    const validationSchema = yup.object().shape({
        country: yup.string().required('Country is required'),
        city: yup.string().required('City is required')
    });

    const isEdit = Boolean(address?.id);

    const createAddress = async (body: IApiPayload<ProfessionalAddress>) =>
        professionalAddressApiService.create(body);

    const editAddress = async (body: IApiPayload<ProfessionalAddress>) =>
        professionalAddressApiService.update(address?.id || '', body);

    const getPayload = (values: ProfessionalAddress) => ({
        data: {
            ...values,
            id: address?.id,
            professional_id: professionalId
        },
        files: []
    });

    const handleClose = () => toggle();

    const onActionSuccess = () => {
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
                    {(formik: FormikProps<ProfessionalAddress>) => (
                        <AddressForm formik={formik} />
                    )}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default AddressDrawer;