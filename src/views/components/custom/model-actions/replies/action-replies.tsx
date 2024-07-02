import { Button, FormControl, FormHelperText, FormLabel, OutlinedInput } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { map } from 'lodash';
import React from 'react';
import modelActionApiService from 'src/services/model-action/model-action-service';
import type { ActionReply, ModelAction } from 'src/types/general/model-action';
import * as Yup from 'yup';
import ReplyItemComponent from './reply-item';

const ActionReplyComponent = ({ replyData, actionData }: { replyData: ActionReply; actionData: ModelAction }) => {
  const { data, refetch } = useQuery({
    queryKey: ['action-replies', actionData?.id],
    queryFn: () => modelActionApiService.getActionReplies(String(actionData?.id), {})
  });

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      actionstate_id: actionData?.id,
      content: '',
      type: replyData?.type
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Title is required')
    }),
    onSubmit: (values) => {
      try {
        modelActionApiService.createActionReply({ data: values as ActionReply, files: [] });
        refetch();
        validation.resetForm();
      } catch (error) {}
    }
  });

  return (
    <React.Fragment>
      <div className="ms-3 me-3 mb-2 mt-0">
        <form
          className="needs-validation"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();

            return false;
          }}
        >
          <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
            <FormLabel component="legend">Reply</FormLabel>
            <OutlinedInput
              id="desc"
              name="content"
              placeholder="Reply"
              multiline
              size="small"
              minRows={2}
              value={validation.values.content}
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              error={validation.touched.content && validation.errors.content ? true : false}
            />
            {validation.touched.content && validation.errors.content ? (
              <FormHelperText error>{validation.errors.content}</FormHelperText>
            ) : null}
          </FormControl>
          <Button size="small" variant="contained" color="primary" type="submit" sx={{ mr: 2 }}>
            Reply
          </Button>
        </form>
        <div className="mt-2">
          {map(data?.payload, (reply, i) => (
            <ReplyItemComponent actionReply={reply} key={i} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ActionReplyComponent;
