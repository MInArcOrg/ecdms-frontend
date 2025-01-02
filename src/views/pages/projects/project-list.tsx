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
import ProjectCard from './project-card';
import ProjectDrawer from './project-drawer';
import { projectColumns } from './project-row';

function ProjectList() {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<Project | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchProjects = (params: GetRequestParam): Promise<IApiResponse<Project[]>> => {
    return projectApiService.getAll({ ...params, filter: { ...params.filter, projecttype_id: typeId } });
  };

  const {
    data: projects,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Project[]>({
    queryKey: ['projects'],
    fetchFunction: fetchProjects
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Project);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (project: Project) => {
    toggleDrawer();
    setSelectedRow(project);
  };
  const handleDelete = async (projectId: string) => {
    await projectApiService.delete(projectId);
    refetch();
  };

  return (
    <Box>
      <Card>
        {showDrawer && (
          <ProjectDrawer
            open={showDrawer}
            toggle={toggleDrawer}
            project={selectedRow as Project}
            refetch={refetch}
            typeId={String(typeId)}
          />
        )}
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.grid.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <ProjectCard onDetail={() => { }} project={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          title={t('project.title')}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'project'
            }
          }}
          fetchDataFunction={refetch}
          tableProps={{
            headers: projectColumns(handleEdit, handleDelete, t, refetch, String(typeId))
          }}
          items={projects || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
export default ProjectList;
