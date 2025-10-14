// ** MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'

// ** Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// --- Random color generator ---
const usedColors: string[] = []

function randomColor() {
  let r: number, g: number, b: number
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
  } while (
    (r <= 85 && g <= 85 && b <= 85) || // too dark
    colorDiff < 30 // too close to previous
  )
  const newColor = `rgb(${r}, ${g}, ${b})`
  usedColors.push(newColor)
  return newColor
}

interface ChartViewProps {
  years: { id: number; name: string }[]
  regions: { name: string }[]
  baseYear: number
  inflation?: boolean
}

const ChartView = ({ years, regions, baseYear, inflation }: ChartViewProps) => {
  const theme = useTheme()
  const white = '#fff'
  const success = '#d4e157'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  const [data, setData] = useState<any>({ labels: [], datasets: [] })
  const [colors, setColors] = useState<string[]>([])

  const createData = (values: number[]) =>
    values.map(v =>
      inflation
        ? Number(((v - values[baseYear]) / values[baseYear]) * 100).toFixed(0)
        : Number((v / values[baseYear]) * 100).toFixed(0)
    )

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    scales: {
      x: {
        type: 'category',
        ticks: { color: labelColor },
        grid: { color: borderColor }
      },
      y: {
        type: 'linear',
        min: -150,
        max: 300,
        ticks: { stepSize: 50, color: labelColor },
        grid: { color: borderColor }
      }
    },
    plugins: {
      legend: {
        align: 'start' as const,
        position: 'left' as const,
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
      // generate unique colors
      setColors(state => (state.length > 0 ? state : regions.map(() => randomColor())))

      setData({
        labels: years.map(y => y.name),
        datasets: regions.map((r, idx) => ({
          label: r.name,
          data: createData(years.map(() => Math.floor(Math.random() * 100) + 100)),
          fill: false,
          tension: 0.5,
          hidden: idx !== 0,
          pointRadius: 1,
          pointHoverRadius: 5,
          pointStyle: 'circle',
          borderColor: colors[idx] || randomColor(),
          backgroundColor: colors[idx] || randomColor(),
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: success,
          pointHoverBorderColor: white,
          pointHoverBorderWidth: 5
        }))
      })
    }
  }, [regions, years, baseYear, colors, inflation, success, white])

  return (
    <Card>
      <CardContent>
        {data && <Line data={data} height={350} options={options as any} />}
      </CardContent>
    </Card>
  )
}

export default ChartView
