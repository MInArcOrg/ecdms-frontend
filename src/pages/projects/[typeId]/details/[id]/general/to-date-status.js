import { Card, Grid, Table, TableBody, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import TableCell from '@mui/material/TableCell'
import CustomChip from 'src/@core/components/mui/chip'
import ProjectStataticsCard from 'src/views/components/custom/projects/ProjectStataticsCard'
import subMenuItems from './(subMenuItems)'
import { getProjectAnalysis } from 'src/services/projects'
import perfromance from 'src/helpers/perfromance'
import { useTranslation } from 'react-i18next'

function ToDateStatus() {
  // states / hooks / variables
  const router = useRouter()

  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const { t } = useTranslation()
  const [{ data, loading, error }, refetch] = getProjectAnalysis(id)

  const color = status => {
    switch (status) {
      case 'danger':
        return 'error'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      default:
        return 'primary'
    }
  }

  const cpiPer = perfromance.find(item => item.from <= data?.cpi && item.to >= data?.cpi)
  const spiPer = perfromance.find(item => item.from <= data?.spi && item.to >= data?.spi)
  const repaidPer = perfromance.find(item => item.from <= data?.repaid && item.to >= data?.repaid)

  return (
    <ProjectLayout
      id={id}
      toggleForm={setDetailForm}
      activeMenu={0}
      activeSubMenu={1}
      subMenuItems={subMenuItems(id, typeid)}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle1'>CPI</Typography>
                    <Typography variant='subtitle2'>CV</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={cpiPer?.colorClass ? cpiPer?.colorClass : 'primary'}
                      label={`${data?.cpi ? data?.cpi.toFixed(2) : ''}%`}
                    />
                    {''} {cpiPer?.name && data?.cpi ? cpiPer?.name : ''}
                    <Typography variant='subtitle2'>{data?.cv ? data?.cv : 0}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle1'>SPI</Typography>
                    <Typography variant='subtitle2'>SV</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={spiPer?.colorClass ? spiPer?.colorClass : 'primary'}
                      label={`${data?.spi ? data?.spi.toFixed(2) : ''} %`}
                    />
                    {''} {spiPer?.name && data?.spi ? spiPer?.name : ''}
                    <Typography variant='subtitle2'>{data?.sv ? data?.sv : 0}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2'>{t('Repaid Advanced')}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={repaidPer?.colorClass ? repaidPer?.colorClass : 'primary'}
                      label={`${data?.repaid_percent ? data?.repaid_percent : ''}%`}
                    />
                    {''} {repaidPer?.name && data?.repaid ? repaidPer?.name : ''}
                    <Typography variant='subtitle2'>{data?.repaid ? data?.repaid : 0}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2'>{t('Advanced Bond')}</Typography>
                  </TableCell>

                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={color(data?.advance_status?.status)}
                      label={`${data?.advance_status?.status}`}
                    />{' '}
                    {''}
                    {data?.advance_status?.days} days {data?.advance_status?.days <= 0 ? t('passed') : t('left')}
                    <Typography variant='subtitle2'>{data?.advance_bond ? data?.advance_bond : 0}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2'>{t('Performance Bond')}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={color(data?.performance_status?.status)}
                      label={`${data?.performance_status?.status}`}
                    />
                    {''} {data?.performance_status?.days} days{' '}
                    {data?.performance_status?.days <= 0 ? t('passed') : t('left')}
                    <Typography variant='subtitle2'>{data?.performance_bond ? data?.performance_bond : 0}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant='subtitle2'>{t('Bid Bond')}</Typography>
                  </TableCell>

                  <TableCell align='right'>
                    <CustomChip
                      rounded
                      size='small'
                      color={color(data?.bid_status?.status)}
                      label={`${data?.bid_status?.status}`}
                    />
                    {''} {data?.bid_status?.days} days {data?.bid_status?.days <= 0 ? t('passed') : t('left')}
                    <Typography variant='subtitle2'>{data?.bid_bond ? data?.bid_bond : 0}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectStataticsCard data={data} />
        </Grid>
        {/* <Grid item xs={12} md={12}>
          <ApexAreaChart />
        </Grid> */}
      </Grid>
    </ProjectLayout>
  )
}
ToDateStatus.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
}

export default ToDateStatus
