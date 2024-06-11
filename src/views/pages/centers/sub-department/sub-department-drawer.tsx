import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import SubDepartmentForm from './sub-deparmtent-form';
import subDepartmentApiService from 'src/services/department/sub-department-service';

interface SubDepartmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  departmentId: string;
  sub-department: Department;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const SubDepartmentDrawer = (props: SubDepartmentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, sub-department } = props;

  const isEdit = sub-department?.id ? true : false;
  const createSubDepartment = async (body: { data: SubDepartment; files: [] }) => {
    await sub-departmentApiService.create(body);
  };
  const editSubDepartment = async (body: { data: SubDepartment; files: [] }) => {
    await sub-departmentApiService.update(sub-department?.id || '', body);
  };

  const getPayload = (values: SubDepartment) => {
    const payload = {
      data: {
        id: sub-department?.id,
        name: values.name,
        description: values.description
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
    <CustomSideDrawer title={`department.sub-department.${isEdit ? 'edit-sub-department' : 'create-sub-department'}`} handleClose={handleClose} open={open}>
      {() =>
        sub-department && (
          <FormPageWrapper
            edit={isEdit}
            title="department.sub-department.title"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={sub-department as SubDepartment}
            createActionFunc={isEdit ? editSubDepartment : createSubDepartment}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<SubDepartment>) => {
              return <SubDepartmentForm formik={formik} defaultLocaleData={{} as SubDepartment} />;
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default SubDepartmentDrawer;
