import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import projectReportApiService from 'src/services/project/project-report-service';
import { ProjectReport } from 'src/types/project/project-report';
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
  const isEdit = Boolean(projectReport?.id);

  const [date, setDate] = useState<Date | undefined>(
    projectReport.year ? moment({ year: Number(projectReport.year), month: 0, day: 1 }).toDate() : undefined
  );
  const [quarter, setQuarter] = useState<number | undefined>(Number(projectReport.quarter));

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await projectReportApiService.getMonthlyProjectReport(projectId, {
        filter: { year: date?.getFullYear(), quarter }
      });
      setData(response?.payload);
    } catch (error) {
      console.error('Error fetching project report data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchReportData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit]);

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
            <ProjectReportFormWrapper monthlyReport={data.data} projectPlan={data.plan} {...props} />
          ) : (
            <ReportMonthSelector fetchData={fetchReportData} date={date} setDate={setDate} quarter={quarter} setQuarter={setQuarter} />
          )}
        </Fragment>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectReportDrawer;
