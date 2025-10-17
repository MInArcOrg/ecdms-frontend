// ** MUI Imports
import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts';

interface ProjectEarnedValueStatisticsCardProps {
  data: {
    total_contract_amount?: number;
    paid_ipc?: number;
    financial_percent?: number;
    financial?: number;
    paid_percent?: number;
    paid?: number;
    time_percent?: number;
    time?: number;
  };
}

const ProjectEarnedValueStatisticsCard: React.FC<ProjectEarnedValueStatisticsCardProps> = ({ data }) => {
  // const remaingIpc = data?.total_contract_amount! - data?.paid_ipc!;
  // ** Hook
  const theme = useTheme();

  // const series = [data?.financial_percent ? data?.financial_percent : 0];

  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: '40%'
        },
        dataLabels: {
          show: false
        }
      }
    },
    colors: [theme.palette.primary.main],
    labels: ['']
  };

  const { t } = useTranslation();

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" pb={2} pt={5}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5, ml: 1, pl: 2, pt: 2 }} fontWeight="bold">
              {t('Earned Value')}
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2} fontSize={20}>
              {data?.financial_percent ? data?.financial_percent.toFixed(2) : ''}%
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2}>
              {data?.financial ? data?.financial : 0}
            </Typography>
          </Box>
          <ReactApexcharts
            type="radialBar"
            options={options}
            series={[data?.financial_percent ? data?.financial_percent : 0]}
            height={130}
            width={100}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" pb={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5, ml: 1, pl: 2, pt: 2 }} fontWeight="bold">
              {t('Paid IPC')}
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2} fontSize={20}>
              {data?.paid_percent ? data?.paid_percent?.toFixed(2) : ''}%
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2}>
              {data?.paid ? data?.paid : 0}
            </Typography>
          </Box>
          <ReactApexcharts
            type="radialBar"
            options={options}
            series={[data?.paid_percent ? data?.paid_percent : 0]}
            height={130}
            width={100}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" pb={5}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5, ml: 1, pl: 2, pt: 2 }} fontWeight="bold">
              {t('Elapsed Time')}
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2} fontSize={20}>
              {data?.time_percent ? data?.time_percent?.toFixed(2) : ''} %
            </Typography>
            <Typography variant="subtitle2" ml={1} pl={2}>
              {/* {data?.time ? data?.time : 0} */}
            </Typography>
          </Box>
          <ReactApexcharts
            type="radialBar"
            options={options}
            series={[data?.time_percent ? data?.time_percent : 0]}
            height={130}
            width={100}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectEarnedValueStatisticsCard;
