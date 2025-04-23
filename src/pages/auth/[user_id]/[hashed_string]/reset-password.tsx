// ** React Imports
import { useState } from 'react';
// ** Next Imports
import { useRouter } from 'next/router';
import Link from 'next/link';
// ** MUI Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field';
// ** Third Party Imports
import * as yup from 'yup';
import { Formik, Form } from 'formik';
// ** Demo Imports
import { LoadingButton } from '@mui/lab';
import Logo from 'src/layouts/components/logo';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import AuthContainer from 'src/views/auth/auth-container';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import authApiService from 'src/services/auth/auth-api-service';

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}));

const defaultValues = {
  user_id: '',
  resetString: '',
  password: '',
  confirmPassword: ''
};

interface FormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  // Get user_id and resetString from query or props as needed
  const { user_id = '', resetString = '' } = router.query;
  const schema = yup.object().shape({
    password: yup.string().min(5, t('Password must be at least 5 characters')).required(t('Password is required')),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('Passwords must match'))
    .required(t('Confirm your password')),
    });

  const handleSubmit = async (values: FormData, { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }) => {
    setLoading(true);
    try {
      if (!user_id || !resetString) { 
        toast.error('Invalid or missing reset credentials.');
        return;
      }
      await authApiService.resetPassword({ user_id: String(user_id), resetString: String(resetString), password: values.password });
      toast.success('Your password has been reset successfully.');
      router.push('/login');
    } catch (error) {
      toast.error('Failed to reset password.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <AuthContainer illustrationName={`auth-v2-reset-password-illustration`}>
      <Logo width="60px" height="60px" />
      <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {t('Reset your password')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{t('Enter your new password below.')}</Typography>
      </Box>
      <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate autoComplete="off">
            <Box sx={{ mb: 4 }}>
              <CustomTextField
                fullWidth
                label={t('New Password')}
                name="password"
                type="password"
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box sx={{ mb: 4 }}>
              <CustomTextField
                fullWidth
                label={t('Confirm New Password')}
                name="confirmPassword"
                type="password"
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mb: 4 }}
              disabled={isSubmitting || loading}
              loading={isSubmitting || loading}
            >
              {t('Reset Password')}
            </LoadingButton>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Typography component={LinkStyled} href="/login">
                {t('Back to login')}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthContainer>
  );
};

ResetPassword.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>;
ResetPassword.guestGuard = true;

export default ResetPassword;