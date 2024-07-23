import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import CustomChip from 'src/@core/components/mui/chip'
import ProfileCard from 'src/views/components/custom/projects/ProfileCard'
import subMenuItems from './(subMenuItems)'
import { getProjectDetail } from 'src/services/projects'
import { numberFormat } from 'src/helpers/numberFormater'
import StatusChip from 'src/views/components/custom/projects/general/StatusChip'
import { useTranslation } from 'react-i18next'

function Detail() {
  const router = useRouter()
  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)

  const [{ data, loading, error }, refetch] = getProjectDetail(id)

  useEffect(() => {
    if (id) {
      refetch()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const { t } = useTranslation()

  return (
    <ProjectLayout
      id={id}
      toggleForm={setDetailForm}
      activeMenu={0}
      activeSubMenu={0}
      subMenuItems={subMenuItems(id, typeid)}
    >
      <Card
        sx={{
          mb: 3
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ProfileCard projectInfo={{ ...data, id }} time={data?.time} />
          </Grid>
        </Grid>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} display='flex' gap={5}>
              <Box>
                <Typography variant='subtitle1'>{t('Client')}</Typography>
                <Typography variant='subtitle1'>{t('Contractor')}</Typography>
                <Typography variant='subtitle1'>{t('Consultant')}</Typography>
              </Box>
              <Box>
                <Typography variant='subtitle1'>
                  {data?.client != null ? data?.client : t('Please add client')}
                </Typography>
                <Typography variant='subtitle1'>
                  {data?.contractor != null ? data?.contractor : t('Please add contractor')}
                </Typography>
                <Typography variant='subtitle1'>
                  {data?.consultant != null ? data?.consultant : t('Please add consultant')}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              gap={5}
              sx={{
                justifyContent: {
                  md: 'end'
                }
              }}
              display='flex'
            >
              <Box>
                <Typography variant='h7'>{t('Contract Price')}</Typography>
                <Typography variant='subtitle1' pt={3}>
                  {t('Project Status')}
                </Typography>
              </Box>
              <Box>
                <CustomChip
                  rounded
                  size='small'
                  color='primary'
                  label={
                    data?.main_contract_price_amount != null
                      ? numberFormat(data?.main_contract_price_amount)
                      : t('Please add Main Contract Price')
                  }
                />
                <Box pt={3}>
                  <StatusChip data={data?.project_status} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ProjectLayout>
  )
}
Detail.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
}

export default Detail
