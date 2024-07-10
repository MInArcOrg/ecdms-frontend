import { Box, Card } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceApiService from 'src/services/resource/resource-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { Resource } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceCard from './resource-card';
import ResourceDrawer from './resource-drawer';
import { resourceColumns } from './resource-row';

function ResourceList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Resource | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchResources = (params: GetRequestParam): Promise<IApiResponse<Resource[]>> => {
    return resourceApiService.getAll({ ...params, filter: { ...params.filter, resourcetype_id: typeId } });
  };

  const {
    data: resources,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Resource[]>({
    queryKey: ['resources'],
    fetchFunction: fetchResources
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Resource);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resource: Resource) => {
    toggleDrawer();
    setSelectedRow(resource);
  };
  const handleDelete = async (resourceId: string) => {
    await resourceApiService.delete(resourceId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ResourceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resource={selectedRow as Resource}
          refetch={refetch}
          typeId={String(typeId)}
        />
      )}
      <Card>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <ResourceCard resource={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'resource'
            }
          }}
          fetchDataFunction={refetch}
          tableProps={{
            headers: resourceColumns(handleEdit, handleDelete, t, refetch, String(typeId))
          }}
          items={resources || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}

export default ResourceList;
