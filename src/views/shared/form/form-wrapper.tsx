import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { Formik, FormikProps, FormikHelpers, FormikValues, FormikErrors } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import RequiredFieldsContext from 'src/context/required-fields-context';
import Translations from 'src/layouts/components/Translations';
import { IApiPayload, IApiResponse } from 'src/types/requests';
import { parseError } from 'src/utils/parse/clean-error';
import Page from 'src/views/components/page/page';
import * as Yup from 'yup';

interface FormPageWrapperProps<T extends FormikValues> {
  children: (formik: FormikProps<T>) => JSX.Element;
  validationSchema: any;
  initialValues: T;
  edit?: boolean;
  title?: string;
  translatedTitle?: string;
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
  translatedTitle = '',
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
  const requiredFields = getRequiredFields(validationSchema);

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
      setErrors(parseError(apiError) as FormikErrors<T>);
      setSubmitting(false);

      if (apiError._errors && typeof apiError._errors === 'string') {
        toast.error(apiError._errors);
      } else if (apiError._errors) {
        toast.error(`${intl(edit ? 'error-update' : 'error-create')} ${intl(title)}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(baseUrl);
  };

  return (
    <Page titleId={title}
      title={translatedTitle}
    >
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik: FormikProps<T>) => (
          <form onSubmit={formik.handleSubmit}>
            <RequiredFieldsContext.Provider value={requiredFields}>
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
            </RequiredFieldsContext.Provider>
          </form>
        )}
      </Formik>
    </Page>
  );
};

export default FormPageWrapper;

export const getRequiredFields = (schema: Yup.ObjectSchema<any>): string[] => {
  const schemaDescription = schema.describe();

  return Object.keys(schemaDescription.fields).filter((field) => {
    const fieldDesc = schemaDescription.fields[field] as any;
    const hasRequiredTest = fieldDesc.tests?.some((t: any) => t.name === 'required');
    const isNonNullable = fieldDesc.nullable === false; // numbers, booleans
    return hasRequiredTest || isNonNullable;
  });
};
