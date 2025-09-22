import type { FormikProps } from "formik";
import type { IApiPayload } from "src/types/requests";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import FormPageWrapper from "src/views/shared/form/form-wrapper";
import * as yup from "yup";
import BranchAddressForm from "./stakeholder-branch-address-form";
import stakeholderBranchAddressApiService from "src/services/stakeholder/stakeholder-branch-address-service";
import type { StakeholderBranchAddress } from "src/types/stakeholder/stakeholder-branch-address";
import type { StakeholderBranch } from "src/types/stakeholder/stakeholder-branch";
import type { IApiResponse } from "src/types/requests";

interface BranchAddressDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  branchAddress: StakeholderBranchAddress;
  stakeholderId: string;
  stakeholderBranches: StakeholderBranch[];
}

const BranchAddressDrawer = (props: BranchAddressDrawerType) => {
  const {
    open,
    toggle,
    refetch,
    branchAddress,
    stakeholderId,
    stakeholderBranches,
  } = props;

  const validationSchema = yup.object().shape({
    stakeholder_branch_id: yup.string().required("Branch is required"),
    country: yup.string().required("Country is required"),
    region: yup.string().required("Region is required"),
    city: yup.string().required("City is required"),
    subcity: yup.string().required("Subcity is required"),
    woreda: yup.string().required("Woreda is required"),
    street: yup.string(),
    block_no: yup.string(),
    website: yup.string().url("Invalid URL"),
    northing: yup.string().required("Northing is required"),
    easting: yup.string().required("Easting is required"),
  });

  const isEdit = Boolean(branchAddress?.id);

  const createBranchAddress = async (
    body: IApiPayload<StakeholderBranchAddress>,
  ): Promise<IApiResponse<StakeholderBranchAddress>> => {
    return stakeholderBranchAddressApiService.create(body);
  };

  const editBranchAddress = async (
    body: IApiPayload<StakeholderBranchAddress>,
  ): Promise<IApiResponse<StakeholderBranchAddress>> => {
    return stakeholderBranchAddressApiService.update(
      branchAddress?.id || "",
      body,
    );
  };

  const getPayload = (values: StakeholderBranchAddress) => ({
    data: {
      ...values,
      id: branchAddress?.id,
      stakeholder_id: stakeholderId,
    },
    files: [],
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (
    response: IApiResponse<StakeholderBranchAddress>,
  ) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.stakeholder-branch-address.${
        isEdit ? "edit" : "create"
      }`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-branch-address.${
            isEdit ? "edit" : "create"
          }`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(branchAddress as StakeholderBranchAddress),
          }}
          createActionFunc={isEdit ? editBranchAddress : createBranchAddress}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderBranchAddress>) => (
            <BranchAddressForm
              formik={formik}
              stakeholderBranches={stakeholderBranches}
            />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BranchAddressDrawer;
