import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createReply, getActionReplies } from 'src/services/model-action/model-action-service'
import { Button, FormControl, FormHelperText, FormLabel, OutlinedInput } from '@mui/material'

const ActionReply = ({ replyData }) => {
  const [{ data: submittedData, loading: submitLoading, error: submitError }, executePost] = createReply()
  const [{ data, loading, error }, refetch] = getActionReplies(replyData?.action_id)

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      actionstate_id: replyData?.action_id,
      content: '',
      type: replyData?.type
    },
    validationSchema: Yup.object({
      content: Yup.string().required('Title is required')
    }),
    onSubmit: values => {
      executePost({ data: values })
    }
  })
  useEffect(() => {
    refetch()
    validation.resetForm()
  }, [submittedData])

  return (
    <React.Fragment>
      <div className='ms-3 me-3 mb-2 mt-0'>
        <form
          className='needs-validation'
          onSubmit={e => {
            e.preventDefault()
            validation.handleSubmit()

            return false
          }}
        >
          <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
            <FormLabel component='legend'>Reply</FormLabel>
            <OutlinedInput
              id='desc'
              name='content'
              placeholder='Reply'
              multiline
              size='small'
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
          <Button size='small' variant='contained' color='primary' type='submit' sx={{ mr: 2 }}>
            Reply
          </Button>
        </form>
        <div className='mt-2'>
          {map(data, (reply, i) => (
            <div className='d-flex py-1'>
              <div>
                <div className='avatar-xs me-3'>
                  <div className='avatar-title rounded-circle bg-light text-primary'>
                    <i className='bx bxs-user'></i>
                  </div>
                </div>
              </div>
              <div className='flex-grow-1'>
                <h5 className='font-size-14 mb-1'>
                  Abenezer Seyoum <small className='text-muted float-end'>1 hr Ago</small>
                </h5>
                <p className='text-muted'>{reply.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  )
}
ActionReply.propTypes = {
  task_id: PropTypes.string,
  data: PropTypes.array,
  replyData: PropTypes.object,
  refetch: PropTypes.func
}

export default ActionReply
