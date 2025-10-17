// ** React Imports
import { forwardRef, useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';

// ** Third Party Imports
import format from 'date-fns/format';
import DatePicker from 'react-datepicker';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { useAuth } from 'src/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import departmentApiService from 'src/services/department/department-service';

const columnColors = ['#fdd835', '#009933', '#826bf8', '#0099ff', '#ffa1a1'];

const GeneralCategoriesBarChart = ({ series }: { series: any[] }) => {
  // ** Hook
  const theme = useTheme();
  const { user } = useAuth();
  const { data: labels } = useQuery({
    queryKey: ['subdepartments', user?.department_id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: {
          parent_department_id: user?.department_id
        }
      })
  });

  // ** States
  const [endDate, setEndDate] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const options = {
    chart: {
      offsetX: -10,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    fill: { opacity: 1 },
    dataLabels: { enabled: false },
    colors: columnColors,
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      labels: { colors: theme.palette.text.secondary },
      markers: {
        offsetY: 1,
        offsetX: -3
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        columnWidth: '15%',
        colors: {
          backgroundBarRadius: 10
        }
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: { show: true }
      }
    },
    yaxis: {
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { color: theme.palette.divider },
      categories: labels?.payload.map((label) => label.name),
      crosshairs: {
        stroke: { color: theme.palette.divider }
      },
      labels: {
        style: { colors: theme.palette.text.disabled }
      }
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%'
            }
          }
        }
      }
    ]
  };

  const CustomInput = forwardRef((props: any, ref) => {
    const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : '';
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null;
    const value = `${startDate}${endDate !== null ? endDate : ''}`;

    return (
      <TextField
        {...props}
        size="small"
        value={value}
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
          )
        }}
      />
    );
  });
  CustomInput.displayName = 'CustomInput';
  const handleOnChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <Card>
      <CardHeader
        title="Regional Distribution"
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePicker
            selectsRange
            endDate={endDate}
            selected={startDate}
            id="apexchart-column"
            startDate={startDate}
            onChange={handleOnChange}
            placeholderText="Click to select a date"
            customInput={<CustomInput start={startDate} end={endDate} />}
          />
        }
      />
      <CardContent>
        {labels && <ReactApexcharts type="bar" height={400} options={options as ApexCharts.ApexOptions} series={series} />}
      </CardContent>
    </Card>
  );
};

export default GeneralCategoriesBarChart;
