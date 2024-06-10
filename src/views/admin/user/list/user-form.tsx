import { Grid } from '@mui/material';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { gridSpacing } from 'src/configs/app-constants';
import User from 'src/types/admin/user';
import CustomPhoneInput from 'src/views/shared/form/custom-phone-box';
import CustomRadioBox from 'src/views/shared/form/custom-radio-box';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface UserFormProps {
  formik: FormikProps<User>;
  isLocaleEdit?: boolean;
  defaultLocaleData?: User;
}

const UserForm: React.FC<UserFormProps> = ({ formik, isLocaleEdit = false, defaultLocaleData }) => {
  const { t: transl } = useTranslation();
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item md={6}>
        <CustomTextBox
          fullWidth
          label={transl('department.user.form.first_name')}
          placeholder={transl('department.user.form.first_name')}
          name="first_name"
          size="sm"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item md={6}>
        <CustomTextBox
          fullWidth
          label={transl('department.user.form.middle_name')}
          placeholder={transl('department.user.form.middle_name')}
          name="middle_name"
          size="sm"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item md={12}>
        <CustomTextBox
          fullWidth
          label={transl('department.user.form.last_name')}
          placeholder={transl('department.user.form.last_name')}
          name="last_name"
          size="sm"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item md={12}>
        <CustomTextBox
          fullWidth
          type="email"
          label={transl('department.user.form.email')}
          placeholder={transl('department.user.form.email')}
          name="email"
          size="sm"
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item md={12}>
        <CustomPhoneInput name="phone" label={transl('department.user.form.phone')} />
      </Grid>
      <Grid item md={4}>
        <CustomRadioBox
          label={transl('department.user.form.gender')}
          name="gender"
          options={[
            { label: transl('department.user.male'), value: 'male' },
            { label: transl('department.user.female'), value: 'female' }
          ]}
        />
      </Grid>
    </Grid>
  );
};
export default UserForm;
