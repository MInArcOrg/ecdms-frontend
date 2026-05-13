import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourcePriceApiService from 'src/services/resource/resource-price-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourcePrice } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourcePriceCard from './resource-price-card';
import ResourcePriceDrawer from './resource-price-drawer';

function ResourcePriceList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourcePrice | null>(null);

  const { t } = useTranslation();

  const fetchResourcePrices = (params: GetRequestParam): Promise<IApiResponse<ResourcePrice[]>> => {
    return resourcePriceApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourcePrices,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourcePrice[]>({
    queryKey: ['resourcePrices', resourceId],
    fetchFunction: fetchResourcePrices
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourcePrice);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourcePrice: ResourcePrice) => {
    toggleDrawer();
    setSelectedRow(resourcePrice);
  };
  const handleDelete = async (resourcePriceId: string) => {
    await resourcePriceApiService.delete(resourcePriceId);
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
        <ResourcePriceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourcePrice={selectedRow as ResourcePrice}
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
            <ResourcePriceCard resourcePrice={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
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
          items={resourcePrices || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourcePriceList;
