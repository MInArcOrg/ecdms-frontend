import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { Formik, FormikProps, FormikHelpers, FormikValues, FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Translations from 'src/layouts/components/Translations';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { parseError } from 'src/utils/parse/clean-error';
import Page from 'src/views/components/page/page';

interface FormPageWrapperProps<T extends FormikValues> {
  children: (formik: FormikProps<T>) => JSX.Element;
  validationSchema: any;
  initialValues: T;
  edit?: boolean;
  title?: string;
  showTitle?: boolean;
  onCancel?: () => void;
  getPayload: (values: T) => IApiPayload<T>;
  createActionFunc: (payload: IApiPayload<T>) => Promise<IApiResponse<T>>;
  fullLayout?: boolean;
  baseUrl?: string;
  headerActions?: any[];
  onActionSuccess?: (response: IApiResponse<T>, payload: { data: T; files: any[] }) => void;
}

const FormPageWrapper = <T extends FormikValues>({
  validationSchema,
  initialValues,
  children,
  edit = false,
  title = '',
  showTitle = true,
  onCancel,
  getPayload,
  createActionFunc,
  fullLayout = false,
  baseUrl = '',
  headerActions = [],
  onActionSuccess
}: FormPageWrapperProps<T>) => {
  const { t: intl } = useTranslation();
  const router = useRouter();

  const onSubmit = async (values: T, { setErrors, setStatus, setSubmitting }: FormikHelpers<T>) => {
    const payload = getPayload(values);
    try {
      const res = await createActionFunc(payload);
      setStatus({ success: true });
      if (onActionSuccess) onActionSuccess(res, payload);
      if (onCancel) {
        onCancel();
      } else {
        router.push(baseUrl);
      }
      toast.success(`${intl(title)} ${intl(edit ? 'common.form.success-updated' : 'common.form.success-created')}`);
    } catch (err: any) {
      const apiError = err as IApiResponse;
      setStatus({ success: false });
      setSubmitting(false);

      if (apiError._errors && typeof apiError._errors === 'string') {
        toast.error(apiError._errors);
        setErrors({ _error: apiError._errors } as FormikErrors<T>);
      } else if (apiError._errors) {
        // Convert API error structure to Formik errors
        const formErrors: Record<string, string> = {};
        
        // Handle nested error objects from the API
        const processErrors = (errors: any, prefix = '') => {
          if (Array.isArray(errors)) {
            return errors[0]; // Take first error if it's an array
          } else if (typeof errors === 'object' && errors !== null) {
            Object.entries(errors).forEach(([key, value]) => {
              const fieldName = prefix ? `${prefix}.${key}` : key;
              if (typeof value === 'string') {
                formErrors[fieldName] = value;
              } else if (Array.isArray(value)) {
                formErrors[fieldName] = value[0];
              } else if (value && typeof value === 'object') {
                processErrors(value, fieldName);
              }
            });
          }
        };

        processErrors(apiError._errors);
        
        // Set Formik errors
        setErrors(formErrors as FormikErrors<T>);
        
        // Show errors in toast
        const errorMessages = Object.values(formErrors).join('\n');
        toast.error(errorMessages || `${intl(edit ? 'error-update' : 'error-create')} ${intl(title)}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(baseUrl);
  };

  return (
    <Page titleId={title}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik: FormikProps<T>) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <Box>{children(formik)}</Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: 5 }}>
                <LoadingButton
                  loading={formik.isSubmitting}
                  loadingPosition="center"
                  disabled={formik.isSubmitting || !formik.isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  <Translations text={edit ? 'save' : 'submit'} />
                </LoadingButton>
                <Button
                  onClick={() => {
                    formik.resetForm();
                    onCancel ? onCancel() : handleCancel();
                  }}
                  sx={{ ml: 2 }}
                  variant="contained"
                  color="secondary"
                >
                  <Translations text="cancel" />
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default FormPageWrapper;
