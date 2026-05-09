'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectFileApiService from 'src/services/project/project-file-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { ProjectFile } from 'src/types/project/project-file';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectFileDrawer from './project-file-drawer';
import { projectFileColumns } from './project-file-row';

function ProjectFileList({ projectId, type }: { projectId: string; type: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectFile | null>(null);
  const { t } = useTranslation();

  const fetchProjectFiles = (params: GetRequestParam): Promise<IApiResponse<ProjectFile[]>> => {
    return projectFileApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId, type }
    });
  };

  const { data, isLoading, pagination, handlePageChange, refetch } = usePaginatedFetch<ProjectFile[]>({
    queryKey: ['project-files', projectId, type],
    fetchFunction: fetchProjectFiles
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectFile);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (item: ProjectFile) => {
    toggleDrawer();
    setSelectedRow(item);
  };

  const handleDelete = async (id: string) => {
    await projectFileApiService.delete(id);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ProjectFileDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectFile={selectedRow as ProjectFile}
          refetch={refetch}
          projectId={projectId}
          type={type}
        />
      )}

      <ItemsListing
        title="Project File"
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: projectFileColumns(handleEdit, handleDelete, t, type)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectdocument'
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}

export default ProjectFileList;

