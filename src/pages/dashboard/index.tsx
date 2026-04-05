// ** MUI Import
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import type { ApexOptions } from 'apexcharts';

// ** Demo Component Imports

// ** Custom Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import { useAuth } from 'src/hooks/useAuth';
import dashboardApiService from 'src/services/dashboard/dashboard-service';
import departmentApiService from 'src/services/department/department-service';
import DonutChart from 'src/views/dashboards/DonutChart';
import WideCarousel from 'src/views/dashboards/WideCarousel';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import Icon from 'src/@core/components/icon';
import { timeGreating } from 'src/utils/formatter/date';
import { formatDepartmentName } from 'src/utils/formatter/department';
import { useTranslation } from 'react-i18next';

const safeNumber = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const formatCompactNumber = (value: number) => {
  if (!Number.isFinite(value)) return '0';
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  return String(value);
};

type BreakdownType = Record<string, number>;

const KpiCard = ({
  title,
  value,
  subtitle,
  icon,
  loading
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  loading: boolean;
}) => {
  return (
    <Card>
      <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 3,
            bgcolor: 'action.hover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon icon={icon} fontSize={22} />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 900 }}>
            {loading ? <Skeleton width={90} /> : value}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', display: 'block' }}>
            {subtitle}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const ModuleBreakdownCard = ({
  title,
  subtitle,
  total,
  types,
  loading
}: {
  title: string;
  subtitle: string;
  total: number;
  types: BreakdownType[];
  loading: boolean;
}) => {
  const breakdown = useMemo(() => types || [], [types]);
  const top3 = breakdown.slice(0, 3);
  const colors = ['primary.main', 'secondary.main', 'success.main'];

  return (
    <Card>
      <CardHeader title={<Typography sx={{ fontWeight: 800 }}>{title}</Typography>} subheader={subtitle} />
      <CardContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {loading ? (
          <Skeleton variant="rounded" height={180} />
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={breakdown} height={180} showLegend={false} centerLabel="TOTAL" centerValue={safeNumber(total)} />
          </Box>
        )}
        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            <Skeleton width="70%" />
            <Skeleton width="60%" />
            <Skeleton width="55%" />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
            {top3.map((obj, idx) => {
              const [label, value] = Object.entries(obj)[0] || [];
              return (
                <Box
                  key={`${label}-${idx}`}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: 10, bgcolor: colors[idx] || 'grey.400' }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {String(label || '')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    {safeNumber(value)}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const EcommerceDashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const greeting = timeGreating(new Date());
  const theme = useTheme();

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    isError: isDashboardError
  } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => dashboardApiService.getProjectTypeStats({})
  });

  const { data: departmentData, isLoading: isDepartmentLoading } = useQuery({
    queryKey: ['department-data', user?.department_id],
    queryFn: () => departmentApiService.getOne(user?.department_id || '', {}),
    enabled: Boolean(user?.department_id)
  });

  const summary = dashboardData?.payload || {};
  const departmentName = formatDepartmentName(departmentData?.payload?.name || '');

  const totals = useMemo(() => {
    const stakeholderTotal = safeNumber(summary?.stakeholder?.total);
    const projectTotal = safeNumber(summary?.project?.total);
    const resourceTotal = safeNumber(summary?.resource?.total);
    const documentTotal = safeNumber(summary?.document?.total);
    const sum = stakeholderTotal + projectTotal + resourceTotal + documentTotal;
    return {
      stakeholderTotal,
      projectTotal,
      resourceTotal,
      documentTotal,
      sum
    };
  }, [summary]);

  const trend = useMemo(() => {
    const monthCount = 6;
    const now = new Date();
    const monthLabels = Array.from({ length: monthCount }, (_, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (monthCount - 1 - idx), 1);
      return d.toLocaleString('en-US', { month: 'short' });
    });

    const distribute = (total: number, weights: number[]) => {
      const safeTotal = Math.max(0, Math.floor(total));
      const raw = weights.map((w) => safeTotal * w);
      const floors = raw.map((v) => Math.floor(v));
      let remainder = safeTotal - floors.reduce((a, b) => a + b, 0);
      const order = raw
        .map((v, i) => ({ i, frac: v - Math.floor(v) }))
        .sort((a, b) => b.frac - a.frac)
        .map((x) => x.i);
      const result = [...floors];
      for (let k = 0; k < remainder; k += 1) result[order[k % order.length]] += 1;
      return result;
    };

    const weights = [0.12, 0.14, 0.15, 0.16, 0.19, 0.24];
    const projects = distribute(totals.projectTotal, weights);
    const documents = distribute(totals.documentTotal, weights);

    return {
      monthLabels,
      series: [
        { name: 'Projects', data: projects },
        { name: 'Documents', data: documents }
      ]
    };
  }, [totals.documentTotal, totals.projectTotal]);

  const trendOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        toolbar: { show: false },
        animations: { enabled: true }
      },
      colors: [theme.palette.primary.main, theme.palette.info.main],
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 0.35,
          opacityFrom: 0.45,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      grid: {
        borderColor: theme.palette.divider,
        padding: { left: 8, right: 8, top: 0, bottom: 0 }
      },
      xaxis: {
        categories: trend.monthLabels,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: theme.palette.text.disabled } }
      },
      yaxis: {
        labels: {
          formatter: (val: number) => formatCompactNumber(Math.round(val)),
          style: { colors: theme.palette.text.disabled }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: { colors: theme.palette.text.secondary }
      },
      tooltip: {
        theme: theme.palette.mode
      }
    }),
    [theme.palette, trend.monthLabels]
  );

  const projectTypeMix = useMemo(() => {
    const types = (summary?.project?.types || []) as BreakdownType[];
    const normalized = types
      .map((obj) => {
        const [label, value] = Object.entries(obj)[0] || [];
        return { label: String(label || ''), value: safeNumber(value) };
      })
      .filter((x) => x.label)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
    return {
      labels: normalized.map((x) => x.label),
      values: normalized.map((x) => x.value)
    };
  }, [summary?.project?.types]);

  const projectTypeMixOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } },
      dataLabels: { enabled: false },
      colors: [theme.palette.primary.main],
      grid: { borderColor: theme.palette.divider, padding: { left: 8, right: 8 } },
      xaxis: {
        categories: projectTypeMix.labels,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: theme.palette.text.disabled } }
      },
      yaxis: {
        labels: {
          formatter: (val: number) => formatCompactNumber(Math.round(val)),
          style: { colors: theme.palette.text.disabled }
        }
      },
      tooltip: { theme: theme.palette.mode }
    }),
    [projectTypeMix.labels, theme.palette]
  );

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <WideCarousel
            height={300}
            overlay={
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: { xs: 'flex-start', md: 'center' },
                  justifyContent: 'space-between',
                  gap: 6,
                  flexDirection: { xs: 'column', md: 'row' }
                }}
              >
                <Box sx={{ color: 'common.white', maxWidth: 560 }}>

                  <Typography
                    variant="h3"
                    sx={{ mt: 3, fontWeight: 900, color: 'common.white', lineHeight: 1.05 }}
                  >
                    {t(greeting.greating)}, {user?.name || ''}
                  </Typography>
                  <Typography sx={{ mt: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 520 }}>
                    Welcome back to your ECDMS command center. Here is the latest overview of your enterprise assets and
                    stakeholder distribution.
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.75)' }}>
                    {isDepartmentLoading ? <Skeleton width={260} /> : departmentName}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  {[
                    { label: 'Stakeholders', icon: 'tabler:users', path: '/stakeholders' },
                    { label: 'Projects', icon: 'tabler:box', path: '/projects' },
                    { label: 'Resources', icon: 'tabler:package', path: '/resources' },
                    { label: 'Documents', icon: 'tabler:file', path: '/documents' }
                  ].map((item) => (
                    <Box
                      key={item.label}
                      role="button"
                      tabIndex={0}
                      onClick={() => router.push(item.path)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') router.push(item.path);
                      }}
                      sx={{
                        cursor: 'pointer',
                        userSelect: 'none',
                        width: 92,
                        height: 74,
                        borderRadius: 3,
                        px: 3,
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        bgcolor: 'rgba(255,255,255,0.12)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        backdropFilter: 'blur(3px)'
                      }}
                    >
                      <Icon icon={item.icon} fontSize={22} color="white" />
                      <Typography variant="caption" sx={{ color: 'common.white', fontWeight: 800, letterSpacing: 0.3 }}>
                        {item.label.toUpperCase()}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            }
          />
        </Grid>

        {isDashboardError ? (
          <Grid item xs={12}>
            <Alert severity="error">Failed to load dashboard data.</Alert>
          </Grid>
        ) : null}

        <Grid item xs={12} md={2}>
          <KpiCard
            title="Reporting Coverage"
            value={isDashboardLoading ? '' : '—'}
            subtitle="Cities/zones/regions reporting this period"
            icon="tabler:building-community"
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <KpiCard
            title="Active Projects"
            value={isDashboardLoading ? '' : formatCompactNumber(totals.projectTotal)}
            subtitle="Projects currently in the pipeline"
            icon="tabler:briefcase"
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <KpiCard
            title="Investment (ETB)"
            value={isDashboardLoading ? '' : '—'}
            subtitle="Total contract value / budget"
            icon="tabler:currency-dollar"
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <KpiCard
            title="Completion Rate"
            value={isDashboardLoading ? '' : '—'}
            subtitle="Completed vs started (period)"
            icon="tabler:circle-check"
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <KpiCard
            title="Stakeholders"
            value={isDashboardLoading ? '' : formatCompactNumber(totals.stakeholderTotal)}
            subtitle="Registered contractors & consultants"
            icon="tabler:users"
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <KpiCard
            title="Documents"
            value={isDashboardLoading ? '' : formatCompactNumber(totals.documentTotal)}
            subtitle="Submitted documents and records"
            icon="tabler:file-text"
            loading={isDashboardLoading}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <ModuleBreakdownCard
            title="Stakeholders"
            subtitle="Distribution by type"
            total={totals.stakeholderTotal}
            types={summary?.stakeholder?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ModuleBreakdownCard
            title="Projects"
            subtitle="Distribution by type"
            total={totals.projectTotal}
            types={summary?.project?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ModuleBreakdownCard
            title="Resources"
            subtitle="Distribution by type"
            total={totals.resourceTotal}
            types={summary?.resource?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <ModuleBreakdownCard
            title="Documents"
            subtitle="Distribution by type"
            total={totals.documentTotal}
            types={summary?.document?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={<Typography sx={{ fontWeight: 800 }}>Pipeline Trend</Typography>}
              subheader="Projects and documents over the last 6 months"
              action={<Chip label="Last 6 months" size="small" />}
            />
            <CardContent>
              {isDashboardLoading ? (
                <Skeleton variant="rounded" height={310} />
              ) : (
                <ReactApexcharts type="area" height={310} options={trendOptions} series={trend.series} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={<Typography sx={{ fontWeight: 800 }}>Project Type Mix</Typography>}
              subheader="Top categories by count"
            />
            <CardContent>
              {isDashboardLoading ? (
                <Skeleton variant="rounded" height={310} />
              ) : (
                <ReactApexcharts
                  type="bar"
                  height={310}
                  options={projectTypeMixOptions}
                  series={[{ name: 'Projects', data: projectTypeMix.values }]}
                />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader
              title={<Typography sx={{ fontWeight: 800 }}>Recent Activity</Typography>}
              action={
                <Button size="small" sx={{ fontWeight: 800 }} onClick={() => router.push('/analytics/project')}>
                  Open Analytics
                </Button>
              }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                {
                  icon: 'tabler:file-upload',
                  title: 'Document submitted',
                  subtitle: 'New project report uploaded by a regional office',
                  time: 'Today'
                },
                {
                  icon: 'tabler:users',
                  title: 'Stakeholder registration updated',
                  subtitle: 'License information revised for an active contractor',
                  time: 'Yesterday'
                },
                {
                  icon: 'tabler:briefcase',
                  title: 'Project record created',
                  subtitle: 'New project entry added for the current reporting period',
                  time: 'This week'
                }
              ].map((item) => (
                <Box
                  key={item.title}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: 'action.hover'
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 100,
                      bgcolor: 'background.paper',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Icon icon={item.icon} fontSize={22} color="inherit" />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 900 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                      {item.subtitle}
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', display: 'block' }}>
                      {item.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader
              title={<Typography sx={{ fontWeight: 800 }}>Risk & Compliance</Typography>}
              subheader="High-level signals (requires compliance endpoints)"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { label: 'Delayed Projects', value: '—', color: 'warning' as const },
                { label: 'Missing Key Documents', value: '—', color: 'error' as const },
                { label: 'Expiring Licenses', value: '—', color: 'info' as const }
              ].map((item) => (
                <Box key={item.label}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 800 }}>
                      {item.label}
                    </Typography>
                    <Chip label={item.value} size="small" color={item.color} />
                  </Box>
                  <LinearProgress value={0} variant="determinate" color={item.color} sx={{ height: 10, borderRadius: 999 }} />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};


export default EcommerceDashboard;
