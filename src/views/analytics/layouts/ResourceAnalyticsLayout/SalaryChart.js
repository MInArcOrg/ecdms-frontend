// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'

const usedColors = []
function randomColor() {
  let r, g, b
  let colorDiff = Infinity
  do {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
    colorDiff = usedColors.reduce((minDiff, usedColor) => {
      const [ur, ug, ub] = usedColor.slice(4, -1).split(', ')
      const dr = Math.abs(r - ur)
      const dg = Math.abs(g - ug)
      const db = Math.abs(b - ub)
      const diff = Math.sqrt((2 + dr / 256) * dr ** 2 + 4 * dg ** 2 + (3 + db / 256) * db ** 2)

      return Math.min(minDiff, diff)
    }, Infinity)
  } while (
    (r <= 85 && g <= 85 && b <= 85) || // Check if the color is too close to black/grey
    colorDiff < 30 // Check if the color is too close to a previously generated color
  )
  const newColor = `rgb(${r}, ${g}, ${b})`
  usedColors.push(newColor) // Add the new color to the list of used colors

  return newColor
}

const SalaryChart = props => {
  // ** Props
  const { years, reagions, baseYear, inflation } = props

  const [data, setData] = useState({ labels: [], datasets: [] })
  const [colors, setColors] = useState([])
  const theme = useTheme()

  const white = '#fff'
  const success = '#d4e157'
  const primary = theme.palette.primary.main
  const warning = '#ff9800'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  const legends = [
    'Total Public Sector',
    'Male Public Sector',
    'Female Public Sector',
    'Total Avarage',
    'Total Private Sector',
    'Male Private Sector',
    'Female Private Sector'
  ]

  function createData(rest) {
    const arr = rest.map((item, index) => Number((item / 1) * 1).toFixed(0))

    return arr
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          color: borderColor
        }
      },
      y: {
        type: 'linear',
        min: -150,
        max: 300,
        ticks: {
          stepSize: 50,
          color: labelColor
        },
        grid: {
          color: borderColor
        }
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
    if (reagions?.length > 0) {
      setColors(state => (state.length > 0 ? state : reagions.map(() => randomColor())))
      setData({
        labels: reagions.map(r => r.name),
        datasets: legends.map((legend, index) => ({
          fill: false,
          tension: 0.5,
          pointRadius: 1,
          hidden: index > 3,
          label: legend,
          pointHoverRadius: 5,
          pointStyle: 'circle',
          borderColor: colors[index],
          backgroundColor: colors[index],
          pointHoverBorderWidth: 5,
          pointHoverBorderColor: white,
          pointBorderColor: 'transparent',
          pointHoverBackgroundColor: success,
          data: createData(reagions.map(() => Math.floor(Math.random() * 100) + 100))
        }))
      })
    }

    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reagions, colors])

  console.log(colors)
  console.log(
    reagions.map((r, index) => ({
      name: r.name,
      color: colors[index]
    }))
  )

  return (
    <Card>
      <CardContent>{data && <Line data={data} height={350} options={options} />}</CardContent>
    </Card>
  )
}

export default SalaryChart
