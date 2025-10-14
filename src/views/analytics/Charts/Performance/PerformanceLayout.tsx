import { Box, Card, CardContent, Grid, Switch, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useMemo, useState } from 'react'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useAuth } from 'src/hooks/useAuth'
import departmentApiService from 'src/services/department/department-service'
import PerformanceTable from './PerformanceTable'

interface PerformanceLayoutProps {
  title: string
  data: { name: string; data: number[] }[]
  options: any
}

function PerformanceLayout({ title, data, options }: PerformanceLayoutProps) {
  const [checked, setChecked] = useState(false)
  const [percent, setPercent] = useState(data)

  const years = ['2023', '2022', '2021', '2020', '2019', '2018']
  const [year, setYear] = useState(years[0])
  const { user } = useAuth()

  // 🔹 Fetch departments (used as labels)
  const { data: labels } = useQuery({
    queryKey: ['departments', user?.id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: { parent_department_id: user?.department_id }
      }),
    enabled: !!user?.id
  })

  // 🔹 Initialize region after labels load
  const [region, setRegion] = useState<any>(null)
  useEffect(() => {
    if (labels?.length > 0) {
      setRegion(labels?.payload[0])
    }
  }, [labels])

  // 🔹 Helper: calculate percent performance
  const calculatePercent = (a: number[], b: number[]) => {
    const result = [{ name: 'Performance', data: [] as number[] }]
    a.forEach((item, index) => {
      const base = b[index] || 1 // prevent divide by zero
      const percent = (item / base) * 100
      result[0].data.push(Number(percent.toFixed(0)))
    })
    return result
  }

  // 🔹 Handle switch toggle
  const handleChange = () => {
    setChecked(prev => !prev)
  }

  // 🔹 Update displayed chart data when toggled
  useEffect(() => {
    if (checked && data.length >= 2) {
      setPercent(calculatePercent(data[0].data, data[1].data))
    } else {
      setPercent(data)
    }
  }, [checked, data])

  return (
    <Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PerformanceTable
            title={title}
            regions={labels?.payload}
            year={year}
            setYear={setYear}
            region={region}
            setRegion={setRegion}
            years={years}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display='flex' alignItems='center' mb={2}>
                <Typography variant='subtitle2' sx={{ mt: 1, mr: 1 }}>
                  Monthly Financial Amount
                </Typography>
                <Switch color='primary' checked={checked} onChange={handleChange} />
                <Typography variant='subtitle2' sx={{ mt: 1, ml: 1 }}>
                  Performance
                </Typography>
              </Box>

              <ReactApexcharts options={options} series={percent} type='bar' height={289.5} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default PerformanceLayout
