import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectVariationCard from './project-variation-card';
import ProjectVariationDrawer from './project-variation-drawer';
import { ProjectVariation } from 'src/types/project/project-finance';
import projectVariationApiService from 'src/services/project/projecct-variation-service';

function ProjectVariationList({ type,projectId }: { type: string,projectId:string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectVariation | null>(null);
  const { t: transl } = useTranslation();
  const fetchProjectVariations = (params: GetRequestParam): Promise<IApiResponse<ProjectVariation[]>> => {
    return projectVariationApiService.getAll({ ...params, filter: { ...params.filter, type: type } });
  };

  const {
    data: projectVariations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectVariation[]>({
    queryKey: ['projectVariations',type],
    fetchFunction: fetchProjectVariations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectVariation);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectVariation: ProjectVariation) => {
    toggleDrawer();
    setSelectedRow(projectVariation);
  };
  const handleDelete = async (projectVariationId: string) => {
    await projectVariationApiService.delete(projectVariationId);
    refetch();
  };

  return (
    <Box>
      <Card>
        {showDrawer && (
          <ProjectVariationDrawer 
          open={showDrawer}
          toggle={toggleDrawer}
          projectVariation={selectedRow as ProjectVariation} 
          refetch={refetch} type={type} projectId={projectId} />
        )}
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.list.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <ProjectVariationCard type={type} projectVariation={data}  onEdit={handleEdit} refetch={refetch} />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'variations'
            }
          }}
          fetchDataFunction={refetch}
          items={projectVariations || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}
export default ProjectVariationList;
