import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { planReportTypeConstant } from 'src/constants/project-plan-report-constants';
import projectPlanApiService from 'src/services/project/project-plan-service';
import projectReportApiService from 'src/services/project/project-report-service';
import type { ProjectPlan } from 'src/types/project/project-plan';
import { MonthlyReport, ProjectReport } from 'src/types/project/project-report';
import { defaultGetRequestParam } from 'src/types/requests';
import CustomSideDrawer from 'src/views/shared/drawer/side-drawer';
import ProjectReportFormWrapper from './project-report-form-wrapper';
import ReportMonthSelector from './report-month-selector';
import LoadingPlaceholder from 'src/views/components/loader';

interface ProjectReportDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectReport: ProjectReport;
  projectId: string;
}

const ProjectReportDrawer = (props: ProjectReportDrawerType) => {
  const { open, toggle, projectReport, projectId } = props;

  const extractPlanYear = (plan: any) => {
    const rawYear = plan?.year;
    if (rawYear === null || rawYear === undefined) return undefined;
    if (typeof rawYear === 'number' && Number.isFinite(rawYear)) return rawYear;
    const trimmed = String(rawYear).trim();
    if (!trimmed) return undefined;
    const matchYear = trimmed.match(/(\d{4})/);
    if (!matchYear?.[1]) return undefined;
    const y = Number(matchYear[1]);
    return Number.isFinite(y) ? y : undefined;
  };

  const [date, setDate] = useState<Date | undefined>(
    projectReport.year ? moment({ year: Number(projectReport.year), month: 0, day: 1 }).toDate() : undefined
  );
  const [quarter, setQuarter] = useState<number | undefined>(Number(projectReport.quarter));
  const [allProjectPlans, setAllProjectPlans] = useState<ProjectPlan[]>([]);
  const [projectPlans, setProjectPlans] = useState<ProjectPlan[]>([]);
  const [projectPlansLoading, setProjectPlansLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ProjectPlan | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);

  const [data, setData] = useState<{ data: MonthlyReport; plan: ProjectPlan; report: ProjectReport | null } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const effectiveProjectReport = (data?.report || projectReport) as ProjectReport;
  const isEdit = Boolean(effectiveProjectReport?.id);
  const shouldFetchOnOpen = Boolean(projectReport?.id);

  const fetchReportData = async () => {
    if (!date) return;
    const resolvedQuarter =
      Number.isFinite(quarter as any) && quarter
        ? quarter
        : selectedPlan?.quarter
          ? Number(selectedPlan.quarter)
          : 1;

    setLoading(true);
    try {
      const response = await projectReportApiService.getMonthlyProjectReport(projectId, {
        filter: { year: date?.getFullYear(), quarter: resolvedQuarter }
      });
      setData(response?.payload);
    } catch (error) {
      console.error('Error fetching project report data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetchOnOpen) {
      fetchReportData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchOnOpen]);

  useEffect(() => {
    const fetchAllPlans = async () => {
      if (!projectId) return;

      setProjectPlansLoading(true);
      try {
        const response = await projectPlanApiService.getAll({
          ...defaultGetRequestParam,
          pagination: { page: 1, pageSize: 100000 },
          filter: { project_id: projectId }
        });

        const plans = (response?.payload || []) as ProjectPlan[];
        setAllProjectPlans(plans);

        const plansForYearOptions = plans;
        const years = Array.from(
          new Set(
            plansForYearOptions
              .map((p: any) => {
                return extractPlanYear(p);
              })
              .filter((y: any) => Number.isFinite(y))
          )
        )
          .map((y) => Number(y))
          .sort((a, b) => a - b);

        setAvailableYears(years);
      } catch {
        setAllProjectPlans([]);
        setAvailableYears([]);
      } finally {
        setProjectPlansLoading(false);
      }
    };

    fetchAllPlans();
  }, [projectId]);

  useEffect(() => {
    const selectedYear = date ? date.getFullYear() : undefined;
    if (!selectedYear) {
      setProjectPlans([]);
      setSelectedPlan(null);
      setQuarter(undefined);
      return;
    }

    const plansForYear = allProjectPlans
      .filter((p: any) => String(p?.type || '').toUpperCase() === planReportTypeConstant.QUARTERLY.value)
      .filter((p: any) => {
        const year = extractPlanYear(p);
        return year === selectedYear;
      })
      .sort((a: any, b: any) => {
        return Number(a?.quarter ?? 0) - Number(b?.quarter ?? 0);
      });

    setProjectPlans(plansForYear);

    const stillSelected = selectedPlan && plansForYear.some((p) => p.id === selectedPlan.id) ? selectedPlan : null;
    const nextSelected = stillSelected || plansForYear[0] || null;
    setSelectedPlan(nextSelected);

    const q = nextSelected?.quarter ? Number(nextSelected.quarter) : undefined;
    setQuarter(Number.isFinite(q) ? q : undefined);
  }, [allProjectPlans, date]);

  return (
    <CustomSideDrawer
      title={`project.report.${isEdit ? 'edit-project-report' : 'create-project-report'}`}
      handleClose={toggle}
      open={open}
      width={700}
    >
      {() => (
        <Fragment>
          {loading ? (
            <LoadingPlaceholder />
          ) : data && data.data ? (
            <ProjectReportFormWrapper
              {...props}
              projectReport={(data.report || props.projectReport) as ProjectReport}
              monthlyReport={data.data}
              projectPlan={data.plan}
            />
          ) : (
            <ReportMonthSelector
              fetchData={fetchReportData}
              date={date}
              setDate={setDate}
              quarter={quarter}
              setQuarter={setQuarter}
              availableYears={availableYears}
              projectPlans={projectPlans}
              projectPlansLoading={projectPlansLoading}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
            />
          )}
        </Fragment>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectReportDrawer;
