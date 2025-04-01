import * as yup from 'yup';

import { FormikProps } from 'formik';
import roleApiService from 'src/services/admin/role-service';
import Role from 'src/types/admin/role';
import { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import RoleForm from './role-form';

interface RoleDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  role: Role;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
});

const RoleDrawer = (props: RoleDrawerType) => {
  // ** Props
  const { open, toggle, refetch, role } = props;
  console.log(`RoleDrawer`, role);

  const createRole = async (body: IApiPayload<Role>) => {
    return await roleApiService.create(body);
  };
  const editRole = async (body: IApiPayload<Role>) => {
    return await roleApiService.update(role?.id || "", body);
  };
  const isEdit = role?.id ? true : false;

  const getPayload = (values: Role) => {
    const payload = {
      data: {
        ...values,
        id: role?.id
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
    <CustomSideDrawer title={isEdit ? 'admin.roles.edit-role' : 'admin.roles.create-role'} handleClose={handleClose} open={open}>
      {() =>
        role && (
          <FormPageWrapper
            edit={isEdit}
            title="role"
            getPayload={getPayload}
            validationSchema={validationSchema}
            initialValues={role}
            createActionFunc={isEdit ? editRole : createRole}
            onActionSuccess={onActionSuccess}
            onCancel={handleClose}
          >
            {(formik: FormikProps<Role>) => {
              return <RoleForm formik={formik} defaultLocaleData={{} as Role} />;
            }}
          </FormPageWrapper>
        )
      }
    </CustomSideDrawer>
  );
};

export default RoleDrawer;
