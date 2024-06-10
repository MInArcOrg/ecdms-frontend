import { Fragment, forwardRef, useEffect } from 'react'
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
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { getPositionByDepartmentId } from 'src/services/department/position-service'
import { createProfessional, updateProfessional } from 'src/services/department/professional-service'
import moment from 'moment'
import { MuiPhone } from '../../phoneInput'
import { convertToGC, getDynamicDate } from '../../forms/ethioCalendar/EthioCalendarUtils'
import { useTranslation } from 'react-i18next'
import DynamicDatePicker from '../../forms/ethioCalendar/DynamicDatePicker'
import ApiErrors from '../../ApiErrors'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label={props.label || ''} autoComplete='off' />
})
function ProfessionalDrawer({ show, toggleDrawer, title, editableData, department_id, refetch }) {
  const [{ data: positions }] = getPositionByDepartmentId(department_id)

  const [{ data, loading, error }, executePost] = !editableData
    ? createProfessional()
    : updateProfessional(editableData?.id)

  const { i18n, t } = useTranslation()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      first_name: editableData?.first_name || '',
      middle_name: editableData?.middle_name || '',
      last_name: editableData?.last_name || '',
      phone: editableData?.phone || '',
      email: editableData?.email || '',
      gender: editableData?.gender || '',
      position: positions?.find(position => position.id === editableData?.position_id) || null,
      birth_date: editableData?.birth_date
        ? getDynamicDate(i18n, moment(editableData?.birth_date).toDate())
        : undefined,
      redirectUrl: window.location.origin + '/' + 'reset-password/'
    },

    validationSchema: Yup.object({
      first_name: Yup.string().required(`${t('First Name')} ${t('is required')}`),
      middle_name: Yup.string().required(`${t('Middle Name')} ${t('is required')}`),
      last_name: Yup.string().required(`${t('Last Name')} ${t('is required')}`),
      phone: Yup.string().required(`${t('Phone')} ${t('is required')}`),
      email: Yup.string().required(`${t('Email')} ${t('is required')}`)
    }),
    onSubmit: values => {
      if (i18n.language === 'am') {
        values.birth_date = convertToGC(values.birth_date)
      }

      executePost({ data: { ...values, position_id: values?.position?.id, phone: values.phone.replace(/ /g, '') } })
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
              md: '36%',
              lg: '30%'
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
          {error && (
            <Box p={3}>
              <ApiErrors error={error} />
            </Box>
          )}
          <CardContent>
            <form
              className='needs-validation'
              onSubmit={e => {
                e.preventDefault()
                validation.handleSubmit()

                return false
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel sx={{ mb: 2 }}>{t('First Name')}</FormLabel>
                    <OutlinedInput
                      id='first_name'
                      name='first_name'
                      size='small'
                      placeholder={t('First Name')}
                      value={validation.values.first_name}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      error={validation.touched.first_name && validation.errors.first_name ? true : false}
                    />
                    {validation.touched.first_name && validation.errors.first_name ? (
                      <FormHelperText error>{validation.errors.first_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel sx={{ mb: 2 }}>{t('Middle Name')}</FormLabel>
                    <OutlinedInput
                      id='middle_name'
                      name='middle_name'
                      size='small'
                      placeholder={t('Middle Name')}
                      value={validation.values.middle_name}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      error={validation.touched.middle_name && validation.errors.middle_name ? true : false}
                    />
                    {validation.touched.middle_name && validation.errors.middle_name ? (
                      <FormHelperText error>{validation.errors.middle_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel sx={{ mb: 2 }}>{t('Last Name')}</FormLabel>
                    <OutlinedInput
                      id='last_name'
                      name='last_name'
                      size='small'
                      placeholder={t('Last Name')}
                      value={validation.values.last_name}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      error={validation.touched.last_name && validation.errors.last_name ? true : false}
                    />
                    {validation.touched.last_name && validation.errors.last_name ? (
                      <FormHelperText error>{validation.errors.last_name}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePickerWrapper>
                    <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                      <FormLabel sx={{ mb: 2 }}>{t('Birth Date')}</FormLabel>
                      <DynamicDatePicker
                        value={validation.values.birth_date}
                        showYearDropdown
                        showMonthDropdown
                        placeholderText={t('DD-MM-YYYY')}
                        customInput={<CustomInput />}
                        onChange={date => {
                          validation.setFieldValue('birth_date', date)
                        }}
                      />
                    </FormControl>
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel sx={{ mb: 2 }}>{t('Phone')}</FormLabel>

                    <MuiPhone
                      value={validation.values.phone}
                      onChange={phone => validation.setFieldValue('phone', phone)}
                      onBlur={validation.handleBlur('phone')}
                      error={validation.touched.phone && validation.errors.phone ? true : false}
                    />
                    {validation.touched.phone && validation.errors.phone ? (
                      <FormHelperText error>{validation.errors.phone}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel sx={{ mb: 2 }}>{t('Email')}</FormLabel>
                    <OutlinedInput
                      id='email'
                      name='email'
                      size='small'
                      placeholder={t('Email')}
                      value={validation.values.email}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      error={validation.touched.email && validation.errors.email ? true : false}
                    />
                    {validation.touched.email && validation.errors.email ? (
                      <FormHelperText error>{validation.errors.email}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl variant='outlined' sx={{ mb: 3 }}>
                    <FormLabel>{t('Gender')}</FormLabel>
                    <RadioGroup
                      row
                      name='gender'
                      value={validation.values.gender}
                      onChange={(e, value) => validation.setFieldValue('gender', value)}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel value='male' control={<Radio />} label={t('Male')} />
                        <FormControlLabel value='female' control={<Radio />} label={t('Female')} />
                      </Box>
                    </RadioGroup>

                    {validation.touched.gender && validation.errors.gender ? (
                      <FormHelperText error>{validation.errors.gender}</FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                {!editableData ? (
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth variant='outlined' sx={{ mb: 3 }}>
                      <FormLabel component='legend'>{t('Position')}</FormLabel>

                      {positions ? (
                        <Autocomplete
                          disableClearable
                          size='small'
                          options={positions}
                          getOptionLabel={position => position.name}
                          isOptionEqualToValue={(option, value) => {
                            return option.name === value?.name
                          }}
                          value={validation.values.position}
                          onChange={(event, position) => {
                            validation.setFieldValue('position', position)
                          }}
                          renderInput={params => (
                            <TextField {...params} placeholder={t('Position')} name='position' variant='outlined' />
                          )}
                        />
                      ) : null}
                    </FormControl>
                  </Grid>
                ) : null}
              </Grid>

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

export default ProfessionalDrawer
