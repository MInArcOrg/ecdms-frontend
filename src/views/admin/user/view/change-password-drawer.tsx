import type { FormikProps } from 'formik';
import type { IApiPayload } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import FormPageWrapper from 'src/views/shared/form/form-wrapper';
import * as yup from 'yup';
import ChangePasswordForm from './change-password-form';
import userApiService from 'src/services/admin/user-service';
import type { IApiResponse } from 'src/types/requests';
import { useTranslation } from 'react-i18next';

interface ChangePasswordDrawerProps {
    open: boolean;
    toggle: () => void;
    userId: string;
}

interface ChangePasswordFormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePasswordDrawer = (props: ChangePasswordDrawerProps) => {
    const { open, toggle, userId } = props;
    const { t } = useTranslation();

    const validationSchema = yup.object().shape({
        newPassword: yup
            .string()
            .required(t('validation.password.required'))
            .min(8, t('validation.password.min', { min: 8 }))
            .max(50, t('validation.password.max', { max: 50 }))
            .matches(/(?=.*[A-Z])/, t('validation.password.uppercase'))
            .matches(/(?=.*[a-z])/, t('validation.password.lowercase'))
            .matches(/(?=.*\d)/, t('validation.password.digit'))
            .matches(/(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?`~])/, t('validation.password.special')),
        confirmPassword: yup
            .string()
            .required(t('validation.passwordConfirm.required'))
            .oneOf([yup.ref('newPassword')], t('validation.passwordConfirm.match'))
    });

    const changePassword = async (body: IApiPayload<ChangePasswordFormData>): Promise<IApiResponse<any>> => {
        return userApiService.changePassword({ old_password: body.data.oldPassword, new_password: body.data.newPassword });
    };

    const getPayload = (values: ChangePasswordFormData) => ({
        data: values,
        files: []
    });

    const handleClose = () => {
        toggle();
    };

    const onActionSuccess = async () => {
        handleClose();
    };

    const initialValues: ChangePasswordFormData = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    return (
        <CustomSideDrawer
            title="user.password.change-password"
            handleClose={handleClose}
            open={open}
        >
            {() => (
                <FormPageWrapper
                    edit={false}
                    title="user.password.change-password"
                    getPayload={getPayload}
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    createActionFunc={changePassword}
                    onActionSuccess={onActionSuccess}
                    onCancel={handleClose}
                >
                    {(formik: FormikProps<ChangePasswordFormData>) => <ChangePasswordForm formik={formik} />}
                </FormPageWrapper>
            )}
        </CustomSideDrawer>
    );
};

export default ChangePasswordDrawer;
