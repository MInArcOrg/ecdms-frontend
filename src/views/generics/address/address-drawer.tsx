import * as yup from "yup";
import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import AddressForm from "./address-form"; // Import your address form component
import { IApiPayload } from "src/types/requests";
import addressApiService from "src/services/general/address-service";
import Address from "src/types/general/address";

interface AddressDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  address: Address;
  modelId: string;
}



const AddressDrawer = (props: AddressDrawerType) => {
  
  const validationSchema = yup.object().shape({
  country: yup.string().max(255).required("Country is required"),
  region: yup.string().max(255).nullable(),
  city: yup.string().max(255).required("City is required"),
  northing: yup.number().required("Northing is required"),
  easting: yup.number().required("Easting is required"),
  subcity: yup.string().max(255).nullable(),
  street: yup.string().max(255).nullable(),
  block_number: yup.string().max(255).nullable(),
  house_number: yup.string().max(255).nullable(),
  hq: yup.boolean().nullable(),
 
  revision_no: yup.number().integer().nullable(),
});
  // ** Props
  const { open, toggle, refetch, address, modelId } = props;

  const isEdit = address?.id ? true : false;

  const createAddress = async (body: IApiPayload<Address>) => {
    return await addressApiService.create(body);
  };

  const editAddress = async (body: IApiPayload<Address>) => {
    return await addressApiService.update(address?.id || "", body);
  };

  const getPayload = (values: Address) => {
    const payload = {
      data: {
        ...values,
        id: address?.id,
        model_id: modelId,
      },
      files: [], // Adjust if you need to handle files
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
    <CustomSideDrawer
      title={`address.${isEdit ? "edit-address" : "create-address"}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`address.${isEdit ? "edit-address" : "create-address"}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{ ...address }}
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
