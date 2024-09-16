import { Card, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import projectApiService from 'src/services/project/project-service';
import LoadingPlaceholder from 'src/views/components/loader';
import projectPerformaneConstant from 'src/views/pages/projects/constants/performance';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectEarnedValueStatisticsCard from 'src/views/pages/projects/detail/todate-status/project-earned-value-statistics-card';
import StatusTable from 'src/views/pages/projects/detail/todate-status/status-table';
import subMenuItems from './(subMenuItems)';
interface Data {
  cpi?: number;
  cv?: number;
  spi?: number;
  sv?: number;
  repaid?: number;
  repaid_percent?: number;
  advance_bond?: number;
  performance_bond?: number;
  bid_bond?: number;
  advance_status?: { status: string; days: number };
  performance_status?: { status: string; days: number };
  bid_status?: { status: string; days: number };
  total_contract_amount?: number;
  paid_ipc?: number;
  financial_percent?: number;
  financial?: number;
  paid_percent?: number;
  paid?: number;
  time_percent?: number;
  time?: number;
}
const ToDateStatus = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  const {
    data: projectTodateAnalysis,
    isLoading,
    error
  } = useQuery({
    queryKey: ['project-general-information', id],
    queryFn: () => projectApiService.getProjectTodateStatus(String(id), {}),
    enabled: !!id
  });

  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  if (error) {
    return (
      <Typography variant="h6" sx={{ textAlign: 'center' }}>
        Error loading project data
      </Typography>
    );
  }

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={1} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <StatusTable
              projectData={projectTodateAnalysis?.payload as Data} // Adjust type based on your data
              performanceConstants={projectPerformaneConstant}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectEarnedValueStatisticsCard data={projectTodateAnalysis?.payload as Data} />
        </Grid>
      </Grid>
    </ProjectLayout>
  );
};

ToDateStatus.acl = {
  subject: 'projectinfo',
  action: 'view_projectinfo'
};

export default ToDateStatus;
