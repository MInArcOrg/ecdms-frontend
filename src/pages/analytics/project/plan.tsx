import { Grid } from '@mui/material';
import ProjectCategoryChart from 'src/views/analytics/Charts/Financial/ProjectCategoryChart';
import ProjectAnalyticsLayout from 'src/views/analytics/layouts/ProjectAnalyticsLayout';

function plan() {
  const Months = [
    {
      name: 'Sep'
    },
    {
      name: 'Oct'
    },
    {
      name: 'Nov'
    },
    {
      name: 'Dec'
    },
    {
      name: 'Jan'
    },
    {
      name: 'Feb'
    },
    {
      name: 'Mar'
    },
    {
      name: 'Apr'
    },
    {
      name: 'May'
    },
    {
      name: 'Jun'
    },
    {
      name: 'Jul'
    },
    {
      name: 'Aug'
    }
  ];

  const series = [
    {
      name: 'Registered',
      data: [90, 120, 55, 50, 40, 60, 30, 40, 20, 30, 40, 20]
    },
    {
      name: 'Checked',
      data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30]
    },
    {
      name: 'Approved',
      data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30]
    },
    {
      name: 'Authorized',
      data: [85, 100, 30, 40, 20, 30, 40, 20, 30, 40, 20, 30]
    }
  ];

  return (
    <ProjectAnalyticsLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ProjectCategoryChart labels={Months} series={series} title="Project Plan Analytics" height={400} />
        </Grid>
      </Grid>
    </ProjectAnalyticsLayout>
  );
}

export default plan;
