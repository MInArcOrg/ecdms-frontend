import React from 'react'
import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

interface DonutChartProps {
  data: Record<string, number>[]
  height?: number
}

const DonutChart: React.FC<DonutChartProps> = ({ data, height = 220 }) => {
  const theme = useTheme()
  const labels = (data || []).map(obj => Object.keys(obj)[0])
  const series = (data || []).map(obj => Number(Object.values(obj)[0] || 0))

  const colors = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.error.main,
    theme.palette.secondary.main
  ]

  const options = {
    chart: {
      type: 'donut',
      toolbar: { show: false },
      animations: { enabled: true }
    },
    labels,
    colors,
    legend: {
      show: true,
      position: 'bottom',
      labels: { colors: theme.palette.text.primary },
      itemMargin: { horizontal: 8, vertical: 4 }
    },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
           
          }
        }
      }
    },
    stroke: { colors: [theme.palette.background.paper] }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {series.length ? (
        <ReactApexChart type='donut' height={height} options={options} series={series} />
      ) : (
        <Box sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>No data</Box>
      )}
    </Box>
  )
}

export default DonutChart

