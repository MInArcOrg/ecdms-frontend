import React from 'react'
import dynamic from 'next/dynamic'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false }) as any

interface DonutChartProps {
  data: Record<string, number>[]
  height?: number
  showLegend?: boolean
  centerLabel?: string
  centerValue?: number | string
}

const DonutChart: React.FC<DonutChartProps> = ({ data, height = 220, showLegend = true, centerLabel, centerValue }) => {
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
      show: showLegend,
      position: 'bottom',
      labels: { colors: theme.palette.text.primary },
      itemMargin: { horizontal: 8, vertical: 4 }
    },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: Boolean(centerLabel),
            total: {
              show: Boolean(centerLabel),
              label: centerLabel || '',
              color: theme.palette.text.secondary,
              formatter: (w: any) => {
                if (typeof centerValue === 'string') return centerValue
                if (typeof centerValue === 'number') {
                  return centerValue >= 1000 ? `${(centerValue / 1000).toFixed(1)}k` : String(centerValue)
                }
                const total = w?.globals?.seriesTotals?.reduce((a: number, b: number) => a + b, 0) || 0
                return total >= 1000 ? `${(total / 1000).toFixed(1)}k` : String(total)
              }
            }
          }
        }
      }
    },
    stroke: { colors: [theme.palette.background.paper] }
  }

  return (
    <Box sx={{ width: '100%', minWidth: 240 }}>
      {series.length ? (
        <ReactApexChart type='donut' width='100%' height={height} options={options} series={series} />
      ) : (
        <Box sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>No data</Box>
      )}
    </Box>
  )
}

export default DonutChart

