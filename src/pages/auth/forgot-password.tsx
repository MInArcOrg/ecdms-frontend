// ** React Imports
import { useState } from 'react';
// ** Next Imports
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
  email: ''
};

interface FormData {
  email: string;
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const schema = yup.object().shape({
    email: yup.string().email(t('login.validation-messages.email.email')).required(t('login.validation-messages.email.required'))
  });

  const handleSubmit = async (values: FormData, { setSubmitting, setErrors }: { setSubmitting: any; setErrors: any }) => {
    setLoading(true);
    try {
      const payload = {
        email: values.email,
        redirectUrl: process.env.NEXT_PUBLIC_APP_URL||window.location.origin||''
      };
      await authApiService.sendResetEmail(payload);
      toast.success('If your email exists in our system, you will receive a password reset link.');
    } catch (error) {
      toast.error('Failed to send reset email.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }0
  };

  return (
    <AuthContainer illustrationName={`auth-v2-forgot-password-illustration`}>
      <Logo width="60px" height="60px" />
      <Box sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ mb: 1.5 }}>
          {t('Forgot your password?')}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>{t('Enter your email and we\'ll send you instructions to reset your password.')}</Typography>
      </Box>
      <Formik initialValues={defaultValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form noValidate autoComplete="off">
            <Box sx={{ mb: 4 }}>
              <CustomTextField
                fullWidth
                autoFocus
                label={t('Email')}
                name="email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
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
              {t('Send Reset Link')}
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

ForgotPassword.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>;
ForgotPassword.guestGuard = true;

export default ForgotPassword;