import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BranchManagerForm from './stakeholder-branch-manager-form';
import stakeholderBranchManagerApiService from 'src/services/stakeholder/stakeholder-branch-manager-service';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';
import type { IApiResponse } from 'src/types/requests';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';

interface BranchManagerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  branchManager: StakeholderBranchManager;
  stakeholderId: string;
  stakeholderBranches: StakeholderBranch[];
}

const BranchManagerDrawer = (props: BranchManagerDrawerType) => {
  const { open, toggle, refetch, branchManager, stakeholderId, stakeholderBranches } = props;

  const validationSchema = yup.object().shape({
    stakeholder_branch_id: yup.string().required('Branch is required'),
    department: yup.string().max(255).required('Department is required'),
    position: yup.string().max(255).required('Position is required'),
    first_name: yup.string().max(36).required('First name is required'),
    middle_name: yup.string().max(255).required('Middle name is required'),
    last_name: yup.string().max(255).required('Last name is required'),
    gender: yup.string().max(255).required('Gender is required'),
    phone: yup.string().max(255).required('Phone number is required'),
    email: yup.string().max(255).email('Invalid email').nullable(),
    parent_id: yup.string().nullable()
  });

  const isEdit = Boolean(branchManager?.id);

  const createBranchManager = async (body: IApiPayload<StakeholderBranchManager>): Promise<IApiResponse<StakeholderBranchManager>> => {
    return stakeholderBranchManagerApiService.create(body);
  };

  const editBranchManager = async (body: IApiPayload<StakeholderBranchManager>): Promise<IApiResponse<StakeholderBranchManager>> => {
    return stakeholderBranchManagerApiService.update(branchManager?.id || '', body);
  };

  const getPayload = (values: StakeholderBranchManager) => ({
    data: {
      ...values,
      id: branchManager?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderBranchManager>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-branch-manager.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-branch-manager.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(branchManager as StakeholderBranchManager)
          }}
          createActionFunc={isEdit ? editBranchManager : createBranchManager}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderBranchManager>) => (
            <BranchManagerForm formik={formik} stakeholderBranches={stakeholderBranches} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BranchManagerDrawer;
