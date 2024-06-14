import { LoadingButton } from '@mui/lab';
import { Backdrop, Button, FormControl, FormHelperText, FormLabel, OutlinedInput } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { REQUEST_REJECT } from 'src/configs/action-status';
import modelActionApiService from 'src/services/model-action/model-action-service';
import { ModelAction } from 'src/types/general/model-action';
import { Note } from 'src/types/general/note';
import { IApiResponse } from 'src/types/requests';
import { parseError } from 'src/utils/parse/clean-error';
import * as Yup from 'yup';

interface ActionFormProps {
  actionType: string;
  model_id: string;
  model: string;
  refetchAction: () => void;
  toggleDrawer: () => void;
}

const ActionForm: React.FC<ActionFormProps> = ({ actionType, model_id, model, refetchAction }) => {
  const [actionData, setActionData] = useState<any>();
  const [actionLoading, setActionLoading] = useState(false);
  actionData;
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: ''
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required')
    }),
    onSubmit: async (values) => {
      setActionLoading(true);
      try {
        modelActionApiService
          .performCAActions(
            {
              data: {
                model_id,
                model
              } as ModelAction,
              files: []
            },
            actionType
          )
          .then(async (res) => {
            const data: ModelAction = res.payload;
            setActionData(data);
            if (values.description.length > 0) {
              await modelActionApiService.addCAActionNote({
                data: { ...values, model: 'actionstate', model_id: data.id } as Note,
                files: []
              });
            }
            toast.success(`${model} 'successfully' ${actionType}!`);
            refetchAction();
          })
          .catch((error) => {
            const backendErrors = parseError(error as IApiResponse);
            if (backendErrors?.message) {
              toast.error(backendErrors.message);
            }
          });
      } catch (error) {
        console.log('error', error);
      } finally {
        setActionLoading(false);
      }
    }
  });

  useEffect(() => {
    validation.setFieldValue('description', '');
  }, []);

  const rejectModel = async () => {
    setActionLoading(true);
    try {
      const res = await modelActionApiService.performCAActions(
        {
          data: {
            model_id,
            model
          } as ModelAction,
          files: []
        },
        REQUEST_REJECT
      );
      setActionData(res);
      refetchAction();
    } catch (error) {
      console.log('error', error);
    } finally {
      setActionLoading(false);
    }
  };

  // const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  // const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFile(event.target.files ? event.target.files[0] : undefined);
  // };

  // const upload = async () => {
  //   if (!selectedFile || !actionData?.id) return;
  //   try {
  //     await uploadFiles(selectedFile, actionType.toUpperCase(), actionData.id, null, null);
  //     await refetchAction();
  //     alert('Image upload success');
  //   } catch (error) {
  //     console.log('error', error);
  //     alert('Could not upload the file!');
  //   }
  // };

  return (
    <>
      <form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <FormLabel component="legend">Note</FormLabel>
          <OutlinedInput
            id="desc"
            name="description"
            placeholder="Description"
            multiline
            size="small"
            minRows={2}
            value={validation.values.description}
            onChange={validation.handleChange}
            onBlur={validation.handleBlur}
            error={validation.touched.description && Boolean(validation.errors.description)}
          />
          {validation.touched.description && validation.errors.description && (
            <FormHelperText error>{validation.errors.description}</FormHelperText>
          )}
        </FormControl>
        <LoadingButton
          variant="outlined"
          color="primary"
          type="submit"
          sx={{ mr: 2 }}
          disabled={validation.isSubmitting}
          loading={validation.isSubmitting}
        >
          {actionType}
        </LoadingButton>
        <Button variant="outlined" color="error" onClick={rejectModel}>
          Reject
        </Button>
      </form>
      <Backdrop
        open={actionLoading || actionLoading}
        transitionDuration={250}
        sx={{ position: 'absolute', zIndex: (theme) => theme.zIndex.drawer - 1 }}
      />
    </>
  );
};

export default ActionForm;
