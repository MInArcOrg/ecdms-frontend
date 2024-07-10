import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceSpecificationApiService from 'src/services/resource/resource-specification-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceSpecification } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceSpecificationCard from './resource-specification-card';
import ResourceSpecificationDrawer from './resource-specification-drawer';
import ImageSwiper from 'src/views/components/custom/image/image-swiper';

function ResourceSpecificationList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refetchImages, setRefetchImages] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceSpecification | null>(null);

  const { t } = useTranslation();

  const fetchResourceSpecifications = (params: GetRequestParam): Promise<IApiResponse<ResourceSpecification[]>> => {
    return resourceSpecificationApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceSpecifications,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceSpecification[]>({
    queryKey: ['resourceSpecifications', resourceId],
    fetchFunction: fetchResourceSpecifications
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceSpecification);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceSpecification: ResourceSpecification) => {
    toggleDrawer();
    setSelectedRow(resourceSpecification);
  };
  const handleDelete = async (resourceSpecificationId: string) => {
    await resourceSpecificationApiService.delete(resourceSpecificationId);
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
        <ResourceSpecificationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceSpecification={selectedRow as ResourceSpecification}
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
            <ResourceSpecificationCard resourceSpecification={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch}>
              <ImageSwiper id={data.id} refetch={refetchImages} />
            </ResourceSpecificationCard>
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: true,
            permission: {
              action: 'create',
              subject: 'resourceSpecification'
            }
          }}
          fetchDataFunction={refetch}
          items={resourceSpecifications || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceSpecificationList;
