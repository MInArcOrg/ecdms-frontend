import * as yup from 'yup';

import { FormikProps } from 'formik';
import userHook from 'src/hooks/admin/user-hook';
import User from 'src/types/admin/user';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import UserForm from './user-form';

interface UserDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  user: User;
  departmentId: string;
}

const validationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().typeError('Contact Number field is required').min(10).required()
});

const UserDrawer = (props: UserDrawerType) => {
  // ** Props
  const { open, toggle, refetch, user } = props;

  const { addNewUser, updateUser } = userHook() as ReturnType<typeof userHook>;

  const isEdit = user?.id ? true : false;

  const getPayload = (values: User) => {
    const payload = {
      data: {
        ...values,
        id: user?.id,
        phone: values.phone,
        department_id: props.departmentId,
        gender: values.gender
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
    <CustomSideDrawer title={`department.user.${isEdit ? 'edit-user' : 'create-user'}`} handleClose={handleClose} open={open}>
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`department.user.${isEdit ? 'edit-user' : 'create-user'}`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={user as User}
          createActionFunc={isEdit ? updateUser : addNewUser}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<User>) => {
            return <UserForm formik={formik} defaultLocaleData={{} as User} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default UserDrawer;
