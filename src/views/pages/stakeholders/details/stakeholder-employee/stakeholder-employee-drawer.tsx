import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import EmployeeForm from './stakeholder-employee-form';
import stakeholderEmployeeApiService from 'src/services/stakeholder/stakeholder-employee-service';
import type { StakeholderEmployee } from 'src/types/stakeholder/stakeholder-employee';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';

interface EmployeeDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  employee: StakeholderEmployee;
  stakeholderId: string;
  departments: StakeholderDepartment[];
  positions: StakeholderPosition[];
}

const EmployeeDrawer = (props: EmployeeDrawerType) => {
  const { open, toggle, refetch, employee, stakeholderId, departments, positions } = props;

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    national_id_no: yup.string().required('National ID number is required'),
    gender: yup.string().required('Gender is required'),
    phone: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').nullable(),
    stakeholder_department_id: yup.string().required('Department is required'),
    stakeholder_position_id: yup.string().required('Position is required')
  });

  const isEdit = Boolean(employee?.id);

  const createEmployee = async (body: IApiPayload<StakeholderEmployee>) => stakeholderEmployeeApiService.create(body);

  const editEmployee = async (body: IApiPayload<StakeholderEmployee>) => stakeholderEmployeeApiService.update(employee?.id || '', body);

  const getPayload = (values: StakeholderEmployee) => ({
    data: {
      ...values,
      id: employee?.id,
      stakeholder_id: stakeholderId
    },
    files: []
  });

  const handleClose = () => toggle();

  const onActionSuccess = () => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer title={`stakeholder.employee.${isEdit ? 'edit' : 'create'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`stakeholder.employee.${isEdit ? 'edit' : 'create'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(employee as StakeholderEmployee)
          }}
          createActionFunc={isEdit ? editEmployee : createEmployee}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<StakeholderEmployee>) => <EmployeeForm formik={formik} departments={departments} positions={positions} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default EmployeeDrawer;
