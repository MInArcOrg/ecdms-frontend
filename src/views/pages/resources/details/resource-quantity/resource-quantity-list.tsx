import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceQuantityApiService from 'src/services/resource/resource-quantity-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceQuantity } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceQuantityCard from './resource-quantity-card';
import ResourceQuantityDrawer from './resource-quantity-drawer';

function ResourceQuantityList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceQuantity | null>(null);

  const { t } = useTranslation();

  const fetchResourceQuantitys = (params: GetRequestParam): Promise<IApiResponse<ResourceQuantity[]>> => {
    return resourceQuantityApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceQuantitys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceQuantity[]>({
    queryKey: ['resourceQuantitys', resourceId],
    fetchFunction: fetchResourceQuantitys
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceQuantity);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceQuantity: ResourceQuantity) => {
    toggleDrawer();
    setSelectedRow(resourceQuantity);
  };
  const handleDelete = async (resourceQuantityId: string) => {
    await resourceQuantityApiService.delete(resourceQuantityId);
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
        <ResourceQuantityDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceQuantity={selectedRow as ResourceQuantity}
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
            <ResourceQuantityCard resourceQuantity={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'resourceprice'
            }
          }}
          fetchDataFunction={refetch}
          items={resourceQuantitys || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceQuantityList;
