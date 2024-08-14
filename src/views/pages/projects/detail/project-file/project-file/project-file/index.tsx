import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import fileModelApiService from 'src/services/general/file-api-service';
import { FileModel } from 'src/types/general/file';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectFileCard from './project-file-card';
import ProjectFileDrawer from './project-file-drawer';

function ProjectFileList({ type, projectId }: { type: string; projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<FileModel | null>(null);
  const fetchProjectFiles = (params: GetRequestParam): Promise<IApiResponse<FileModel[]>> => {
    return fileModelApiService.getAll({
      ...params,
      filter: { ...params.filter, type: type, reference_id: projectId }
    });
  };

  const {
    data: projectFiles,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<FileModel[]>({
    queryKey: ['projectFiles', type],
    fetchFunction: fetchProjectFiles
  });

  const toggleDrawer = () => {
    setSelectedRow({} as FileModel);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectFile: FileModel) => {
    toggleDrawer();
    setSelectedRow(projectFile);
  };
  const handleDelete = async (projectFileId: string) => {
    await fileModelApiService.delete(projectFileId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ProjectFileDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectFile={selectedRow as FileModel}
          refetch={refetch}
          type={type}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.project-file.project-${type.toLocaleLowerCase()}`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectFileCard type={type} onEdit={handleEdit} refetch={refetch} projectFile={data} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'files'
          }
        }}
        fetchDataFunction={refetch}
        items={projectFiles || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectFileList;
