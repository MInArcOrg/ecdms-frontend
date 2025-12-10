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
import Can from 'src/layouts/components/acl/Can';
import ConfirmationDialog from 'src/views/shared/dialog/confirmation-dialog';

interface ActionFormProps {
  actionType: string;
  model_id: string;
  model: string;
  refetchAction: () => void;
  toggleDrawer?: () => void;
}

const ActionForm: React.FC<ActionFormProps> = ({ actionType, model_id, model, refetchAction }) => {
  const [actionData, setActionData] = useState<any>();
  const [actionLoading, setActionLoading] = useState(false);

  // Confirmation dialog states
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<'main' | 'reject'>('main');

  const openConfirmDialog = (type: 'main' | 'reject') => {
    setConfirmType(type);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  // MAIN ACTION
  const performMainAction = async (values: any) => {
    setActionLoading(true);
    try {
      const res = await modelActionApiService.performCAActions(
        {
          data: { model_id, model } as ModelAction,
          files: []
        },
        actionType
      );

      const data: ModelAction = res.payload;
      setActionData(data);

      // Add note
      if (values.description.length > 0) {
        await modelActionApiService.addCAActionNote({
          data: {
            ...values,
            model: 'actionstate',
            model_id: data.id
          } as Note,
          files: []
        });
      }

      toast.success(`${model} successfully ${actionType}!`);
      refetchAction();
    } catch (error) {
      const backendErrors = parseError(error as IApiResponse);
      if (backendErrors?.message) {
        toast.error(backendErrors.message);
      }
    } finally {
      setActionLoading(false);
    }
  };

  // REJECT ACTION
  const rejectModel = async () => {
    setActionLoading(true);
    try {
      const res = await modelActionApiService.performCAActions(
        {
          data: { model_id, model } as ModelAction,
          files: []
        },
        REQUEST_REJECT
      );
      setActionData(res);
      refetchAction();
      toast.success(`${model} rejected!`);
    } catch (error) {
      console.log('error', error);
    } finally {
      setActionLoading(false);
    }
  };

  // FORMIK
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: ''
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required')
    }),
    onSubmit: () => {
      openConfirmDialog('main');
    }
  });

  useEffect(() => {
    validation.setFieldValue('description', '');
  }, []);

  // FINAL CONFIRM ACTION
  const handleConfirm = async () => {
    handleCloseConfirmDialog();

    if (confirmType === 'main') {
      await performMainAction(validation.values);
    } else {
      await rejectModel();
    }
  };

  return (
    <>
      <form
        className="needs-validation"
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit();
        }}
      >
        {/* CONFIRMATION DIALOG */}
        <ConfirmationDialog
          open={isConfirmDialogOpen}
          handleClose={handleCloseConfirmDialog}
          onConfirm={handleConfirm}
          onCancel={handleCloseConfirmDialog}
          title="Confirm Action"
          content={
            confirmType === 'main'
              ? `Are you sure you want to ${actionType} this item?`
              : `Are you sure you want to reject this item?`
          }
        />

        {/* NOTE FIELD */}
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

        {/* MAIN ACTION BUTTON */}
        <Can do={actionType} on={model.toLocaleLowerCase()}>
          <LoadingButton
            variant="outlined"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
            loading={actionLoading}
          >
            {actionType}
          </LoadingButton>
        </Can>

        {/* REJECT BUTTON */}
        <Can do={actionType} on={model.toLocaleLowerCase()}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => openConfirmDialog('reject')}
          >
            Reject
          </Button>
        </Can>
      </form>

      {/* BACKDROP LOADING */}
      <Backdrop
        open={actionLoading}
        transitionDuration={250}
        sx={{
          position: 'absolute',
          zIndex: (theme) => theme.zIndex.drawer - 1
        }}
      />
    </>
  );
};

export default ActionForm;
