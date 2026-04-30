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
import { phoneRule } from 'src/utils/validator/phone';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { birthDateRule } from 'src/utils/validator/age';
import { nationalIdRule } from 'src/utils/validator/id';

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
    middle_name: nameRule.nullable(''),
    department: yup.string().required('Department is required'),
    birth_date: birthDateRule(18).required('Birth date is required'),
    gender: yup.string().required('Gender is required'),
    phone_no: phoneRule.required('Phone number is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    position: yup.string().required('Position is required').matches(/^[a-zA-Z ]+$/, 'Invalid position'),
    nationality: yup.string().required('Nationality is required'),
    national_id_no: nationalIdRule.nullable()
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
      stakeholder_id: stakeholderId,
      birth_date: convertDateToLocaleDate(values.birth_date),
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
            birth_date: formatInitialDateDate(manager?.birth_date),
            nationality: manager?.nationality || '',

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
