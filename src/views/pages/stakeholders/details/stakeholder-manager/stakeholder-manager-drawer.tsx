import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ManagerForm from './stakeholder-manager-form';
import stakeholderManagerApiService from 'src/services/stakeholder/stakeholder-manager-service';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import type { IApiResponse } from 'src/types/requests';
import { nameRule } from 'src/utils/validator/name';

interface ManagerDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  manager: StakeholderManager;
  stakeholderId: string;
}

const ManagerDrawer = (props: ManagerDrawerType) => {
  const { open, toggle, refetch, manager, stakeholderId } = props;

  const validationSchema = yup.object().shape({
    first_name: nameRule.required('First name is required'),
    last_name: nameRule.required('Last name is required'),
    department: yup.string().required('Department is required'),
    birth_date: yup.date().required('Birth date is required'),
    gender: yup.string().required('Gender is required'),
    phone_no: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    position: yup.string().required('Position is required').matches(/^[a-zA-Z ]+$/, 'Invalid position'),
    nationality: yup.string().required('Nationality is required'),
    national_id_no: yup.string().required('National ID number is required'),
  });

  const isEdit = Boolean(manager?.id);

  const createManager = async (body: IApiPayload<StakeholderManager>): Promise<IApiResponse<StakeholderManager>> => {
    return stakeholderManagerApiService.create(body);
  };

  const editManager = async (body: IApiPayload<StakeholderManager>): Promise<IApiResponse<StakeholderManager>> => {
    return stakeholderManagerApiService.update(manager?.id || '', body);
  };

  const getPayload = (values: StakeholderManager) => ({
    data: {
      ...values,
      id: manager?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<StakeholderManager>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.stakeholder-manager.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.stakeholder-manager.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(manager as StakeholderManager),
            birth_date: manager?.birth_date ? manager.birth_date.split('T')[0] : ''
          }}
          createActionFunc={isEdit ? editManager : createManager}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderManager>) => <ManagerForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default ManagerDrawer;
