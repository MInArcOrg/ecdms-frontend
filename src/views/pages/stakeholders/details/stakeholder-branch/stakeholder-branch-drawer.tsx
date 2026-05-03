import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import BranchForm from './stakeholder-branch-form';
import stakeholderBranchApiService from 'src/services/stakeholder/stakeholder-branch-service';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { IApiResponse } from 'src/types/requests';
import type { BusinessFields } from 'src/types/general/general-master';

interface BranchDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  branch: StakeholderBranch;
  stakeholderId: string;
  businessFields: BusinessFields[];
}

const BranchDrawer = (props: BranchDrawerType) => {
  const { open, toggle, refetch, branch, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().max(255).required('Name is required'),
    description: yup.string().nullable(),
    reference: yup.string().max(255).nullable(),
    parent_id: yup.string().nullable()
  });

  const isEdit = Boolean(branch?.id);

  const createBranch = async (body: IApiPayload<StakeholderBranch>): Promise<IApiResponse<StakeholderBranch>> => {
    return stakeholderBranchApiService.create(body);
  };

  const editBranch = async (body: IApiPayload<StakeholderBranch>): Promise<IApiResponse<StakeholderBranch>> => {
    return stakeholderBranchApiService.update(branch?.id || '', body);
  };

  const getPayload = (values: StakeholderBranch) => {
    const { tin_number, business_field_id, ...rest } = values as any;

    return {
      data: {
        ...rest,
        id: branch?.id,
        stakeholder_id: stakeholderId
      },
      files: []
    };
  };

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderBranch>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-branch.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-branch.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(branch as StakeholderBranch)
          }}
          createActionFunc={isEdit ? editBranch : createBranch}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderBranch>) => <BranchForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default BranchDrawer;
