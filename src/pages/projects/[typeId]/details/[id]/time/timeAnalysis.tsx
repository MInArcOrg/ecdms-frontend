import { Box, Card, CardContent, CircularProgress, Grid, Typography, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ProjectLayout from 'src/views/components/custom/projects/ProjectLayout'
import subMenuItems from './(subMenuItems)'
import ReactEcharts from 'echarts-for-react'
import { getProjectTimeAnalysis } from 'src/services/projects/projectTImeAnalysis'
import moment from 'moment'
import ProjectTimeAnalysisCard from 'src/views/components/custom/projects/time/ProjectTimeAnalysisCard'
import ExtensionTimeAnalysis from 'src/views/components/custom/projects/time/ExtensionTimeAnalysis'
import { useTranslation } from 'react-i18next'

function LifeCycle() {
  const router = useRouter()
  const { t } = useTranslation()
  const { id, typeid } = router.query
  const [detailForm, setDetailForm] = useState(false)
  const theme = useTheme()

  const [{ data, loading, error }, get] = getProjectTimeAnalysis(id)

  const contractTime = () => moment(data?.completion_time).diff(moment(new Date()), 'days')

  const totalContractTime = () => contractTime() + data?.total_time

  const seriesValue = Math.round(
    moment(data?.commencement_date).diff(moment(new Date()), 'days') / totalContractTime() / 100
  )

  const extensionTimePercent = () => {
    if (data?.extension_time) {
      return Math.round((data?.extension_time / data?.total_time) * 100)
    } else {
      return 0
    }
  }
  useEffect(() => {
    if (id) {
      get()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const options = {
    colors: [theme.palette.primary.main],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: true,
          name: {
            fontSize: '16px',
            fontWeight: 600,
            offsetY: -10,
            show: false
          },
          value: {
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontWeight: 400,
            offsetY: 5,
            formatter: function (val) {
              return val
            }
          }
        }
      }
    }
  }

  const optionsForEChart = {
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: false, readOnly: false },
        magicType: {
          show: false,
          type: ['line', 'bar', 'stack', 'tiled']
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },

    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, theme.palette.secondary.main],
              [0.5, theme.palette.error.main],
              [0.7, theme.palette.warning.main],
              [1, theme.palette.success.main]
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'inherit'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: 'inherit',
          distance: 40,
          fontSize: 15
        },
        detail: {
          valueAnimation: true,
          formatter: '{value} %',
          color: 'inherit'
        },
        data: [
          {
            value: `${data?.spi ? data?.spi?.toFixed(1) : 0}`
          }
        ]
      }
    ]
  }

  const legends = (color, text) => {
    return (
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display='flex' alignItems='center'>
          <Box
            component='span'
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              bgcolor: color,
              mr: 1
            }}
          />
          <Typography variant='subtitle1'>{t(text)}</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <ProjectLayout toggleForm={setDetailForm} activeMenu={2} activeSubMenu={1} subMenuItems={subMenuItems(id, typeid)}>
      {loading ? (
        <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProjectTimeAnalysisCard data={data} seriesValue={seriesValue} options={options} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ExtensionTimeAnalysis data={data} extensionTimePercent={extensionTimePercent()} options={options} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant='h6'>{t('Schedule Performance Index')}</Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} sx={{ mt: 15 }}>
                    {legends(theme.palette.secondary.main, 'Poor Performance')}
                    {legends(theme.palette.error.main, 'Below Target')}
                    {legends(theme.palette.warning.main, 'With in Target')}
                    {legends(theme.palette.success.main, 'Exceed Target')}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box height={400}>
                      <ReactEcharts option={optionsForEChart} style={{ height: '100%', width: '100%' }} />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </ProjectLayout>
  )
}

export default LifeCycle
