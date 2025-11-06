// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts';

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';
import { MasterType } from 'src/types/master/master-types';

const series = [{ data: [32, 52, 72, 94, 116] }];

const GeneralTypeGrowthRate = ({ selectedType }: { selectedType: MasterType }) => {
  // ** Hook
  const theme = useTheme();

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '42%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    colors: [
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 1),
      hexToRGBA(theme.palette.success.main, 0.16),
      hexToRGBA(theme.palette.success.main, 0.16)
    ],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    grid: {
      show: false,
      padding: {
        top: -4,
        left: -7,
        right: -5,
        bottom: -12
      }
    },
    xaxis: {
      categories: ['2019', '2020', '2021', '2022', '2023'],
      axisTicks: { show: false },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '14px',
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: { show: false }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box sx={{ gap: 2, display: '', alignItems: 'stretch', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ mb: 1.5 }}>
            {selectedType?.title} growth rate
          </Typography>
          <ReactApexcharts type="bar" width={'100%'} height={178} series={series} options={options as any} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default GeneralTypeGrowthRate;
