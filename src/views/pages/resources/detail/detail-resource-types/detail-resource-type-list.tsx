import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import detailResourceTypeApiService from 'src/services/resource/resource-detail-type-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { DetailResourceType } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import DetailResourceTypeCard from './detail-resource-type-card';
import DetailResourceTypeDrawer from './detail-resource-type-drawer';
import ImageSwiper from 'src/views/components/custom/image/image-swiper';
import resourceBrandApiService from 'src/services/resource/resource-brand-service';

function DetailResourceTypeList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [refetchImages, setRefetchImages] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DetailResourceType | null>(null);

  const { t } = useTranslation();

  const fetchDetailResourceTypes = (params: GetRequestParam): Promise<IApiResponse<DetailResourceType[]>> => {
    return detailResourceTypeApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: detailResourceTypes,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DetailResourceType[]>({
    queryKey: ['detailResourceTypes', resourceId],
    fetchFunction: fetchDetailResourceTypes
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DetailResourceType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (detailResourceType: DetailResourceType) => {
    toggleDrawer();
    setSelectedRow(detailResourceType);
  };
  const handleDelete = async (detailResourceTypeId: string) => {
    await resourceBrandApiService.delete(detailResourceTypeId);
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
        <DetailResourceTypeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          detailResourceType={selectedRow as DetailResourceType}
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
            <DetailResourceTypeCard detailResourceType={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch}>
              <ImageSwiper id={data.id} refetch={refetchImages} />
            </DetailResourceTypeCard>
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
          items={detailResourceTypes || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default DetailResourceTypeList;
