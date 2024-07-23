import { Fragment, useEffect } from 'react'
import Drawer from '@mui/material/Drawer'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from 'src/@core/components/icon'
import { CardContent, CircularProgress, Divider } from '@mui/material'
import { getProjectGeneralInformation } from 'src/services/projects'
import CustomChip from 'src/@core/components/mui/chip'
import { numberFormat } from 'src/helpers/numberFormater'
import { useTranslation } from 'react-i18next'
import { getDynamicDate } from '../../forms/ethioCalendar/EthioCalendarUtils'

function ProjectInfo({ show, toggleDrawer, id, title }) {
  const [{ data, loading, error }, get] = getProjectGeneralInformation(id)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (id) {
      get()
    }
  }, [id])

  const percentof = (a, b) => {
    return ((a / b) * 100).toFixed(2)
  }

  const remaingIpc = data?.total_contract_amount - data?.paid_ipc

  return (
    <Fragment>
      <Drawer
        anchor='right'
        open={show}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              md: '36%',
              lg: '30%'
            },
            boxSizing: 'border-box'
          }
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: '1',
              p: 3
            }}
          >
            <Typography variant='h6'>{t(title)}</Typography>
            <Icon
              icon='tabler:x'
              size='20'
              cursor='pointer'
              onClick={() => {
                toggleDrawer()
              }}
            />
          </Box>
        </Box>{' '}
        <CardContent>
          {loading && (
            <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
              <CircularProgress />
            </Box>
          )}
          {!loading ? (
            <Box alignContent='center' justifyContent='space-between'>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='16px'>
                  <strong> {data?.name}</strong>
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <strong> {t('Stakholder Information')}</strong>
                </Typography>
              </Box>
              <Divider />

              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Client')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.client}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Consultant')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.Consultant}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Contractor')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.contractor}
                </Typography>
              </Box>

              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <strong> {t('Time Information')}</strong>
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Commencement date')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.commencement_date ? getDynamicDate(i18n, data?.commencement_date).toDateString() : ''}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Completion date')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.completion_date ? getDynamicDate(i18n, data?.completion_date).toDateString() : ''}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Total duration')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.contract_duration ? data?.contract_duration : '0'} days
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Elapsed time')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={`${data?.elapsed_time ? percentof(data?.elapsed_time, data?.contract_duration) : '0'} %`}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />{' '}
                  {data?.elapsed_time ? data?.elapsed_time : '0'} days
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <strong> {t('Finance Information')}</strong>
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Total contract amount')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={data?.total_contract_amount ? numberFormat(data?.total_contract_amount) : '0'}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />{' '}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Paid IPC')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={`${data?.paid_ipc ? percentof(data?.paid_ipc, data?.total_contract_amount) : '0'} %`}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />{' '}
                  ({data?.paid_ipc ? numberFormat(data?.paid_ipc) : '0'})
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Remaining IPC')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={`${
                      data?.total_contract_amount ? percentof(remaingIpc, data?.total_contract_amount) : '0'
                    } %`}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />{' '}
                  ({data?.total_contract_amount ? numberFormat(remaingIpc) : '0'})
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <strong>{t('Earned Value Analysis')}</strong>
                </Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Planned Value')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.planned_revenue}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Earned Value')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.earned_revenue}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {t('Actual Cost')}
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.actual_cost}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  CPI
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={`${data?.cpi ? data?.cpi.toFixed(2) : '0'} %`}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />
                </Typography>
              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  CV
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.cv}
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  SPI
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  <CustomChip
                    label={`${data?.spi ? data?.spi.toFixed(2) : '0'} %`}
                    color='primary'
                    rounded
                    size='small'
                    skin='light'
                    sx={{
                      '& .MuiChip-label': { textTransform: 'capitalize' },
                      height: 20
                    }}
                  />
                </Typography>
              </Box>

              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  SV
                </Typography>
                <Typography variant='subtitle1' fontWeight='light' fontSize='14px'>
                  {data?.sv}
                </Typography>
              </Box>
            </Box>
          ) : null}
        </CardContent>
      </Drawer>
    </Fragment>
  )
}

export default ProjectInfo
