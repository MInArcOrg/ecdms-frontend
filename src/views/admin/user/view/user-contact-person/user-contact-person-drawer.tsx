import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import UserContactPersonForm from './user-contact-person-form';
import type { IApiResponse } from 'src/types/requests';
import { UserContactPerson } from 'src/types/admin/user';
import userContactPersonApiService from 'src/services/admin/user-contact-person-service';

interface UserContactPersonDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  contactPerson: UserContactPerson | null;
  userId: string;
}

const UserContactPersonDrawer = (props: UserContactPersonDrawerType) => {
  const { open, toggle, refetch, contactPerson, userId } = props;

  const validationSchema = yup.object().shape({
    first_name: yup.string().required('First name is required'),
    middle_name: yup.string().required('Middle name is required'),
    last_name: yup.string().required('Last name is required'),
    national_id_no: yup.string().optional(),
    gender: yup.string().required('Gender is required'),
    phone_no: yup.string().required('Phone number is required'),
    email: yup.string().email('Invalid email').optional()
  });

  const isEdit = Boolean(contactPerson?.id);

  const createContactPerson = async (body: IApiPayload<UserContactPerson>): Promise<IApiResponse<UserContactPerson>> => {
    return userContactPersonApiService.create(body);
  };

  const editContactPerson = async (body: IApiPayload<UserContactPerson>): Promise<IApiResponse<UserContactPerson>> => {
    return userContactPersonApiService.update(contactPerson?.id || '', body);
  };

  const getPayload = (values: UserContactPerson) => ({
    data: {
      ...values,
      id: contactPerson?.id,
      user_id: userId
    },
    files: []
  });

  const handleClose = () => {
    toggle();
  };

  const onActionSuccess = async (response: IApiResponse<UserContactPerson>) => {
    refetch();
    handleClose();
  };

  return (
    <CustomSideDrawer
      title={`department.user.contact-person.${isEdit ? 'edit' : 'create'}-contact-person`}
      handleClose={handleClose}
      open={open}
    >
      {() => (
        <FormPageWrapper
          edit={isEdit}
          title={`department.user.contact-person.${isEdit ? 'edit' : 'create'}-contact-person`}
          getPayload={getPayload}
          validationSchema={validationSchema}
          initialValues={{
            ...(contactPerson as UserContactPerson)
          }}
          createActionFunc={isEdit ? editContactPerson : createContactPerson}
          onActionSuccess={onActionSuccess}
          onCancel={handleClose}
        >
          {(formik: FormikProps<UserContactPerson>) => <UserContactPersonForm formik={formik} />}
        </FormPageWrapper>
      )}
    </CustomSideDrawer>
  );
};

export default UserContactPersonDrawer;
