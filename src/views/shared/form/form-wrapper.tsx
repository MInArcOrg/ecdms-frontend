import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid } from '@mui/material';
import { Formik, FormikProps, isString } from 'formik';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Translations from 'src/layouts/components/Translations';
import { IApiResponse } from 'src/types/requests';
import { parseError } from 'src/utils/parse/clean-error';
import Page from 'src/views/components/page/page';

const FormPageWrapper = ({
  validationSchema,
  initialValues,
  children,
  edit = false,
  title = '',
  getPayload,
  onCancel,
  createActionFunc,
  fullLayout = false,
  baseUrl = '',
  headerActions = [],
  onActionSuccess = () => {},
  showTitle = true
}: {
  children: (formik: FormikProps<any>) => JSX.Element;
  validationSchema: any;
  initialValues: any;
  edit: boolean;
  title: string;
  showTitle?: boolean;
  onCancel?: any;
  getPayload: (values: any) => { data: any; files: any[] };
  createActionFunc: any;
  fullLayout?: boolean;
  baseUrl?: string;
  headerActions?: any[];
  onActionSuccess?: () => void;
}) => {
  const { t: intl } = useTranslation();
  const router = useRouter();

  const onSubmit = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    const payload = getPayload(values);
    console.log('form data payload', payload);

    try {
      await createActionFunc(payload);
      setStatus({ success: true });
      onActionSuccess();
      if (!onCancel) {
        void router.push(baseUrl);
      } else {
        onCancel();
      }
      toast.success(`${intl(title)} ${intl(edit ? 'common.form.success-updated' : 'common.form.success-created')}`);
    } catch (err: any) {
      const apiError = err as IApiResponse;
      setStatus({ success: false });
      setErrors(parseError(apiError));
      setSubmitting(false);

      if (apiError._errors && isString(apiError._errors)) {
        toast.error(apiError._errors[0]);
      } else if (apiError._errors) {
        toast.error(`${intl(edit ? 'error-update' : 'error-create')} ${intl(title)}`);
      }
    }
  };

  const handleCancel = () => {
    router.push(baseUrl);
  };

  return (
    <Page titleId={`${edit ? 'edit' : 'create'}-${title}`}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {(formik) => (
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
                  <span>
                    <Translations text={edit ? 'save' : 'submit'} />
                  </span>
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
                  <Translations text={'cancel'} />
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
