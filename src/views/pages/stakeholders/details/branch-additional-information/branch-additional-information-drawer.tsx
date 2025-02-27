import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import AdditionalInformationForm from './branch-additional-information-form';
import branchAdditionalInformationApiService from 'src/services/stakeholder/branch-additional-information-service';
import type { BranchAdditionalInformation } from 'src/types/stakeholder/branch-additional-information';
import type { IApiResponse } from 'src/types/requests';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';

interface AdditionalInformationDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  additionalInfo: BranchAdditionalInformation;
  stakeholderId: string;
  stakeholderBranches: StakeholderBranch[];
}

const AdditionalInformationDrawer = (props: AdditionalInformationDrawerType) => {
  const { open, toggle, refetch, additionalInfo, stakeholderId, stakeholderBranches } = props;

  const validationSchema = yup.object().shape({
    stakeholder_branch_id: yup.string().required('Branch is required'),
    additional_information: yup.string().required('Additional information is required'),
    reference: yup.string().nullable()
  });

  const isEdit = Boolean(additionalInfo?.id);

  const createAdditionalInfo = async (
    body: IApiPayload<BranchAdditionalInformation>
  ): Promise<IApiResponse<BranchAdditionalInformation>> => {
    return branchAdditionalInformationApiService.create(body);
  };

  const editAdditionalInfo = async (body: IApiPayload<BranchAdditionalInformation>): Promise<IApiResponse<BranchAdditionalInformation>> => {
    return branchAdditionalInformationApiService.update(additionalInfo?.id || '', body);
  };

  const getPayload = (values: BranchAdditionalInformation) => ({
    data: {
      ...values,
      id: additionalInfo?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<BranchAdditionalInformation>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`stakeholder.branch-additional-information.${isEdit ? 'edit' : 'create'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.branch-additional-information.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            reference: '',
            ...(additionalInfo as BranchAdditionalInformation)
          }}
          createActionFunc={isEdit ? editAdditionalInfo : createAdditionalInfo}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<BranchAdditionalInformation>) => (
            <AdditionalInformationForm formik={formik} stakeholderBranches={stakeholderBranches} />
          )}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default AdditionalInformationDrawer;
