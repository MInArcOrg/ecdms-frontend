// ** React Imports
import { useMemo } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// ** Custom Components
import OptionsMenu from 'src/@core/components/option-menu';
import ReactApexcharts from 'src/@core/components/react-apexcharts';

// ** Utils & Hooks
import { useQuery } from '@tanstack/react-query';
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba';
import projectGeneralAnalyticsService from 'src/services/analytics/project/general';
import { MasterSubCategory } from 'src/types/master/master-types';

interface Props {
  selectedSubCategory: MasterSubCategory;
  model: string;
}

const ModelRegionalSubCategoryDistribution = ({ selectedSubCategory, model }: Props) => {
  const theme = useTheme();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['SubcategoryMappingDepartment', model, selectedSubCategory?.id],
    queryFn: () =>
      projectGeneralAnalyticsService.projectSubcategoryMappingDepartment(model, selectedSubCategory?.id, {}),
    enabled: !!selectedSubCategory?.id,
  });

  // Extract labels and series safely
  const labels = data?.payload?.departments ?? [];
  const series = data?.payload?.series ?? [];

  // Dynamically create colors based on number of bars
  const colors = useMemo(
    () => labels.map((_: string, index: number) => hexToRGBA(theme.palette.primary.main, 0.16 + (index * 0.05))),
    [labels, theme.palette.primary.main]
  );

  const options = useMemo(
    () => ({
      chart: {
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          distributed: true,
          columnWidth: '35%',
          startingShape: 'rounded',
          dataLabels: { position: 'top' },
        },
      },
      legend: { show: false },
      tooltip: { enabled: true, y: { formatter: (val: number) => `$${val}k` } },
      dataLabels: {
        offsetY: -15,
        formatter: (val: number) => `${val}k`,
        style: {
          fontWeight: 500,
          fontSize: '1rem',
          colors: [theme.palette.text.secondary],
        },
      },
      colors,
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
      grid: {
        show: false,
        padding: { top: 20, left: -5, right: -8, bottom: -12 },
      },
      xaxis: {
        axisTicks: { show: false },
        axisBorder: { color: theme.palette.divider },
        categories: labels,
        labels: {
          style: {
            fontSize: '14px',
            colors: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
          },
        },
      },
      yaxis: {
        labels: {
          offsetX: -15,
          formatter: (val: number) => `${val}`,
          style: {
            fontSize: '14px',
            colors: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
          },
        },
      },
      responsive: [
        {
          breakpoint: theme.breakpoints.values.sm,
          options: {
            plotOptions: { bar: { columnWidth: '60%' } },
            grid: { padding: { right: 20 } },
          },
        },
      ],
    }),
    [labels, colors, theme]
  );

  if (isLoading) {
    return (
      <Card>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }

  if (isError || !labels.length) {
    return (
      <Card>
        <CardContent sx={{ py: 6 }}>
          <Typography variant="body2" align="center" color="text.secondary">
            No data available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title={`Regional Distribution of ${selectedSubCategory.title}`}
        subheader="Yearly Earnings Overview"
        subheaderTypographyProps={{ sx: { mt: '0 !important' } }}
        action={
          <OptionsMenu
            options={['Last Week', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.disabled' } }}
          />
        }
      />
      <CardContent>
        <ReactApexcharts type="bar" height={300} options={options as any} series={series} />
      </CardContent>
    </Card>
  );
};

export default ModelRegionalSubCategoryDistribution;
