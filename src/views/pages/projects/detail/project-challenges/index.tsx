'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectChallengeApiService from 'src/services/project/project-challenge-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProjectChallengeCard from './project-challenge-card';
import ProjectChallengeDrawer from './project-challenge-drawer';
import type { ProjectChallenge } from 'src/types/project/project-challenge';
import { projectChallengeColumns } from './project-challenge-row';

interface ProjectChallengeListProps {
  model?: string;
  projectId: string;
  typeId: string;
}

const ProjectChallengeList: React.FC<ProjectChallengeListProps> = ({ projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectChallenge | null>(null);
  const { t } = useTranslation();

  const fetchProjectChallenges = (params: GetRequestParam): Promise<IApiResponse<ProjectChallenge[]>> => {
    return projectChallengeApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: projectChallenges,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectChallenge[]>({
    queryKey: ['projectChallenges', projectId],
    fetchFunction: fetchProjectChallenges
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectChallenge);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectChallenge);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (projectChallenge: ProjectChallenge) => {
    setSelectedRow(projectChallenge);
    setShowDrawer(true);
  };

  const handleDelete = async (projectChallengeId: string) => {
    await projectChallengeApiService.delete(projectChallengeId);
    refetch();
  };

  const handleClickDetail = (projectChallenge: ProjectChallenge) => {
    setSelectedRow(projectChallenge);
    setShowDetailDrawer(true);
  };

  const mapProjectChallengeToDetailItems = (projectChallenge: ProjectChallenge): { title: string; value: string }[] => [
    {
      title: t('project.challenges.title'),
      value: projectChallenge?.title || 'N/A'
    },
    {
      title: t('project.challenges.description'),
      value: projectChallenge?.description || 'N/A'
    },
    {
      title: t('project.challenges.measures_taken'),
      value: projectChallenge?.measures_taken || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: projectChallenge?.created_at ? formatCreatedAt(projectChallenge.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <ProjectChallengeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectChallenge={selectedRow as ProjectChallenge}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapProjectChallengeToDetailItems(selectedRow as ProjectChallenge)}
          id={selectedRow?.id || ''}
          hasReference={false}
          title={t('project.challenges.details')}
          fileType="projectChallenge"
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.reporting.report.challenges')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: projectChallengeColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectChallengeCard
            onDetail={handleClickDetail}
            projectChallenge={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'challenge'
          }
        }}
        fetchDataFunction={refetch}
        items={projectChallenges || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectChallengeList;
