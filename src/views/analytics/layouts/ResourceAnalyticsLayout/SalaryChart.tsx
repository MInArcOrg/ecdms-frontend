// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** React & Chart.js Imports
import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// ✅ Register everything required by the line chart
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler)

const usedColors: string[] = []

function randomColor() {
  let r: any, g: any, b: any
  let colorDiff = Infinity
  do {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
    colorDiff = usedColors.reduce((minDiff, usedColor) => {
      const [ur, ug, ub] = usedColor.slice(4, -1).split(', ').map(Number)
      const dr = Math.abs(r - ur)
      const dg = Math.abs(g - ug)
      const db = Math.abs(b - ub)
      const diff = Math.sqrt((2 + dr / 256) * dr ** 2 + 4 * dg ** 2 + (3 + db / 256) * db ** 2)
      return Math.min(minDiff, diff)
    }, Infinity)
  } while ((r <= 85 && g <= 85 && b <= 85) || colorDiff < 30)

  const newColor = `rgb(${r}, ${g}, ${b})`
  usedColors.push(newColor)
  return newColor
}

const SalaryChart = ({ years, regions, baseYear, inflation }: any) => {
  const [data, setData] = useState<any>({ labels: [], datasets: [] })
  const [colors, setColors] = useState<string[]>([])
  const theme = useTheme()

  const white = '#fff'
  const success = '#d4e157'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  const legends = [
    'Total Public Sector',
    'Male Public Sector',
    'Female Public Sector',
    'Total Average',
    'Total Private Sector',
    'Male Private Sector',
    'Female Private Sector'
  ]

  function createData(values: number[]) {
    return values.map(v => Number(v.toFixed(0)))
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: { color: borderColor }
      },
      y: {
        min: 0,
        max: 300,
        ticks: { stepSize: 50, color: labelColor },
        grid: { color: borderColor }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'left',
        labels: {
          padding: 20,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  useEffect(() => {
    if (regions?.length > 0) {
      setColors(prev => (prev.length > 0 ? prev : legends.map(() => randomColor())))
      setData({
        labels: regions.map((r: any) => r.name),
        datasets: legends.map((legend, index) => ({
          label: legend,
          fill: false,
          tension: 0.4,
          pointRadius: 2,
          hidden: index > 3,
          borderColor: colors[index],
          backgroundColor: colors[index],
          pointHoverBorderWidth: 4,
          pointHoverBorderColor: white,
          pointHoverBackgroundColor: success,
          data: createData(regions.map(() => Math.floor(Math.random() * 100) + 100))
        }))
      })
    }
  }, [regions, colors])

  return (
    <Card>
      <CardContent>{data?.datasets?.length > 0 && <Line data={data} height={350} options={options as any} />}</CardContent>
    </Card>
  )
}

export default SalaryChart
