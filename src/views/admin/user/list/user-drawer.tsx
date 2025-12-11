import * as yup from 'yup';

import { FormikProps } from 'formik';
import userApiService from 'src/services/admin/user-service';
import User from 'src/types/admin/user';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import UserForm from './user-form';
import { convertDateToLocaleDate, formatInitialDateDate } from 'src/utils/formatter/date';
import { birthDateRule } from 'src/utils/validator/age';
import { nameRule } from 'src/utils/validator/name';
import { phoneRule } from 'src/utils/validator/phone';

interface UserDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  user: User;
  departmentId: string;
}

const validationSchema = yup.object().shape({
  first_name: nameRule.required("First Name is required"),
  middle_name: nameRule.nullable(), // <--- Correctly applied
  last_name: nameRule.required("Last Name is required"), //
  birth_date: birthDateRule(18).required("Birth Date is required"),
  email: yup.string().email().required(),
  phone: phoneRule.required(),
  gender: yup.string().required(),
  marital_status: yup.string().required(),
  partner_name: yup.string().max(36).nullable(),
  stakeholder_id: yup.string().nullable(),
  is_activated: yup.boolean().nullable()
});

const UserDrawer = (props: UserDrawerType) => {
  // ** Props
  const { open, toggle, refetch, user, departmentId } = props;

  const createUser = async (body: IApiPayload<User>): Promise<IApiResponse<User>> => {
    return userApiService.create(body);
  };

  const editUser = async (body: IApiPayload<User>): Promise<IApiResponse<User>> => {
    return userApiService.update(user?.id || '', body);
  };
  const isEdit = user?.id ? true : false;

  const getPayload = (values: User) => {
    const payload = {
      data: {
        ...values,
        id: user?.id,
        phone: values.phone,
        department_id: props.departmentId,
        gender: values.gender,
        birth_date: convertDateToLocaleDate(values.birth_date),
        redirect_url: process.env.NEXT_PUBLIC_APP_URL || window.location.origin + '/auth/' + 'reset-password',
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
          initialValues={{
            ...user,
            birth_date: formatInitialDateDate(user?.birth_date),
            marital_status: user?.marital_status ? 1 : 0,
          }}
          createActionFunc={isEdit ? editUser : createUser}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<User>) => {
            return <UserForm formik={formik} departmentId={departmentId} isEdit={isEdit} />;
          }}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default UserDrawer;
