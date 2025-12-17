import type React from 'react';
import { Grid, Alert, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import { gridSpacing } from 'src/configs/app-constants';
import CustomTextBox from 'src/views/shared/form/custom-text-box';

interface ChangePasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ChangePasswordFormProps {
    formik: FormikProps<ChangePasswordFormData>;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ formik }) => {
    const { t } = useTranslation();

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                    <Alert severity="info">
                        {t('user.password.password-requirements')}
                    </Alert>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    label={t('user.password.old-password')}
                    name="oldPassword"
                    type="password"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    label={t('user.password.new-password')}
                    name="newPassword"
                    type="password"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>
            <Grid item xs={12}>
                <CustomTextBox
                    fullWidth
                    label={t('user.password.confirm-password')}
                    name="confirmPassword"
                    type="password"
                    size="small"
                    sx={{ mb: 2 }}
                />
            </Grid>
        </Grid>
    );
};

export default ChangePasswordForm;
