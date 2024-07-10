import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceSalaryApiService from 'src/services/resource/resource-salary-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceSalary } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceSalaryCard from './resource-salary-card';
import ResourceSalaryDrawer from './resource-salary-drawer';

function ResourceSalaryList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceSalary | null>(null);

  const { t } = useTranslation();

  const fetchResourceSalarys = (params: GetRequestParam): Promise<IApiResponse<ResourceSalary[]>> => {
    return resourceSalaryApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceSalarys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceSalary[]>({
    queryKey: ['resourceSalarys', resourceId],
    fetchFunction: fetchResourceSalarys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceSalary);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceSalary: ResourceSalary) => {
    toggleDrawer();
    setSelectedRow(resourceSalary);
  };
  const handleDelete = async (resourceSalaryId: string) => {
    await resourceSalaryApiService.delete(resourceSalaryId);
    refetch();
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
        <ResourceSalaryDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceSalary={selectedRow as ResourceSalary}
          refetch={() => {
            refetch();
          }}
        />
      )}
      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.grid.value}
          isLoading={isLoading}
          breakpoints={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}
          ItemViewComponent={({ data }) => (
            <ResourceSalaryCard resourceSalary={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'detailresourcetype'
            }
          }}
          fetchDataFunction={refetch}
          items={resourceSalarys || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceSalaryList;
