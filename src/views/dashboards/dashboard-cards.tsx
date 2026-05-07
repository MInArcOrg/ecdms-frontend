import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import ReactApexcharts from 'src/@core/components/react-apexcharts';
import Icon from 'src/@core/components/icon';
import DonutChart from 'src/views/dashboards/DonutChart';
import { BreakdownType, formatCompactNumber, normalizeBreakdown, safeNumber } from './dashboard-utils';

export const KpiCard = ({
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

export const ModuleBreakdownCard = ({
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
  const top3 = useMemo(() => normalizeBreakdown(types).slice(0, 3), [types]);
  const colors = ['primary.main', 'secondary.main', 'success.main'];

  return (
    <Card>
      <CardHeader title={<Typography sx={{ fontWeight: 800 }}>{title}</Typography>} subheader={subtitle} />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Skeleton width="70%" />
                <Skeleton width="60%" />
                <Skeleton width="55%" />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {top3.map((item, idx) => (
                  <Box key={`${item.key}-${idx}`} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
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
                        {item.label}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} lg={6}>
            {loading ? (
              <Skeleton variant="rounded" height={180} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 240 }}>
                <DonutChart data={breakdown} height={180} showLegend={false} centerLabel="TOTAL" centerValue={safeNumber(total)} />
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const SplitBreakdownChartCard = ({
  title,
  total,
  items,
  details,
  fetchDetails,
  loading,
  theme,
  departmentId,
  departments,
  onDepartmentChange
}: {
  title: string;
  total: number;
  items: { key: string; label: string; value: number }[];
  details?: Record<string, { label: string; value: number }[]>;
  fetchDetails?: (key: string) => Promise<{ label: string; value: number }[]>;
  loading: boolean;
  theme: any;
  departmentId?: string;
  departments?: { id: string; name: string }[];
  onDepartmentChange?: (departmentId: string) => void;
}) => {
  const topList = items.slice(0, 4);
  const firstKey = items[0]?.key || '';
  const [selectedKey, setSelectedKey] = useState<string>(firstKey);

  useEffect(() => {
    if (!items.some((x) => x.key === selectedKey)) {
      setSelectedKey(firstKey);
    }
  }, [firstKey, items, selectedKey]);

  const selectedLabel = items.find((x) => x.key === selectedKey)?.label || topList[0]?.label || 'Overview';
  const { data: fetchedDetails, isLoading: isDetailsLoading } = useQuery({
    queryKey: ['dashboard-split-breakdown-details', title, departmentId || 'ALL', selectedKey],
    queryFn: () => fetchDetails?.(selectedKey) as Promise<{ label: string; value: number }[]>,
    enabled: Boolean(fetchDetails && selectedKey)
  });

  const selectedSeries = details?.[selectedKey] || fetchedDetails || [];
  const selectedItem = items.find((x) => x.key === selectedKey);
  const chartItems = selectedSeries.length
    ? selectedSeries.map((x) => ({ label: x.label, value: x.value }))
    : (selectedItem ? [selectedItem, ...items.filter((x) => x.key !== selectedKey)] : items)
        .slice(0, 6)
        .map((x) => ({ label: x.label, value: x.value }));
  const computedTotal = total > 0 ? total : items.reduce((sum, item) => sum + safeNumber(item.value), 0);

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
      dataLabels: { enabled: false },
      colors: [theme.palette.primary.main],
      grid: { borderColor: theme.palette.divider, padding: { left: 8, right: 8 } },
      xaxis: {
        categories: chartItems.map((x) => x.label),
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
    [chartItems, theme.palette]
  );

  return (
    <Card>
      <CardHeader
        title={<Typography sx={{ fontWeight: 800 }}>{title}</Typography>}
        subheader={loading ? '' : formatCompactNumber(computedTotal)}
        action={
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <Select
              value={departmentId || 'ALL'}
              onChange={(e) => onDepartmentChange?.(String(e.target.value))}
              disabled={!onDepartmentChange}
            >
              <MenuItem value="ALL">ALL</MenuItem>
              {(departments || []).map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3 }}>
              Categories
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Skeleton width="80%" />
                <Skeleton width="75%" />
                <Skeleton width="70%" />
                <Skeleton width="65%" />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {topList.map((item) => {
                  const pct = computedTotal > 0 ? Math.round((item.value / computedTotal) * 100) : 0;
                  const isSelected = item.key === selectedKey;
                  return (
                    <Box
                      key={item.key}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedKey(item.key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') setSelectedKey(item.key);
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        cursor: 'pointer',
                        borderRadius: 2,
                        p: 2,
                        bgcolor: isSelected ? 'action.hover' : 'transparent'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {formatCompactNumber(item.value)} - {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 900 }}>
                          {pct}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={pct}
                        sx={{
                          height: 8,
                          borderRadius: 10,
                          bgcolor: 'action.hover',
                          '& .MuiLinearProgress-bar': { borderRadius: 10 }
                        }}
                      />
                    </Box>
                  );
                })}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 3 }}>
              {selectedLabel}
            </Typography>
            {loading ? (
              <Skeleton variant="rounded" height={260} />
            ) : isDetailsLoading ? (
              <Skeleton variant="rounded" height={260} />
            ) : (
              <ReactApexcharts type="bar" height={260} options={chartOptions} series={[{ name: title, data: chartItems.map((x) => x.value) }]} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export const MachineryBarChartCard = ({
  title,
  total,
  items,
  loading,
  theme
}: {
  title: string;
  total: number;
  items: { key: string; label: string; value: number }[];
  loading: boolean;
  theme: any;
}) => {
  const machineryKeys = useMemo(
    () => [
      { key: 'compactor', label: 'COMPACTOR' },
      { key: 'roller', label: 'ROLLER' },
      { key: 'asphalt_paver', label: 'ASPHALT PAVER' },
      { key: 'asphalt_mixer', label: 'ASPHALT MIXER' },
      { key: 'con_batch_plant', label: 'CON/BATCH PLANT' },
      { key: 'concrete_mixer', label: 'CONCRETE MIXER' },
      { key: 'crane', label: 'CRANE' },
      { key: 'dozer', label: 'DOZER' },
      { key: 'excavator', label: 'EXCAVATOR' },
      { key: 'loader', label: 'LOADER' }
    ],
    []
  );

  const byKey = useMemo(() => {
    return items.reduce((acc, item) => {
      acc[item.key] = safeNumber(item.value);
      return acc;
    }, {} as Record<string, number>);
  }, [items]);

  const values = useMemo(() => machineryKeys.map((x) => byKey[x.key] ?? 0), [byKey, machineryKeys]);
  const computedTotal = total > 0 ? total : values.reduce((sum, v) => sum + safeNumber(v), 0);

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: { type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
      dataLabels: { enabled: false },
      colors: [theme.palette.primary.main],
      grid: { borderColor: theme.palette.divider, padding: { left: 8, right: 8 } },
      xaxis: {
        categories: machineryKeys.map((x) => x.label),
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
    [machineryKeys, theme.palette]
  );

  return (
    <Card>
      <CardHeader
        title={<Typography sx={{ fontWeight: 800 }}>{title}</Typography>}
        subheader={loading ? '' : formatCompactNumber(computedTotal)}
        action={
          <FormControl size="small" sx={{ minWidth: 110 }}>
            <Select value="ALL" disabled>
              <MenuItem value="ALL">ALL</MenuItem>
            </Select>
          </FormControl>
        }
      />
      <CardContent sx={{ pt: 2 }}>
        {loading ? (
          <Skeleton variant="rounded" height={260} />
        ) : (
          <ReactApexcharts type="bar" height={260} options={chartOptions} series={[{ name: title, data: values }]} />
        )}
      </CardContent>
    </Card>
  );
};
