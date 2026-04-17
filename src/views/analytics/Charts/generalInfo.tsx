// ** MUI Imports
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts';

const GeneralInfoApexChart = ({ labels, series, title, subtitle, total }: any) => {
  // ** Hook
  const theme = useTheme();

  const options = {
    stroke: { width: 0 },
    labels: labels,
    dataLabels: {
      enabled: true
      // formatter: val => `${parseInt(val, 10)}%`
    },
    legend: {
      show: false
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
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Total Count',
              formatter: () => '31%',
              color: theme.palette.text.primary
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
        title={title}
        subheader={subtitle}
        subheaderTypographyProps={{ sx: { color: (theme) => `${theme.palette.text.disabled} !important` } }}
      />
      <CardContent>
        <ReactApexcharts type="donut" height={400} options={options as any} series={series} />
      </CardContent>
    </Card>
  );
};

export default GeneralInfoApexChart;
