// ** MUI Imports
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { MasterType } from 'src/types/master/master-types';

const donutColors = ['#fdd835', '#009933', '#826bf8', '#0099ff', '#ffa1a1'];

const ApexPolarChart = ({ selectedType, labels }: { selectedType: MasterType; labels: string[] }) => {
  // ** Hook
  const theme = useTheme();

  const options = {
    chart: {
      type: 'polarArea'
    },
    stroke: { width: 0 },

    labels: labels,
    colors: donutColors,
    dataLabels: {
      enabled: true,
      formatter: (val: any) => `${parseInt(val, 10)}%`
    },
    legend: {
      position: 'bottom',
      markers: { offsetX: -3 },
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: theme.palette.text.secondary,
              formatter: (val: any) => `${parseInt(val, 10)}`
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  };

  return (
    <Card>
      <CardHeader
        title={selectedType?.title}
        subheader="on various categories"
        subheaderTypographyProps={{ sx: { color: (theme) => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type="polarArea" height={400} options={options as any} series={[14, 23, 21, 17, 15]} />
      </CardContent>
    </Card>
  );
};

export default ApexPolarChart;
