// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'

// ** MUI Lab Imports
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

// ** Custom Components
import Icon from 'src/@core/components/icon'
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ✅ Direct import from ApexCharts (NOT from your wrapper)
import ReactApexcharts from 'react-apexcharts'

// ** Utils & Hooks
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { useAuth } from 'src/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import departmentApiService from 'src/services/department/department-service'

// ** Dummy Tab Data
const tabData = [
  {
    type: 'orders',
    avatarIcon: 'tabler:shopping-cart',
    series: [{ data: [28, 10, 45, 38, 15, 30, 35, 28, 8] }]
  },
  {
    type: 'sales',
    avatarIcon: 'tabler:chart-bar',
    series: [{ data: [35, 25, 15, 40, 42, 25, 48, 8, 30] }]
  },
  {
    type: 'profit',
    avatarIcon: 'tabler:currency-dollar',
    series: [{ data: [10, 22, 27, 33, 42, 32, 27, 22, 8] }]
  },
  {
    type: 'income',
    avatarIcon: 'tabler:chart-pie-2',
    series: [{ data: [5, 9, 12, 18, 20, 25, 30, 36, 48] }]
  }
]

// ** Tabs Renderer
const renderTabs = (value: string, theme: any) => {
  return tabData.map((item, index) => {
    const RenderAvatar = item.type === value ? CustomAvatar : Avatar

    return (
      <Tab
        key={index}
        value={item.type}
        label={
          <Box
            sx={{
              width: 110,
              height: 94,
              borderWidth: 1,
              display: 'flex',
              alignItems: 'center',
              borderRadius: '10px',
              flexDirection: 'column',
              justifyContent: 'center',
              borderStyle: item.type === value ? 'solid' : 'dashed',
              borderColor: item.type === value ? theme.palette.primary.main : theme.palette.divider
            }}
          >
            <RenderAvatar
              variant='rounded'
              {...(item.type === value && { skin: 'light' })}
              sx={{ mb: 2, width: 34, height: 34, ...(item.type !== value && { backgroundColor: 'action.selected' }) }}
            >
              <Icon icon={item.avatarIcon} />
            </RenderAvatar>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
              {item.type}
            </Typography>
          </Box>
        }
      />
    )
  })
}

// ** Panels Renderer
const renderTabPanels = (value: string, theme: any, options: any, colors: any) => {
  return tabData.map((item, index) => {
    const max = Math.max(...item.series[0].data)
    const seriesIndex = item.series[0].data.indexOf(max)
    const finalColors = colors.map((color: any, i: any) => (seriesIndex === i ? hexToRGBA(theme.palette.primary.main, 1) : color))

    return (
      <TabPanel key={index} value={item.type}>
        <ReactApexcharts type='bar' height={258} options={{ ...options, colors: finalColors }} series={item.series} />
      </TabPanel>
    )
  })
}

// ** Main Component
const ReginalDistributionBarChart = ({ title }: { title: string }) => {
  const { user } = useAuth()
  const [value, setValue] = useState('orders')

  const { data: labels } = useQuery({
    queryKey: ['subdepartments', user?.id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: { parent_department_id: user?.department_id }
      })
  })

  const theme = useTheme()
  const colors = Array(9).fill(hexToRGBA(theme.palette.primary.main, 0.16))

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '35%',
        startingShape: 'rounded',
        dataLabels: { position: 'top' }
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: {
      offsetY: -15,
      formatter: (val: number) => `${val}k`,
      style: {
        fontWeight: 500,
        fontSize: '1rem',
        colors: [theme.palette.text.secondary]
      }
    },
    colors,
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } }
    },
    grid: {
      show: false,
      padding: { top: 20, left: -5, right: -8, bottom: -12 }
    },
    xaxis: {
      axisTicks: { show: false },
      axisBorder: { color: theme.palette.divider },
      categories: labels?.payload?.map((label: any) => label.name) || [],
      labels: {
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        formatter: (val: number) => `$${val}k`,
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: '60%' } },
          grid: { padding: { right: 20 } }
        }
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title={'Regional Distribution of ' + title}
        subheader='Yearly Earnings Overview'
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
        action={
          <OptionsMenu
            options={['Last Week', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent sx={{ '& .MuiTabPanel-root': { p: 0 } }}>
        <TabContext value={value}>
          {/* Uncomment below if you want tab switching */}
          {/* <TabList
            variant='scrollable'
            scrollButtons='auto'
            onChange={handleChange}
            aria-label='earning report tabs'
            sx={{
              border: '0 !important',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTab-root': { p: 0, minWidth: 0, borderRadius: '10px', '&:not(:last-child)': { mr: 4 } }
            }}
          >
            {renderTabs(value, theme)}
          </TabList> */}
          {labels && renderTabPanels(value, theme, options, colors)}
        </TabContext>
      </CardContent>
    </Card>
  )
}

export default ReginalDistributionBarChart
