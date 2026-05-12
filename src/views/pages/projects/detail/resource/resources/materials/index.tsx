import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { Resource } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import resourceApiService from 'src/services/resource/resource-service';
import { resourceTypesMaster } from 'src/views/pages/resources/details/layout/resource-menu-items';
import MaterialsDrawer from './materials-drawer';
import { materialColumns } from './materials-row';

const ProjectMaterialsList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Resource | null>(null);

  const { data: materialTypes } = useQuery({
    queryKey: ['masterType', 'resource', resourceTypesMaster.material],
    queryFn: () => masterTypeApiService.getAll('resource', { filter: { flag: resourceTypesMaster.material } }),
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000
  });

  const materialTypeId = materialTypes?.payload?.[0]?.id || '';

  const fetchMaterials = (params: GetRequestParam): Promise<IApiResponse<Resource[]>> => {
    return resourceApiService.getAll({
      ...params,
      filter: {
        ...params.filter,
        parent: projectId,
        resourcetype_id: materialTypeId
      }
    });
  };

  const {
    data: materials,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Resource[]>({
    queryKey: ['project-materials', projectId, materialTypeId],
    fetchFunction: fetchMaterials
  });

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const handleCreate = () => {
    setSelectedRow(null);
    setShowDrawer(true);
  };

  const handleEdit = (item: Resource) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await resourceApiService.delete(id);
    refetch();
  };

  const canRender = Boolean(materialTypeId);

  return (
    <Box>
      {showDrawer && canRender && (
        <MaterialsDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          projectId={projectId}
          resourceTypeId={materialTypeId}
          material={selectedRow}
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.materials')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: materialColumns(handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectmaterial'
          }
        }}
        fetchDataFunction={refetch}
        items={materials || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ProjectMaterialsList;
