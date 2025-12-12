import * as yup from 'yup';

// --- Reusable Regular Expressions (Regex) for Complexity ---

// Must contain at least one uppercase letter (A-Z)
const uppercaseRegex = /(?=.*[A-Z])/;
// Must contain at least one lowercase letter (a-z)
const lowercaseRegex = /(?=.*[a-z])/;
// Must contain at least one digit (0-9)
const digitRegex = /(?=.*\d)/;
// Must contain at least one special character: !@#$%^&*()_+-=[]{};:'"\\|,.<>/?`~
// Note: This regex is generic, consider narrowing the allowed set if your system has restrictions.
const specialCharRegex = /(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?`~])/;

// --- Constants ---
const MIN_LENGTH = 8;
const MAX_LENGTH = 50; // A reasonable upper limit to prevent excessive data/DOS

/**
 * Creates a robust password validation schema requiring complexity.
 * @param t The translation function (e.g., from useTranslation)
 * @returns A Yup ObjectSchema for password and passwordConfirm fields.
 */
export const createPasswordValidationSchema = (t: (key: string, options?: any) => string) => {

    return yup.object().shape({
        password: yup
            .string()
            .required(t('validation.password.required'))

            // 1. Length enforcement
            .min(MIN_LENGTH, t('validation.password.min', { min: MIN_LENGTH }))
            .max(MAX_LENGTH, t('validation.password.max', { max: MAX_LENGTH }))

            // 2. Complexity requirements
            .matches(uppercaseRegex, t('validation.password.uppercase'))
            .matches(lowercaseRegex, t('validation.password.lowercase'))
            .matches(digitRegex, t('validation.password.digit'))
            .matches(specialCharRegex, t('validation.password.special')),

        passwordConfirm: yup
            .string()
            .required(t('validation.passwordConfirm.required'))
            .oneOf([yup.ref('password')], t('validation.passwordConfirm.match')),
    });
};