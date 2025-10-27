import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectApiService from 'src/services/project/project-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { Project } from 'src/types/project';
import ItemsListing from 'src/views/shared/listing';
import ProjectCard from './stakeholder-project-card';
import { projectColumns } from './stakeholder-project-row';
import stakeholderApiService from 'src/services/stakeholder/stakeholder-service';


const StakehlderProjectList = ({ stakeholderId, typeId }: { stakeholderId: string, typeId: string }) => {

  const { t } = useTranslation();
  const router = useRouter();
  const fetchProjects = (params: GetRequestParam): Promise<IApiResponse<Project[]>> => {
    return stakeholderApiService.getStakeholderProjects(stakeholderId, {
      ...params
    });
  };

  const {
    data: projects,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Project[]>({
    queryKey: ['projects', stakeholderId],
    fetchFunction: fetchProjects
  });



  const handleDelete = async (projectId: string) => {
    await projectApiService.delete(projectId);
    refetch();
  };

  return (
    <ItemsListing
      pagination={pagination}
      type={ITEMS_LISTING_TYPE.table.value}
      isLoading={isLoading}
      ItemViewComponent={({ data }) => (
        <ProjectCard onDetail={() => { }} project={data} onDelete={handleDelete} t={t} refetch={refetch} />
      )}
      title={t('project.title')}
      createActionConfig={{
        ...defaultCreateActionConfig,
        onlyIcon: false,
        show: false
      }}
      fetchDataFunction={refetch}
      tableProps={{
        headers: projectColumns(handleDelete, t, refetch, typeId)
      }}
      items={projects || []}
      onPaginationChange={handlePageChange}
    />
  );
}
export default StakehlderProjectList;
