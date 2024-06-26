import * as yup from 'yup';

import { FormikProps } from 'formik';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import SubDepartmentForm from './sub-deparmtent-form';
import Department from 'src/types/department/department';
import departmentApiService from 'src/services/department/department-service';
import { IApiPayload } from 'src/types/requests';

interface SubDepartmentDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  departmentId: string;
  subDepartment: Department;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const SubDepartmentDrawer = (props: SubDepartmentDrawerType) => {
  // ** Props
  const { open, toggle, refetch, subDepartment } = props;
  const isEdit = subDepartment?.id ? true : false;
  const createSubDepartment = async (body: IApiPayload<Department>) => {
    return await departmentApiService.create(body);
  };
  const editSubDepartment = async (body: IApiPayload<Department>) => {
    return await departmentApiService.update(subDepartment?.id || '', body);
  };

  const getPayload = (values: Department) => {
    const payload = {
      data: {
        ...values,
        id: subDepartment?.id
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
    <CustomSideDrawer
      title={`department.sub-department.${isEdit ? 'edit-sub-department' : 'create-sub-department'}`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title="department.sub-department.title"
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={subDepartment as Department}
          createActionFunc={isEdit ? editSubDepartment : createSubDepartment}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<Department>) => {
            return <SubDepartmentForm formik={formik} defaultLocaleData={{} as Department} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default SubDepartmentDrawer;
