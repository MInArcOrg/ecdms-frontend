// ** MUI Import
import Grid from '@mui/material/Grid';

// ** Demo Component Imports
import DashboardUserStatus from 'src/views/dashboards/DashboardUserStatus';

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

const EcommerceDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <DashboardUserStatus />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default EcommerceDashboard;
