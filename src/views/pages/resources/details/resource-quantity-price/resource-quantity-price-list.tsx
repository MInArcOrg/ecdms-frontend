import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceQuantityPriceApiService from 'src/services/resource/resource-quantity-price-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceQuantityPrice } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceQuantityPriceCard from './resource-quantity-price-card';
import ResourceQuantityPriceDrawer from './resource-quantity-price-drawer';

function ResourceQuantityPriceList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceQuantityPrice | null>(null);

  const { t } = useTranslation();

  const fetchResourceQuantityPrices = (params: GetRequestParam): Promise<IApiResponse<ResourceQuantityPrice[]>> => {
    return resourceQuantityPriceApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceQuantityPrices,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceQuantityPrice[]>({
    queryKey: ['resourceQuantityPrices', resourceId],
    fetchFunction: fetchResourceQuantityPrices
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceQuantityPrice);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceQuantityPrice: ResourceQuantityPrice) => {
    toggleDrawer();
    setSelectedRow(resourceQuantityPrice);
  };
  const handleDelete = async (resourceQuantityPriceId: string) => {
    await resourceQuantityPriceApiService.delete(resourceQuantityPriceId);
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
        <ResourceQuantityPriceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceQuantityPrice={selectedRow as ResourceQuantityPrice}
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
            <ResourceQuantityPriceCard resourceQuantityPrice={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
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
          items={resourceQuantityPrices || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceQuantityPriceList;
