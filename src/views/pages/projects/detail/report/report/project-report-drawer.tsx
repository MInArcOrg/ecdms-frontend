import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import projectPlanApiService from "src/services/project/project-plan-service";
import { ProjectReport } from "src/types/project/project-report";
import CustomSideDrawer from "src/views/shared/drawer/side-drawer";
import ProjectReportFormWrapper from "./project-report-form-wrapper";
import ReportMonthSelector from "./report-month-selector";
import moment from "moment";
import { ProjectPlan } from "src/types/project/project-plan";

interface ProjectReportDrawerType {
  open: boolean;
  toggle: () => void;
  refetch: () => void;
  projectReport: ProjectReport;
  projectId: string;
}

const ProjectReportDrawer = (props: ProjectReportDrawerType) => {
  const { open, toggle, projectReport } = props;
  const isEdit = Boolean(projectReport?.id);
  const [date, setDate] = useState<Date | undefined>(
    projectReport.year?
    moment({ year:Number(projectReport.year), month: 0, day: 1 }).toDate():undefined
  );  const [quarter, setQuarter] = useState<number | undefined>(Number(projectReport.quarter));


  const fetchReportData = async () => {
    const response = await projectPlanApiService.getAll({
      filter: { year: date?.getFullYear(), quarter },
    });
    return response?.payload;
  };

  const { data, refetch: refetchPlanData } = useQuery({
    queryKey: ["report", date, quarter],
    queryFn: fetchReportData,
    enabled: false, // Disable automatic query
  });


  return (
    <CustomSideDrawer
      title={`project.report.${
        isEdit ? "edit-project-report" : "create-project-report"
      }`}
      handleClose={toggle}
      open={open}
      width={700}
    >
      {() => (
        <Fragment>
          {data && data.length > 0 ? (
            <ProjectReportFormWrapper projectPlan={data[0]} {...props} />
          ) : (
            <ReportMonthSelector
              fetchData={refetchPlanData}
              date={date}
              setDate={setDate}
              quarter={quarter}
              setQuarter={setQuarter}
            />
          )}
        </Fragment>
      )}
    </CustomSideDrawer>
  );
};

export default ProjectReportDrawer;
