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
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

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
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart')

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

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: 'chart' | 'table' | null) => {
    if (newView !== null) {
      setViewMode(newView)
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {filterOptions.length > 0 && (
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
            )}
            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={handleViewChange}
              aria-label="view mode"
              size="small"
            >
              <ToggleButton value="chart" aria-label="chart view">
                <Icon icon="tabler:chart-line" />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <Icon icon="tabler:table" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
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
        ) : viewMode === 'chart' ? (
          <ReactApexcharts type="line" height={350} options={options} series={series} />
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 350, boxShadow: 'none', border: theme => `1px solid ${theme.palette.divider}` }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: 'background.paper' }}>Region</TableCell>
                  {series.map(s => (
                    <TableCell key={s.name} sx={{ backgroundColor: 'background.paper' }}>{s.name}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={index} hover>
                    <TableCell>{category}</TableCell>
                    {series.map(s => (
                      <TableCell key={s.name}>{s.data[index]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default RegionalTrendLineChart
