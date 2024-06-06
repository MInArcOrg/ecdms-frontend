import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import User from 'src/types/admin/user';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface UserFormProps {
  formik: FormikProps<User>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: User;
}

const UserForm: React.FC<UserFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <>
      <CustomTextBox fullWidth label={transl('first_name')} placeholder={transl('first_name')} name="first_name" size="sm" sx={{ mb: 2 }} />

      <CustomTextBox fullWidth label={transl('last_name')} placeholder={transl('last_name')} name="last_name" size="sm" sx={{ mb: 2 }} />

      <CustomTextBox fullWidth type="email" label={transl('email')} placeholder={transl('email')} name="email" size="sm" sx={{ mb: 2 }} />
      <CustomPhoneInput name="phone" label={transl('phone')} />

      <CustomTextBox
        fullWidth
        type="password"
        label={transl('password')}
        placeholder={transl('password')}
        name="password"
        size="sm"
        sx={{ mb: 2 }}
      />
    </>
  );
};
export default UserForm;
