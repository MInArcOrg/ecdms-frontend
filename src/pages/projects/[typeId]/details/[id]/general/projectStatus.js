import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import subMenuItems from './(subMenuItems)'
import { Icon } from '@iconify/react'
import ProjectStatusForm from 'src/views/components/forms/projects/ProjectStatusForm'
import * as Status from 'src/services/projects/projectStatus'
import Can from 'src/layouts/components/acl/Can'
import StatusCard from 'src/views/components/custom/projects/general/StatusCard'
import MuiTimeline from '@mui/lab/Timeline'
import { styled } from '@mui/system'
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import { parseISO } from 'date-fns'
import StatusChip from 'src/views/components/custom/projects/general/StatusChip'
import ModelAction from 'src/views/components/custom/model-actions'
import CustomChip from 'src/@core/components/mui/chip'
import ProjectStatusDetail from 'src/views/components/custom/projects/general/ProjectStatusDetail'
import { useTranslation } from 'react-i18next'
import { getDynamicDate } from 'src/views/components/forms/ethioCalendar/EthioCalendarUtils'

function ProjectStatus() {
  const router = useRouter()
  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const [show, setShow] = useState(false)
  const [selectedData, setSelectedData] = useState(undefined)
  const [showDetail, setShowDetail] = useState(false)

  const { i18n, t } = useTranslation()

  const [{ data: data, loading: loading, error: error }, get] = Status.getProjectStatus(id)

  const [{ data: postData, loading: postLoading, error: postError }, post] = Status.postProjectStatus()

  const [{ data: putData, loading: putLoading, error: putError }, put] = Status.putProjectStatus()

  const Timeline = styled(MuiTimeline)({
    paddingLeft: 0,
    paddingRight: 0,
    '& .MuiTimelineItem-root': {
      width: '100%',
      '&:before': {
        display: 'none'
      }
    }
  })

  const handleSubmit = async data => {
    return post({
      data: {
        project_id: id,
        ...data
      }
    }).then(() => {
      get()
      setShow(false)
    })
  }

  return (
    <ProjectLayout
      id={id}
      toggleForm={setDetailForm}
      activeMenu={0}
      activeSubMenu={3}
      subMenuItems={subMenuItems(id, typeid)}
    >
      {show && (
        <ProjectStatusForm
          show={show}
          data={selectedData}
          toggleDrawer={() => setShow(!show)}
          title='Project Status'
          handleFormSubmit={handleSubmit}
          loading={postLoading || putLoading}
          postError={postError || putError}
        />
      )}
      {showDetail && (
        <ProjectStatusDetail
          show={showDetail}
          data={selectedData}
          toggleDrawer={() => setShowDetail(!showDetail)}
          title={`${t('Project')} ${t('Status')} ${t('Detail')}`}
        />
      )}

      {loading && <CircularProgress sx={{ ml: '50%' }} />}
      {!loading && data?.data?.length > 0 && (
        <Card>
          <CardContent>
            <Timeline>
              {data?.data?.map((item, index) => (
                <TimelineItem key={item.id}>
                  <TimelineSeparator>
                    <TimelineDot color='primary' variant={`${index === 0 ? 'filled' : 'outlined'}`} />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                    <Box display='flex' alignContent='center' alignItems='center'>
                      <Typography variant='body2' sx={{ color: 'text.primary' }}>
                        <span>{getDynamicDate(i18n, item?.createdAt).toDateString()}</span>
                        <Icon icon='tabler:arrow-right' fontSize={20} />{' '}
                      </Typography>

                      <StatusChip
                        data={item.status.title}
                        onClick={() => {
                          setSelectedData(item)
                          setShowDetail(true)
                        }}
                      />
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
            {data?.data?.length > 0 && (
              <Box display='flex' justifyContent='end' alignItems='end'>
                <Box display='flex' gap={2}>
                  <Can do={'register_projectstatus'} on={'projectstatus'}>
                    <CustomChip
                      label='Change Status'
                      color='primary'
                      rounded
                      size='small'
                      skin='light'
                      sx={{
                        '& .MuiChip-label': { textTransform: 'capitalize' },
                        '&:hover': { color: '#fff' },
                        cursor: 'pointer',
                        height: 20
                      }}
                      onClick={() => {
                        setSelectedData(data?.data[0])
                        setShow(true)
                      }}
                    />
                  </Can>

                  <ModelAction
                    model_id={data?.data[0]?.id}
                    model='projectstatus'
                    title={`${t('Project')} ${t('Status')}`}
                  />
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </ProjectLayout>
  )
}
ProjectStatus.acl = {
  subject: 'projectstatus',
  action: 'view_projectstatus'
}

export default ProjectStatus
