import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import Icon from 'src/@core/components/icon';
import { useAuth } from 'src/hooks/useAuth';
import { timeGreating } from 'src/utils/formatter/date';
import WideCarousel from 'src/views/dashboards/WideCarousel';
import { KpiCard, MachineryBarChartCard, ModuleBreakdownCard, SplitBreakdownChartCard } from './dashboard-cards';
import { formatCompactNumber } from './dashboard-utils';
import { useDashboardData } from './use-dashboard-data';

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();
  const greeting = timeGreating(new Date());
  const theme = useTheme();

  const {
    useDummyData,
    handleToggleDummyData,
    departments,
    selectedDepartmentId,
    handleDepartmentChange,
    isDashboardLoading,
    isDashboardError,
    isDepartmentLoading,
    departmentName,
    summary,
    totals,
    kpis,
    split,
    splitDetails,
    fetchContractorsSplitDetails,
    fetchConsultantsSplitDetails,
    loading,
    error
  } = useDashboardData(user?.department_id);

  const quickLinks = useMemo(
    () => [
      { label: 'Stakeholders', icon: 'tabler:users', path: '/stakeholders' },
      { label: 'Projects', icon: 'tabler:box', path: '/projects' },
      { label: 'Resources', icon: 'tabler:package', path: '/resources' },
      { label: 'Documents', icon: 'tabler:file', path: '/documents' }
    ],
    []
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
                  <Typography variant="h3" sx={{ mt: 3, fontWeight: 900, color: 'common.white', lineHeight: 1.05 }}>
                    {t(greeting.greating)}, {user?.name || ''}
                  </Typography>
                  <Typography sx={{ mt: 2.5, color: 'rgba(255,255,255,0.85)', maxWidth: 520 }}>
                    Welcome back to your <span className="notranslate" translate="no">ECDMS</span> command center.
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,0.75)' }}>
                    {isDepartmentLoading ? <Skeleton width={260} /> : departmentName}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 2 }}>
                  <FormControlLabel
                    sx={{ color: 'common.white', m: 0 }}
                    control={<Switch checked={useDummyData} onChange={handleToggleDummyData} />}
                    label={useDummyData ? 'Dummy Data' : 'Real Data'}
                  />

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                    {quickLinks.map((item) => (
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
              </Box>
            }
          />
        </Grid>

        {!useDummyData && isDashboardError ? (
          <Grid item xs={12}>
            <Alert severity="error">Failed to load dashboard data.</Alert>
          </Grid>
        ) : null}

        <Grid item xs={12}>
          <Grid container spacing={6} columns={{ xs: 12, md: 10 }}>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Contractors"
                value={loading.kpiContractors ? '' : formatCompactNumber(kpis.contractors)}
                subtitle="Registered contractors"
                icon="tabler:helmet"
                loading={loading.kpiContractors}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Consultants"
                value={loading.kpiConsultants ? '' : formatCompactNumber(kpis.consultants)}
                subtitle="Registered consultants"
                icon="tabler:briefcase"
                loading={loading.kpiConsultants}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Road Projects"
                value={loading.kpiRoadProjects ? '' : formatCompactNumber(kpis.roadProjects)}
                subtitle="Road sector portfolio"
                icon="tabler:road"
                loading={loading.kpiRoadProjects}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Building Projects"
                value={loading.kpiBuildingProjects ? '' : formatCompactNumber(kpis.buildingProjects)}
                subtitle="Building sector portfolio"
                icon="tabler:building"
                loading={loading.kpiBuildingProjects}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <KpiCard
                title="Machinery"
                value={loading.kpiMachinery ? '' : formatCompactNumber(kpis.machinery)}
                subtitle="Machinery & equipment resources"
                icon="tabler:tools"
                loading={loading.kpiMachinery}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ModuleBreakdownCard
            title="Stakeholders"
            subtitle="Distribution by type"
            total={totals.stakeholderTotal}
            types={summary?.stakeholder?.types || []}
            loading={loading.stakeholders}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ModuleBreakdownCard
            title="Projects"
            subtitle="Distribution by type"
            total={totals.projectTotal}
            types={summary?.project?.types || []}
            loading={loading.projects}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <ModuleBreakdownCard
            title="Resources"
            subtitle="Distribution by type"
            total={totals.resourceTotal}
            types={summary?.resource?.types || []}
            loading={loading.resources}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Contractors"
            total={kpis.contractors}
            items={split.contractors}
            details={splitDetails?.contractors}
            fetchDetails={fetchContractorsSplitDetails}
            loading={loading.splitContractors}
            theme={theme}
            departmentId={selectedDepartmentId}
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Consultants"
            total={kpis.consultants}
            items={split.consultants}
            details={splitDetails?.consultants}
            fetchDetails={fetchConsultantsSplitDetails}
            loading={loading.splitConsultants}
            theme={theme}
            departmentId={selectedDepartmentId}
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Road Projects"
            total={kpis.roadProjects}
            items={split.roadProjects}
            loading={loading.splitRoadProjects}
            theme={theme}
            departmentId={selectedDepartmentId}
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SplitBreakdownChartCard
            title="Building Projects"
            total={kpis.buildingProjects}
            items={split.buildingProjects}
            loading={loading.splitBuildingProjects}
            theme={theme}
            departmentId={selectedDepartmentId}
            departments={departments}
            onDepartmentChange={handleDepartmentChange}
          />
        </Grid>
        <Grid item xs={12}>
          <MachineryBarChartCard title="Machinery" total={kpis.machinery} items={split.machinery} loading={loading.splitMachinery} theme={theme} />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  );
};

export default DashboardPage;
