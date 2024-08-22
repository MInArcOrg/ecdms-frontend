import { Box, Card } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import projectReportApiService from 'src/services/project/project-report-service';
import LoadingPlaceholder from 'src/views/components/loader';
import ReportSummaryViewCard from './report-sumary-card';

interface ReportSummaryProps {
  projectId: string;
}
function ReportSummary({ projectId }: ReportSummaryProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['report-summary', projectId],
    queryFn: () => projectReportApiService.getReportSummary(projectId, {})
  });

  const percentOf = (actual: number, planned: number) => {
    return (actual / planned) * 100;
  };

  const sumData = {
    financial: {
      actual: data?.Report?.totalFinancialPerformance,
      planned: data?.Plan?.totalFinancialPerformance,
      percent: percentOf(data?.Report?.totalFinancialPerformance, data?.Plan?.totalFinancialPerformance).toFixed(2)
    },
    physical: {
      actual: data?.Report?.totalPhysicalPerformance,
      planned: data?.Plan?.totalPhysicalPerformance,
      percent: percentOf(data?.Report?.totalPhysicalPerformance, data?.Plan?.totalPhysicalPerformance).toFixed(2)
    },
    expense: {
      actual: data?.Report?.totalProjectExpense,
      planned: data?.Plan?.totalProjectExpense,
      percent: percentOf(data?.Report?.totalProjectExpense, data?.Plan?.totalProjectExpense).toFixed(2)
    },
    loss: {
      actual: data?.Report?.totalProfitOrLoss,
      planned: data?.Plan?.totalProfitOrLoss,
      percent: percentOf(data?.Report?.totalProfitOrLoss, data?.Plan?.totalProfitOrLoss).toFixed(2)
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      {isLoading && <LoadingPlaceholder />}
      <Card>{!isLoading && data && <ReportSummaryViewCard data={sumData} detailData={data?.Report} />}</Card>
    </Box>
  );
}

export default ReportSummary;
