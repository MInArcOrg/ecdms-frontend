// ** MUI Import
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import LinearProgress from '@mui/material/LinearProgress';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import { useEffect, useMemo, useState } from 'react';
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

const getTypeCount = (types: BreakdownType[] | undefined, matchers: string[]) => {
  const matcherSet = matchers.map((m) => m.toLowerCase());
  return (types || []).reduce((sum, obj) => {
    const entry = Object.entries(obj)[0];
    if (!entry) return sum;
    const [label, value] = entry;
    const lower = String(label || '').toLowerCase();
    const matched = matcherSet.some((m) => lower.includes(m));
    return matched ? sum + safeNumber(value) : sum;
  }, 0);
};

const humanizeKey = (key: string) => {
  const withSpaces = String(key || '').replace(/_/g, ' ');
  return withSpaces.replace(/\b\w/g, (m) => m.toUpperCase());
};

const normalizeBreakdown = (types: BreakdownType[] | undefined) => {
  return (types || [])
    .map((obj) => {
      const entry = Object.entries(obj)[0];
      const key = String(entry?.[0] || '');
      const value = safeNumber(entry?.[1]);
      return { key, label: humanizeKey(key), value };
    })
    .filter((x) => x.key)
    .sort((a, b) => b.value - a.value);
};

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
  const top3 = useMemo(() => normalizeBreakdown(types).slice(0, 3), [types]);
  const colors = ['primary.main', 'secondary.main', 'success.main'];

  return (
    <Card>
      <CardHeader title={<Typography sx={{ fontWeight: 800 }}>{title}</Typography>} subheader={subtitle} />
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Skeleton width="70%" />
                <Skeleton width="60%" />
                <Skeleton width="55%" />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
                {top3.map((item, idx) => (
                  <Box
                    key={`${item.key}-${idx}`}
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
          <Grid item xs={12} md={6}>
            {loading ? (
              <Skeleton variant="rounded" height={180} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DonutChart data={breakdown} height={180} showLegend={false} centerLabel="TOTAL" centerValue={safeNumber(total)} />
              </Box>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const SplitBreakdownChartCard = ({
  title,
  total,
  items,
  details,
  fetchDetails,
  loading,
  theme
}: {
  title: string;
  total: number;
  items: { key: string; label: string; value: number }[];
  details?: Record<string, { label: string; value: number }[]>;
  fetchDetails?: (key: string) => Promise<{ label: string; value: number }[]>;
  loading: boolean;
  theme: any;
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
    queryKey: ['dashboard-split-breakdown-details', title, selectedKey],
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
            <Select value="ALL" disabled>
              <MenuItem value="ALL">ALL</MenuItem>
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
              <ReactApexcharts
                type="bar"
                height={260}
                options={chartOptions}
                series={[{ name: title, data: chartItems.map((x) => x.value) }]}
              />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MachineryBarChartCard = ({
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

  const kpis = useMemo(() => {
    const contractors = getTypeCount(summary?.stakeholder?.types, ['contractor']);
    const consultants = getTypeCount(summary?.stakeholder?.types, ['consultants']);
    const roadProjects = getTypeCount(summary?.project?.types, ['road']);
    const buildingProjects = getTypeCount(summary?.project?.types, ['building']);
    const machinery = getTypeCount(summary?.resource?.types, ['machinery_and_equipment']);
    return { contractors, consultants, roadProjects, buildingProjects, machinery };
  }, [summary?.project?.types, summary?.resource?.types, summary?.stakeholder?.types]);

  const dummySplit = useMemo(() => {
    const allocate = (total: number, weights: number[]) => {
      const safeTotal = Math.max(0, Math.floor(total));
      const normalizedWeights = weights.map((w) => (Number.isFinite(w) ? Math.max(0, w) : 0));
      const sumWeights = normalizedWeights.reduce((a, b) => a + b, 0);
      if (!safeTotal || !sumWeights) return normalizedWeights.map(() => 0);
      const raw = normalizedWeights.map((w) => (safeTotal * w) / sumWeights);
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

    const contractorTotal = kpis.contractors > 0 ? kpis.contractors : 128;
    const consultantTotal = kpis.consultants > 0 ? kpis.consultants : 110;
    const roadTotal = kpis.roadProjects > 0 ? kpis.roadProjects : 65;
    const buildingTotal = kpis.buildingProjects > 0 ? kpis.buildingProjects : 52;
    const machineryTotal = kpis.machinery > 0 ? kpis.machinery : 44;

    const [generalContractors, buildingContractors, roadContractors, specialContractors] = allocate(contractorTotal, [0.34, 0.24, 0.22, 0.2]);
    const [generalConsultants, designConsultants, supervisionConsultants, specialConsultants] = allocate(consultantTotal, [0.38, 0.24, 0.2, 0.18]);
    const [asphalt, gravel, cobblestone, bridge] = allocate(roadTotal, [0.33, 0.18, 0.22, 0.27]);
    const [residential, commercial, publicBuilding, industrial] = allocate(buildingTotal, [0.36, 0.22, 0.26, 0.16]);
    const [
      compactors,
      rollers,
      asphaltPavers,
      asphaltMixers,
      conBatchPlants,
      concreteMixers,
      cranes,
      dozers,
      excavators,
      loaders
    ] = allocate(machineryTotal, [0.08, 0.11, 0.1, 0.09, 0.08, 0.11, 0.1, 0.09, 0.13, 0.11]);

    return {
      contractors: [
        { key: 'general_contractors', label: 'General Contractors', value: generalContractors },
        { key: 'building_contractors', label: 'Building Contractors', value: buildingContractors },
        { key: 'road_contractors', label: 'Road Contractors', value: roadContractors },
        { key: 'special_contractors', label: 'Special Contractors', value: specialContractors }
      ],
      consultants: [
        { key: 'general_consultants', label: 'General Consultants', value: generalConsultants },
        { key: 'design_consultants', label: 'Design Consultants', value: designConsultants },
        { key: 'supervision_consultants', label: 'Supervision Consultants', value: supervisionConsultants },
        { key: 'special_consultants', label: 'Special Consultants', value: specialConsultants }
      ],
      roadProjects: [
        { key: 'asphalt', label: 'Asphalt', value: asphalt },
        { key: 'gravel', label: 'Gravel', value: gravel },
        { key: 'cobblestone', label: 'Cobblestone', value: cobblestone },
        { key: 'bridge', label: 'Bridge', value: bridge }
      ],
      buildingProjects: [
        { key: 'residential', label: 'Residential', value: residential },
        { key: 'commercial', label: 'Commercial', value: commercial },
        { key: 'public', label: 'Public', value: publicBuilding },
        { key: 'industrial', label: 'Industrial', value: industrial }
      ],
      machinery: [
        { key: 'compactor', label: 'Compactor', value: compactors },
        { key: 'roller', label: 'Roller', value: rollers },
        { key: 'asphalt_paver', label: 'Asphalt Paver', value: asphaltPavers },
        { key: 'asphalt_mixer', label: 'Asphalt Mixer', value: asphaltMixers },
        { key: 'con_batch_plant', label: 'Con/Batch Plant', value: conBatchPlants },
        { key: 'concrete_mixer', label: 'Concrete Mixer', value: concreteMixers },
        { key: 'crane', label: 'Crane', value: cranes },
        { key: 'dozer', label: 'Dozer', value: dozers },
        { key: 'excavator', label: 'Excavator', value: excavators },
        { key: 'loader', label: 'Loader', value: loaders }
      ]
    };
  }, [kpis.buildingProjects, kpis.consultants, kpis.contractors, kpis.machinery, kpis.roadProjects]);

  const dummySplitDetails = useMemo(() => {
    const seedToInt = (seed: string) => {
      let h = 2166136261;
      for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };

    const createRng = (seed: string) => {
      let state = seedToInt(seed) || 1;
      return () => {
        state = (state * 1664525 + 1013904223) >>> 0;
        return state / 4294967296;
      };
    };

    const allocateByWeights = (total: number, weights: number[]) => {
      const safeTotal = Math.max(0, Math.floor(total));
      const normalizedWeights = weights.map((w) => (Number.isFinite(w) ? Math.max(0, w) : 0));
      const sumWeights = normalizedWeights.reduce((a, b) => a + b, 0);
      if (!safeTotal || !sumWeights) return normalizedWeights.map(() => 0);
      const raw = normalizedWeights.map((w) => (safeTotal * w) / sumWeights);
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

    const distribute = (total: number, count: number, seed: string) => {
      const safeCount = Math.max(1, Math.floor(count));
      const rng = createRng(seed);
      const peak1 = rng() < 0.2 ? 0 : rng() > 0.8 ? safeCount - 1 : 1 + Math.floor(rng() * Math.max(1, safeCount - 2));
      const sigma1 = 0.9 + rng() * 1.4;
      const hasSecondPeak = rng() < 0.35 && safeCount > 3;
      const peak2 = hasSecondPeak ? Math.floor(rng() * safeCount) : peak1;
      const sigma2 = hasSecondPeak ? 0.8 + rng() * 1.2 : sigma1;

      const weights = Array.from({ length: safeCount }, (_, idx) => {
        const d1 = (idx - peak1) / sigma1;
        const base1 = Math.exp(-0.5 * d1 * d1);
        let combined = base1;
        if (hasSecondPeak) {
          const d2 = (idx - peak2) / sigma2;
          combined += 0.65 * Math.exp(-0.5 * d2 * d2);
        }
        const jitter = 0.75 + rng() * 0.55;
        return combined * jitter;
      });

      return allocateByWeights(total, weights);
    };

    const build = (items: { key: string; value: number }[], gradeCount: number) => {
      return items.reduce((acc, item) => {
        const values = distribute(item.value, gradeCount, item.key);
        acc[item.key] = values.map((value, idx) => ({ label: `Grade ${idx + 1}`, value }));
        return acc;
      }, {} as Record<string, { label: string; value: number }[]>);
    };

    return {
      contractors: build(dummySplit.contractors, 7),
      consultants: build(dummySplit.consultants, 5)
    };
  }, [dummySplit.contractors, dummySplit.consultants]);

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
                    Welcome back to your <span className="notranslate" translate="no">ECDMS</span> command center.
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

        <Grid item xs={12}>
          <Grid container spacing={6} columns={{ xs: 12, md: 10 }}>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Contractors"
                value={isDashboardLoading ? '' : formatCompactNumber(kpis.contractors)}
                subtitle="Registered contractors"
                icon="tabler:helmet"
                loading={isDashboardLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Consultants"
                value={isDashboardLoading ? '' : formatCompactNumber(kpis.consultants)}
                subtitle="Registered consultants"
                icon="tabler:briefcase"
                loading={isDashboardLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Road Projects"
                value={isDashboardLoading ? '' : formatCompactNumber(kpis.roadProjects)}
                subtitle="Road sector portfolio"
                icon="tabler:road"
                loading={isDashboardLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Building Projects"
                value={isDashboardLoading ? '' : formatCompactNumber(kpis.buildingProjects)}
                subtitle="Building sector portfolio"
                icon="tabler:building"
                loading={isDashboardLoading}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Machinery"
                value={isDashboardLoading ? '' : formatCompactNumber(kpis.machinery)}
                subtitle="Machinery & equipment resources"
                icon="tabler:tools"
                loading={isDashboardLoading}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <ModuleBreakdownCard
            title="Stakeholders"
            subtitle="Distribution by type"
            total={totals.stakeholderTotal}
            types={summary?.stakeholder?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ModuleBreakdownCard
            title="Projects"
            subtitle="Distribution by type"
            total={totals.projectTotal}
            types={summary?.project?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ModuleBreakdownCard
            title="Resources"
            subtitle="Distribution by type"
            total={totals.resourceTotal}
            types={summary?.resource?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ModuleBreakdownCard
            title="Documents"
            subtitle="Distribution by type"
            total={totals.documentTotal}
            types={summary?.document?.types || []}
            loading={isDashboardLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Contractors"
            total={kpis.contractors}
            items={dummySplit.contractors}
            details={dummySplitDetails.contractors}
            loading={isDashboardLoading}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Consultants"
            total={kpis.consultants}
            items={dummySplit.consultants}
            details={dummySplitDetails.consultants}
            loading={isDashboardLoading}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Road Projects"
            total={kpis.roadProjects}
            items={dummySplit.roadProjects}
            loading={isDashboardLoading}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Building Projects"
            total={kpis.buildingProjects}
            items={dummySplit.buildingProjects}
            loading={isDashboardLoading}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12}>
          <MachineryBarChartCard title="Machinery" total={kpis.machinery} items={dummySplit.machinery} loading={isDashboardLoading} theme={theme} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};


export default EcommerceDashboard;
