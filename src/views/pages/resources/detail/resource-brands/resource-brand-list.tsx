import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceBrandApiService from 'src/services/resource/resource-brand-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceBrand } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceBrandCard from './resource-brand-card';
import ResourceBrandDrawer from './resource-brand-drawer';
import ImageSwiper from 'src/views/components/custom/image/image-swiper';

function ResourceBrandList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refetchImages, setRefetchImages] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceBrand | null>(null);

  const { t } = useTranslation();

  const fetchResourceBrands = (params: GetRequestParam): Promise<IApiResponse<ResourceBrand[]>> => {
    return resourceBrandApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceBrands,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceBrand[]>({
    queryKey: ['resourceBrands', resourceId],
    fetchFunction: fetchResourceBrands
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceBrand);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceBrand: ResourceBrand) => {
    toggleDrawer();
    setSelectedRow(resourceBrand);
  };
  const handleDelete = async (resourceBrandId: string) => {
    await resourceBrandApiService.delete(resourceBrandId);
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
        <ResourceBrandDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceBrand={selectedRow as ResourceBrand}
          refetch={() => {
            refetch();
            setRefetchImages(true);
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
            <ResourceBrandCard resourceBrand={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch}>
              <ImageSwiper id={data.id} refetch={refetchImages} />
            </ResourceBrandCard>
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'resourceBrand'
            }
          }}
          fetchDataFunction={refetch}
          items={resourceBrands || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceBrandList;
