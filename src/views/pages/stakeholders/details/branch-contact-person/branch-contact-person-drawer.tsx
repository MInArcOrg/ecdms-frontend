import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BranchContactPersonForm from './branch-contact-person-form';
import stakeholderBranchContactPersonApiService from 'src/services/stakeholder/branch-contact-person-service';
import type { StakeholderBranchContactPerson } from 'src/types/stakeholder/branch-contact-person';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { IApiResponse } from 'src/types/requests';

interface BranchContactPersonDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  branchContactPerson: StakeholderBranchContactPerson;
  stakeholderId: string;
  stakeholderBranches: StakeholderBranch[];
}

const BranchContactPersonDrawer = (props: BranchContactPersonDrawerType) => {
  const { open, toggle, refetch, branchContactPerson, stakeholderId, stakeholderBranches } = props;

  const validationSchema = yup.object().shape({
    stakeholder_branch_id: yup.string().required('Branch is required'),
    department: yup.string().required('Department is required'),
    position: yup.string().required('Position is required'),
    first_name: yup.string().required('First name is required'),
    middle_name: yup.string().required('Middle name is required'),
    last_name: yup.string().required('Last name is required'),
    gender: yup.string().required('Gender is required'),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').nullable()
  });

  const isEdit = Boolean(branchContactPerson?.id);

  const createBranchContactPerson = async (
    body: IApiPayload<StakeholderBranchContactPerson>
  ): Promise<IApiResponse<StakeholderBranchContactPerson>> => {
    return stakeholderBranchContactPersonApiService.create(body);
  };

  const editBranchContactPerson = async (
    body: IApiPayload<StakeholderBranchContactPerson>
  ): Promise<IApiResponse<StakeholderBranchContactPerson>> => {
    return stakeholderBranchContactPersonApiService.update(branchContactPerson?.id || '', body);
  };

  const getPayload = (values: StakeholderBranchContactPerson) => ({
    data: {
      ...values,
      id: branchContactPerson?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderBranchContactPerson>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-branch-contact-person.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-branch-contact-person.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(branchContactPerson as StakeholderBranchContactPerson)
          }}
          createActionFunc={isEdit ? editBranchContactPerson : createBranchContactPerson}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderBranchContactPerson>) => (
            <BranchContactPersonForm formik={formik} stakeholderBranches={stakeholderBranches} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BranchContactPersonDrawer;
