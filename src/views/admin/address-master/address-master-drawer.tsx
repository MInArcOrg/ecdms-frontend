import * as yup from "yup";

import { FormikProps } from "formik";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import AddressMasterForm from "./address-master-form";
import { AddressMaster, AddressType } from "src/types/admin/address";
import { IApiPayload } from "src/types/requests";
import addressMasterApiService from "src/services/admin/address-master-service";

interface AddressMasterDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  addressMaster: AddressMaster;
  type: AddressType;
  parentAddressMaster?: AddressMaster;
}

const validationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
});

const AddressMasterDrawer = (props: AddressMasterDrawerType) => {
  // ** Props
  const { open, toggle, refetch, addressMaster, type, parentAddressMaster } =
    props;

  const isEdit = addressMaster?.id ? true : false;
  const createAddressMaster = async (body: IApiPayload<AddressMaster>) => {
    return await addressMasterApiService.create(body);
  };
  const editAddressMaster = async (body: IApiPayload<AddressMaster>) => {
    return await addressMasterApiService.update(addressMaster?.id || "", body);
  };
  const getPayload = (values: AddressMaster) => {
    const payload = {
      data: {
        ...values,
        id: addressMaster?.id,
        type: values.type || type,
        parent_address_id: parentAddressMaster?.id,
      },
      files: [],
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer
      title={`address-master.${isEdit ? "edit-" : "create-"}${
        type?.toLocaleLowerCase().replace("_", " ") || "address"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() =>
        addressMaster && (
          <FormPageWrapper
            edit={isEdit}
            title={`address-master.${isEdit ? "edit-" : "create-"}${
              type?.toLocaleLowerCase().replace("_", " ") || "address"
            }`}
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={addressMaster}
            createActionFunc={isEdit ? editAddressMaster : createAddressMaster}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<AddressMaster>) => {
              return (
                <AddressMasterForm
                  type={type}
                  formik={formik}
                  defaultLocaleData={{} as AddressMaster}
                />
              );
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default AddressMasterDrawer;
