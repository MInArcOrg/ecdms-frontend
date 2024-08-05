import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { styled } from '@mui/system'

import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import { Icon } from '@iconify/react'
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@mui/lab'
import MuiTimeline from '@mui/lab/Timeline'
import ProjectTimeForm from 'src/views/components/forms/projects/ProjectTimeForm'
import { getProjectTime, postProjectTime, putProjectTime } from 'src/services/projects/projectTime'
import { addDays, parseISO } from 'date-fns'
import subMenuItems from './(subMenuItems)'
import ModelAction from 'src/views/components/custom/model-actions'
import Can from 'src/layouts/components/acl/Can'
import { uploadFiles, uploadableProjectFileTypes } from 'src/services/file/file-service'
import FileDrawer from 'src/views/components/custom/files-drawer'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getDynamicDate } from 'src/views/components/forms/ethioCalendar/EthioCalendarUtils'

function Timeline() {
  const router = useRouter()
  const { i18n, t } = useTranslation()

  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedData, setSelectedData] = useState(undefined)

  const [{ data: projectTime, loading: postDataLoading, error: postError }, post] = postProjectTime()
  const [{ data: projectTimeData, loading: loading }, get] = getProjectTime(id)
  const [{ data: putData, loading: putLoading, error: putError }, put] = putProjectTime()
  const type = uploadableProjectFileTypes.time

  const originalCompletionDate = addDays(
    parseISO(projectTimeData?.contract_signing_date),
    projectTimeData?.original_contract_duration
  )

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
    const params = {
      project_id: id,
      ...data
    }
    const files = data.referenceFile
    delete params.referenceFile

    if (data.id) {
      return put({
        url: `/project-time/${data.id}`,
        data: params
      }).then(() => {
        if (files?.length > 0) {
          files.map(async file => await uploadFiles(file, type, data.id))
        }
        get()
        setShowDrawer(false)
      })
    }

    return post({
      data: params
    }).then(res => {
      if (files.length > 0) {
        files.map(async file => await uploadFiles(file, type, res.data.id))
      }
      get()
      setShowDrawer(false)
    })
  }

  return (
    <ProjectLayout toggleForm={setDetailForm} activeMenu={2} activeSubMenu={0} subMenuItems={subMenuItems(id, typeid)}>
      {showDrawer && (
        <ProjectTimeForm
          show={showDrawer}
          toggleDrawer={() => setShowDrawer(!showDrawer)}
          data={selectedData}
          handleFormSubmit={handleSubmit}
          title={'Timeline'}
          postError={postError || putError}
          loading={postDataLoading || putLoading}
        />
      )}
      <Box display='flex' flexDirection='column' gap={3}>
        {projectTimeData ? null : (
          <Box alignSelf='end'>
            <Can do={'register_projecttime'} on={'projecttime'}>
              <Icon
                icon='mdi:plus'
                width='25'
                height='25'
                onClick={() => {
                  setShowDrawer(true)
                }}
                cursor='pointer'
              />
            </Can>
          </Box>
        )}
        <Card>
          <CardContent>
            {loading ? (
              <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <CircularProgress />
              </Box>
            ) : (
              <Fragment>
                {!loading && projectTimeData ? (
                  <Timeline>
                    <TimelineItem>
                      <TimelineSeparator>
                        {moment(projectTimeData?.contract_signing_date).isAfter() ? (
                          <TimelineDot color='primary' variant='outlined' />
                        ) : (
                          <TimelineDot color='primary' />
                        )}
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            <span>
                              {projectTimeData?.contract_signing_date
                                ? getDynamicDate(i18n, projectTimeData?.contract_signing_date).toDateString()
                                : t('please fill contract signing date')}
                            </span>{' '}
                            <Icon icon='tabler:arrow-right' fontSize={20} /> <span>{t('Contract signing date')}</span>
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        {moment(projectTimeData?.site_handover_date).isAfter() ? (
                          <TimelineDot color='primary' variant='outlined' />
                        ) : (
                          <TimelineDot color='primary' />
                        )}

                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            <span>
                              {projectTimeData?.site_handover_date
                                ? getDynamicDate(i18n, projectTimeData?.site_handover_date).toDateString()
                                : t('please fill the site handover date')}
                            </span>{' '}
                            <Icon icon='tabler:arrow-right' fontSize={20} /> <span>{t('Site handover date')}</span>
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        {moment(projectTimeData?.commencement_date).isAfter() ? (
                          <TimelineDot color='primary' variant='outlined' />
                        ) : (
                          <TimelineDot color='primary' />
                        )}

                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            <span>
                              {projectTimeData?.commencement_date
                                ? getDynamicDate(i18n, projectTimeData?.commencement_date).toDateString()
                                : t('please fill the commencement date')}
                            </span>
                            <Icon icon='tabler:arrow-right' fontSize={20} /> <span>{t('Commencement date')}</span>
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        {moment(originalCompletionDate).isAfter() ? (
                          <TimelineDot color='primary' variant='outlined' />
                        ) : (
                          <TimelineDot color='primary' />
                        )}

                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            <span>
                              {projectTimeData?.original_contract_duration
                                ? getDynamicDate(i18n, originalCompletionDate).toDateString()
                                : t('please fill the original contract duration')}
                            </span>
                            <Icon icon='tabler:arrow-right' fontSize={20} />{' '}
                            <span>{t('Original project completion date')}</span>
                          </Typography>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        {moment(projectTimeData?.revised_completion_date).isAfter() ? (
                          <TimelineDot color='primary' variant='outlined' />
                        ) : (
                          <TimelineDot color='primary' />
                        )}
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent sx={{ '& svg': { verticalAlign: 'bottom' } }}>
                        <Box>
                          <Typography variant='body2' sx={{ color: 'text.primary' }}>
                            <span>
                              {projectTimeData?.revised_completion_date
                                ? getDynamicDate(i18n, projectTimeData?.revised_completion_date).toDateString()
                                : t('Date only appears if there is a revised project completion date')}
                            </span>
                            <Icon icon='tabler:arrow-right' fontSize={20} />{' '}
                            <span>{t('Revised Project completion date')}</span>
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                          <FileDrawer id={projectTimeData?.id} type={type} />
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                ) : (
                  <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                    <Typography variant='body1' sx={{ color: 'text.primary' }}>
                      {`${t('Timeline')} ${t('Data Not Found')}`}
                    </Typography>
                  </Box>
                )}
              </Fragment>
            )}

            <Box display='flex' justifyContent='end' alignItems='end'>
              {projectTimeData ? (
                <Box display='flex' gap={2}>
                  <ModelAction
                    handleEdit={() => {
                      setSelectedData(projectTimeData)
                      setShowDrawer(true)
                    }}
                    editPermission={{
                      action: 'register_projecttime',
                      subject: 'projecttime'
                    }}
                    model='projecttime'
                    model_id={projectTimeData?.id}
                    title='Timeline'
                    refetchModel={get}
                  />
                </Box>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ProjectLayout>
  )
}
Timeline.acl = {
  action: 'view_projecttime',
  subject: 'projecttime'
}

export default Timeline
