import { useState } from 'react'
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

interface ProjectCategoryChartProps {
  series: { name: string; data: number[] }[]
  labels: []
  title: string
  height?: number
}

const columnColors = ['#E6E6E7', '#FF9F43', '#00E396', '#008FFB']

const ProjectCategoryChart = ({
  series,
  labels,
  title,
  height = 320
}: ProjectCategoryChartProps) => {
  const theme = useTheme()
  const years = ['2024', '2023', '2022', '2021', '2020']
  const [year, setYear] = useState(years[0])

  const options: ApexCharts.ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    colors: columnColors,
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    stroke: { show: true, colors: ['transparent'] },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: { offsetY: 1, offsetX: -3 },
      itemMargin: { vertical: 3, horizontal: 10 }
    },
    plotOptions: {
      bar: {
        columnWidth: '25%',
        borderRadius: 6,
        distributed: false
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: { lines: { show: true } }
    },
    yaxis: {
      labels: { style: { colors: theme.palette.text.disabled } }
    },
    xaxis: {
      categories: labels?.map(l => l) ?? [],
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      crosshairs: { stroke: { color: theme.palette.divider } },
      labels: { style: { colors: theme.palette.text.disabled } }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: { bar: { columnWidth: '45%' } }
        }
      }
    ]
  }

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6">{title}</Typography>

          <Autocomplete
            disableClearable
            size="small"
            options={years}
            value={year}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(_, value) => setYear(value)}
            renderInput={params => (
              <TextField {...params} label="Year" variant="outlined" />
            )}
            sx={{ width: 120 }}
          />
        </Box>

        {labels?.length && series?.length ? (
          <ReactApexcharts
            type="bar"
            height={height}
            options={options}
            series={series}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            No data available
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectCategoryChart
