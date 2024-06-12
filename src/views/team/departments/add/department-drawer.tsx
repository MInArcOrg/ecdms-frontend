import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import DepartmentForm from './department-form';
import Department from 'src/types/department/department';
import useDepartment from 'src/hooks/team/department-hook';

interface DepartmentDrawerType {
  open: boolean;
  toggle: () => void;
  addNewDepartment: (body: { data: Department; files: [] }) => Promise<void>;
  refetch: () => void;
  department: Department;
  parentDepartmentId?: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const DepartmentDrawer = (props: DepartmentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, department, parentDepartmentId } = props;

  const { addNewDepartment, updateDepartment } = useDepartment() as ReturnType<typeof useDepartment>;

  const isEdit = department?.id ? true : false;

  const getPayload = (values: Department) => {
    const payload = {
      data: {
        id: department?.id,
        name: values.name,
        description: values.description,
        parent_department_id: parentDepartmentId
      },
      files: []
    };
    return payload;
  };
  const handleClose = () => {
    toggle();
    // formik.resetForm()
  };
  const onActionSuccess = () => {
    toggle();
    refetch();
    handleClose();
  };
  return (
    <CustomSideDrawer title={isEdit ? 'edit-department' : 'create-department'} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="department"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={department as Department}
          createActionFunc={isEdit ? updateDepartment : addNewDepartment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Department>) => {
            return <DepartmentForm formik={formik} defaultLocaleData={{} as Department} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default DepartmentDrawer;
