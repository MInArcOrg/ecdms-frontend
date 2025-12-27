// ** React Imports
import { useMemo, useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Icons
import Icon from 'src/@core/components/icon'

interface RegionalTrendLineChartProps {
  title: string
  subheader?: string
  series?: { name: string; data: number[] }[]
  categories?: string[]
  loading?: boolean
  error?: any
  filterOptions?: { label: string; value: string }[]
  defaultFilter?: string
  onFilterChange?: (value: string) => void
}

const RegionalTrendLineChart = ({
  title,
  subheader = 'Regional Trends',
  series = [],
  categories = [],
  loading = false,
  error = null,
  filterOptions = [],
  defaultFilter = '',
  onFilterChange
}: RegionalTrendLineChartProps) => {
  const theme = useTheme()

  // ========================
  // ✅ States
  // ========================
  const [filterValue, setFilterValue] = useState<string>(defaultFilter)

  useEffect(() => {
    setFilterValue(defaultFilter);
  }, [defaultFilter]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as string
    setFilterValue(newValue)
    if (onFilterChange) {
      onFilterChange(newValue)
    }
  }

  // ========================
  // ✅ Chart Options
  // ========================
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'line',
        toolbar: { show: false },
        parentHeightOffset: 0,
        zoom: { enabled: false }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.success.main, theme.palette.info.main],
      dataLabels: { enabled: false },
      grid: {
        borderColor: theme.palette.divider,
        xaxis: { lines: { show: true } },
      },
      xaxis: {
        categories,
        axisTicks: { color: theme.palette.divider },
        labels: { style: { colors: theme.palette.text.disabled } },
      },
      yaxis: {
        labels: { style: { colors: theme.palette.text.disabled } },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: theme.palette.text.secondary },
        itemMargin: { vertical: 3, horizontal: 10 },
      },
    }),
    [categories, theme.palette]
  )

  // ========================
  // ✅ Render
  // ========================
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        subheader={subheader}
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] },
        }}
        action={
          filterOptions.length > 0 && (
            <FormControl size='small' sx={{ minWidth: 160 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterValue}
                label='Category'
                onChange={handleFilterChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {filterOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )
        }
      />

      <CardContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <Typography>Loading...</Typography>
          </Box>
        ) : error ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <Typography color="error">Failed to load data</Typography>
          </Box>
        ) : series.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={350}>
            <Typography color="text.secondary">No data available</Typography>
          </Box>
        ) : (
          <ReactApexcharts type="line" height={350} options={options} series={series} />
        )}
      </CardContent>
    </Card>
  )
}

export default RegionalTrendLineChart
