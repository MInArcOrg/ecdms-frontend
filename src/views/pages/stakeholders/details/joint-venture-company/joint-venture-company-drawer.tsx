import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import JointVentureCompanyForm from './joint-venture-company-form';
import jointVentureCompanyApiService from 'src/services/stakeholder/joint-venture-company-service';
import type { JointVentureCompany } from 'src/types/stakeholder/joint-venture-company';
import type { IApiResponse } from 'src/types/requests';

interface JointVentureCompanyDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  jointVentureCompany: JointVentureCompany;
  stakeholderId: string;
}

const JointVentureCompanyDrawer = (props: JointVentureCompanyDrawerType) => {
  const { open, toggle, refetch, jointVentureCompany, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    joint_venture_id: yup.string().required('Joint Venture is required'),
    company_name: yup.string().required('Company name is required'),
    specialization: yup.string(),
    roles_and_responsibilities: yup.string(),
    ownership_percentage: yup.number().min(0).max(100),
    description: yup.string().required('Description is required'),
    reference: yup.string().required('Reference is required')
  });

  const isEdit = Boolean(jointVentureCompany?.id);

  const createJointVentureCompany = async (body: IApiPayload<JointVentureCompany>): Promise<IApiResponse<JointVentureCompany>> => {
    return jointVentureCompanyApiService.create(body);
  };

  const editJointVentureCompany = async (body: IApiPayload<JointVentureCompany>): Promise<IApiResponse<JointVentureCompany>> => {
    return jointVentureCompanyApiService.update(jointVentureCompany?.id || '', body);
  };

  const getPayload = (values: JointVentureCompany) => ({
    data: {
      ...values,
      id: jointVentureCompany?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<JointVentureCompany>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.joint-venture-company.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.joint-venture-company.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={jointVentureCompany as JointVentureCompany}
          createActionFunc={isEdit ? editJointVentureCompany : createJointVentureCompany}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<JointVentureCompany>) => <JointVentureCompanyForm formik={formik} stakeholderId={stakeholderId} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default JointVentureCompanyDrawer;
