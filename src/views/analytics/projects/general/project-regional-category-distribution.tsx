// ** React Imports
import { forwardRef, useMemo, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CircularProgress from '@mui/material/CircularProgress'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Hooks & Services
import { useQuery } from '@tanstack/react-query'
import projectGeneralAnalyticsService from 'src/services/analytics/project/general'

// ** Types
import { MasterType } from 'src/types/master/master-types'

// ** Icons
import Icon from 'src/@core/components/icon'

const columnColors = ['#fdd835', '#009933', '#826bf8', '#0099ff', '#ffa1a1']

const ProjectRegionalCategoryDistribution = ({ selectedType }: { selectedType: MasterType }) => {
  const theme = useTheme()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['projectCategoryMappingDepartment', selectedType?.id],
    queryFn: () =>
      projectGeneralAnalyticsService.projectCategoryMappingDepartment(selectedType?.id, {}),
    enabled: !!selectedType?.id,
  })

  const categories = data?.payload?.departments
  const series = data?.payload?.series ?? []

  // ========================
  // ✅ States
  // ========================
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  // ========================
  // ✅ Date Picker Input
  // ========================
  const CustomInput = forwardRef<HTMLInputElement, any>(({ start, end, ...props }, ref) => {
    const startText = start ? format(start, 'MM/dd/yyyy') : ''
    const endText = end ? ` - ${format(end, 'MM/dd/yyyy')}` : ''
    return (
      <TextField
        {...props}
        size="small"
        value={`${startText}${endText}`}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="tabler:calendar-event" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Icon icon="tabler:chevron-down" />
            </InputAdornment>
          ),
        }}
      />
    )
  })
  CustomInput.displayName = 'CustomInput'

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  // ========================
  // ✅ Chart Options
  // ========================
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: { show: false },
        parentHeightOffset: 0,
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '25%',
        },
      },
      colors: columnColors,
      dataLabels: { enabled: false },
      stroke: { show: true, colors: ['transparent'] },
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
        horizontalAlign: 'left',
        labels: { colors: theme.palette.text.secondary },
        itemMargin: { vertical: 3, horizontal: 10 },
      },
      fill: { opacity: 0.9 },
      responsive: [
        {
          breakpoint: 600,
          options: { plotOptions: { bar: { columnWidth: '40%' } } },
        },
      ],
    }),
    [categories, theme.palette]
  )

  // ========================
  // ✅ Render
  // ========================
  return (
    <Card>
      <CardHeader
        title={selectedType?.title ?? 'Project Type'}
        subheader="Regional Distribution"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] },
        }}
        action={
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            placeholderText="Filter by date"
            customInput={<CustomInput start={startDate} end={endDate} />}
          />
        }
      />

      <CardContent>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="error">Failed to load data</Typography>
          </Box>
        ) : series.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <Typography color="text.secondary">No data available</Typography>
          </Box>
        ) : (
          <ReactApexcharts type="bar" height={400} options={options} series={series} />
        )}
      </CardContent>
    </Card>
  )
}

export default ProjectRegionalCategoryDistribution
