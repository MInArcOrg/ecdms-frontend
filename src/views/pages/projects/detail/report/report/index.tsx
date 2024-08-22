import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectReportApiService from 'src/services/project/project-report-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';

import { ProjectReport } from 'src/types/project/project-report';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectReportCard from './project-report-card';
import { projectReportColumns } from './project-report-row';
import { useTranslation } from 'react-i18next';
import ReportDetail from './project-report-detail';
import ProjectReportDrawer from './project-report-drawer';

function ProjectReportList({ projectId }: { projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectReport | null>(null);
  const fetchProjectReports = (params: GetRequestParam): Promise<IApiResponse<ProjectReport[]>> => {
    return projectReportApiService.getAll({
      ...params,
      filter: { ...params.filter }
    });
  };
  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectReport);
    setShowDetailDrawer(!showDetailDrawer);
  };
  const { t } = useTranslation();
  const {
    data: projectReports,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectReport[]>({
    queryKey: ['projectReports'],
    fetchFunction: fetchProjectReports
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectReport);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectReport: ProjectReport) => {
    toggleDrawer();
    setSelectedRow(projectReport);
  };
  const handleDelete = async (projectReportId: string) => {
    await projectReportApiService.delete(projectReportId);
    refetch();
  };
  const handleClickDetail = (projectReport: ProjectReport) => {
    toggleDetailDrawer();
    setSelectedRow(projectReport);
  };
  return (
    <Box>
      {showDetailDrawer && (
        <ReportDetail projectReport={selectedRow as ProjectReport} show={showDetailDrawer} toggleDetail={toggleDetailDrawer} />
      )}
      {showDrawer && (
        <ProjectReportDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectReport={selectedRow as ProjectReport}
          refetch={refetch}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.report.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectReportCard
            onDetail={handleClickDetail}
            onEdit={handleEdit}
            projectReport={data}
            onDelete={handleDelete}
            refetch={refetch}
          />
        )}
        tableProps={{
          headers: projectReportColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'projectreport'
          }
        }}
        fetchDataFunction={refetch}
        items={projectReports || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectReportList;
