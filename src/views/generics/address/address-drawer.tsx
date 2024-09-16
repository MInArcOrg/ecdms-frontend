import * as yup from 'yup';
import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import AddressForm from './address-form'; // Import your address form component
import { IApiPayload } from 'src/types/requests';
import addressApiService from 'src/services/general/address-service';
import Address from 'src/types/general/address';

interface AddressDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  address: Address;
  modelId: string;
}

const validationSchema = yup.object().shape({
  country: yup.string().required(),
  region: yup.string(),
  city: yup.string(),
  subcity: yup.string(),
  street: yup.string(),
  block_number: yup.string(),
  house_number: yup.string(),
  northing: yup.number().required(),
  easting: yup.number().required()
});

const AddressDrawer = (props: AddressDrawerType) => {
  // ** Props
  const { open, toggle, refetch, address, modelId } = props;

  const isEdit = address?.id ? true : false;

  const createAddress = async (body: IApiPayload<Address>) => {
    return await addressApiService.create(body);
  };

  const editAddress = async (body: IApiPayload<Address>) => {
    return await addressApiService.update(address?.id || '', body);
  };

  const getPayload = (values: Address) => {
    const payload = {
      data: {
        ...values,
        id: address?.id,
        model_id: modelId
      },
      files: [] // Adjust if you need to handle files
    };
    return payload;
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`address.${isEdit ? 'edit-address' : 'create-address'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`address.${isEdit ? 'edit-address' : 'create-address'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...(address as Address) }}
          createActionFunc={isEdit ? editAddress : createAddress}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Address>) => {
            return <AddressForm formik={formik} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AddressDrawer;
