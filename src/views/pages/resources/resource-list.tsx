import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import ResourceDrawer from './resource-drawer';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { Container } from '@mui/system';
import { resourceColumns } from './resource-row';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import resourceApiService from 'src/services/resource/resource-service';
import { Resource } from 'src/types/resource';

function ResourceList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Resource | null>(null);
  const { t } = useTranslation();

  const fetchResources = (params: GetRequestParam): Promise<IApiResponse<Resource[]>> => {
    return resourceApiService.getAll(params);
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
  const handleDelete = (resourceId: string) => {
    // Handle delete logic
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}
    >
      {showDrawer && (
        <ResourceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resource={selectedRow as Resource}
          refetch={refetch}
        />
      )}
      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'resource'
            }
          }}
          fetchDataFunction={refetch}
          tableProps={{ headers: resourceColumns(handleEdit, handleDelete, t, refetch) }}
          items={resources || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceList;
