import { Fragment, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import Icon from 'src/@core/components/icon'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Backdrop, CircularProgress, FormLabel } from '@mui/material'
import { createDepartment, updateDepartment } from 'src/services/department/department-service'
import ApiErrors from '../../ApiErrors'
import { useTranslation } from 'react-i18next'

function SubdepartmentDrawer({ show, toggleDrawer, title, parent_department_id, refetch, editableData }) {
  const [{ data, loading, error }, executePost] = !editableData
    ? createDepartment()
    : updateDepartment(editableData?.id)
  const { t } = useTranslation()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: editableData?.name || '',
      description: editableData?.description || ''
    },

    validationSchema: Yup.object({
      name: Yup.string().required(`${t('Department')} ${t('Name')} ${t('is required')}`)
    }),
    onSubmit: values => {
      executePost({ data: { ...values, parent_department_id } })
    }
  })
  useEffect(() => {
    if (data) {
      validation.resetForm()
      refetch()
      toggleDrawer()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Fragment>
      <Drawer
        anchor='right'
        open={show}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              sm: '100%',
              md: '30%',
              lg: '25%'
            },
            boxSizing: 'border-box'
          }
        }}
      >
        <Backdrop
          open={loading}
          sx={{
            position: 'absolute',
            color: 'primary.main',
            zIndex: theme => theme.zIndex.mobileStepper - 1
          }}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: '1',
              p: 3
            }}
          >
            <Typography variant='body1'>
              {editableData ? `${t('Edit')}  ${t(title)}` : `${t('Add')}  ${t(title)}`}
            </Typography>
            <Icon
              icon='tabler:x'
              size='20'
              cursor='pointer'
              onClick={() => {
                validation.resetForm()
                toggleDrawer()
              }}
            />
          </Box>
          <Box p={3}>
            <ApiErrors error={error} />
          </Box>

          <CardContent>
            <form
              className='needs-validation'
              onSubmit={e => {
                e.preventDefault()
                validation.handleSubmit()

                return false
              }}
            >
              <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                <FormLabel htmlFor='name'>{`${t('Department')} ${t('Name')}`}</FormLabel>
                <OutlinedInput
                  id='name'
                  name='name'
                  size='small'
                  placeholder={`${t('Department')} ${t('Name')}`}
                  value={validation.values.name}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.name && validation.errors.name ? true : false}
                />
                {validation.touched.name && validation.errors.name ? (
                  <FormHelperText error>{validation.errors.name}</FormHelperText>
                ) : null}
              </FormControl>

              <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                <FormLabel component='legend'>{t('Description')}</FormLabel>

                <OutlinedInput
                  id='desc'
                  name='description'
                  placeholder={t('Description')}
                  multiline
                  size='small'
                  minRows={2}
                  value={validation.values.description}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  error={validation.touched.description && validation.errors.description ? true : false}
                />
                {validation.touched.description && validation.errors.description ? (
                  <FormHelperText error>{validation.errors.description}</FormHelperText>
                ) : null}
              </FormControl>

              <Button variant='contained' color='primary' type='submit' sx={{ mr: 2 }}>
                {t('Submit')}
              </Button>
              <Button
                variant='contained'
                color='secondary'
                disabled={loading}
                onClick={() => {
                  validation.resetForm()
                  toggleDrawer()
                }}
              >
                {t('Cancel')}
              </Button>
            </form>
          </CardContent>
        </Box>
      </Drawer>
    </Fragment>
  )
}

export default SubdepartmentDrawer
