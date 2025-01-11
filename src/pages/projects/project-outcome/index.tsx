import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOutcomeApiService from 'src/services/project/project-outcome-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProjectOutcomeCard from './project-outcome-card';
import ProjectOutcomeDrawer from './project-outcome-drawer';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';
import { projectOutcomeColumns } from './project-outcome-row';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';

interface ProjectOutcomeListProps {
  projectId: string;
}

const ProjectOutcomeList: React.FC<ProjectOutcomeListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectOutcome | null>(null);
  const { t } = useTranslation();

  const fetchProjectOutcomes = (params: GetRequestParam): Promise<IApiResponse<ProjectOutcome[]>> => {
    return projectOutcomeApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: projectOutcomes,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectOutcome[]>({
    queryKey: ['projectOutcomes'],
    fetchFunction: fetchProjectOutcomes
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectOutcome);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectOutcome);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (outcome: ProjectOutcome) => {
    toggleDrawer();
    setSelectedRow(outcome);
  };

  const handleDelete = async (outcomeId: string) => {
    await projectOutcomeApiService.delete(outcomeId);
    refetch();
  };

  const handleClickDetail = (outcome: ProjectOutcome) => {
    toggleDetailDrawer();
    setSelectedRow(outcome);
  };

  const mapProjectOutcomeToDetailItems = (outcome: ProjectOutcome): { title: string; value: string }[] => [
    { title: t('project.outcome.construction-type'), value: outcome?.construction_type || 'N/A' },
    { title: t('project.outcome.function'), value: outcome?.function || 'N/A' },
    { title: t('project.outcome.lesson-learned'), value: outcome?.lesson_learned || 'N/A' },
    { title: t('common.table-columns.created-at'), value: outcome?.created_at ? formatCreatedAt(outcome.created_at) : 'N/A' },
    { title: t('common.table-columns.updated-at'), value: outcome?.updated_at ? formatCreatedAt(outcome.updated_at) : 'N/A' }
  ];

  return (
    <Box>
      {showDrawer && (
        <ProjectOutcomeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectOutcome={selectedRow as ProjectOutcome}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapProjectOutcomeToDetailItems(selectedRow as ProjectOutcome)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.project}
          title={t('project.outcome.details')}
        />
      )}

      <ItemsListing
        title={t('project.outcome.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: projectOutcomeColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectOutcomeCard onDetail={handleClickDetail} projectOutcome={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectoutcome'
          }
        }}
        fetchDataFunction={refetch}
        items={projectOutcomes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectOutcomeList;