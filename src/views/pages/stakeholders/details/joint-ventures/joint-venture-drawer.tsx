import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import JointVentureForm from './joint-venture-form';
import jointVentureApiService from 'src/services/stakeholder/joint-venture-service';
import type { JointVenture } from 'src/types/stakeholder/joint-venture';
import type { IApiResponse } from 'src/types/requests';

interface JointVentureDrawerType {
  open: boolean;
  toggle: () => void;
  jointVenture: JointVenture;
  refetch: () => void;
  stakeholderId: string;
}

const JointVentureDrawer = (props: JointVentureDrawerType) => {
  const { open, toggle, refetch, jointVenture, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    member_companies_no: yup.number().required('Number of member companies is required').positive().integer(),
    description: yup.string().required('Description is required'),
    reference: yup.string().nullable()
  });

  const isEdit = Boolean(jointVenture?.id);

  const createJointVenture = async (body: IApiPayload<JointVenture>): Promise<IApiResponse<JointVenture>> => {
    return jointVentureApiService.create(body);
  };

  const editJointVenture = async (body: IApiPayload<JointVenture>): Promise<IApiResponse<JointVenture>> => {
    return jointVentureApiService.update(jointVenture?.id || '', body);
  };

  const getPayload = (values: JointVenture): IApiPayload<JointVenture> => ({
    data: {
      ...values,
      id: jointVenture?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<JointVenture>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`jointVenture.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`jointVenture.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={jointVenture}
          createActionFunc={isEdit ? editJointVenture : createJointVenture}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<JointVenture>) => <JointVentureForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default JointVentureDrawer;
