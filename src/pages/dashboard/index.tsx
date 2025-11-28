// ** MUI Import
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';

// ** Demo Component Imports

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import { useAuth } from 'src/hooks/useAuth';
import dashboardApiService from 'src/services/dashboard/dashboard-service';
import departmentApiService from 'src/services/department/department-service';
import HeroProfileCard from 'src/views/dashboards/HeroProfileCard';
import WideCarousel from 'src/views/dashboards/WideCarousel';

const EcommerceDashboard = () => {
  const {user}=useAuth();
  // Static dashboard data provided by user
 const {data: dashboardData} = useQuery({
  queryKey: ['dashboard-data'],
  queryFn: () => dashboardApiService.getProjectTypeStats({}),
 })

const {data:departmentData}=useQuery({
  queryKey: ['department-data'],
  queryFn: () => departmentApiService.getOne(user?.department_id||"",{}),
 })
  const StatsCard = ({ title, total, types }: { title: string; total: number; types: Record<string, number>[] }) => (
    <Card>
      <CardHeader
        title={title}
        subheaderTypographyProps={{ sx: { mt: 1 } }}
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>{total}</Typography>
          </Box>
        }
      />
      <CardContent>
        <List dense sx={{ pt: 0 }}>
          {types.map((obj, idx) => {
            const [label, value] = Object.entries(obj)[0]
            return (
              <ListItem key={`${label}-${idx}`} sx={{ py: 0.75 }}>
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {label.charAt(0).toUpperCase() + label.slice(1)}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>{value}</Typography>
                </Box>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  );

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <HeroProfileCard department={departmentData?.payload} />
        </Grid>
        <Grid item xs={12} md={8}>
          <WideCarousel />
        </Grid>

        <Grid item xs={12} md={3}>
          <StatsCard title="Stakeholders" total={dashboardData?.payload?.stakeholder?.total} types={dashboardData?.payload?.stakeholder?.types||[]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard title="Projects" total={dashboardData?.payload?.project?.total} types={dashboardData?.payload?.project?.types||[]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard title="Resources" total={dashboardData?.payload?.resource?.total} types={dashboardData?.payload?.resource?.types||[]} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatsCard title="Documents" total={dashboardData?.payload?.document?.total} types={dashboardData?.payload?.document?.types||[]} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};


export default EcommerceDashboard;
