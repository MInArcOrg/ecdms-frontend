import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import ItemsListing from 'src/views/shared/listing';
import DataCollectionGuideDrawer from './data-collection-guide-drawer';
import DataCollectionGuide from 'src/types/general/data-collection-guide';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { Container } from '@mui/system';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import DataCollectionGuideCard from './data-collection-guide-card';
import dataCollectionGuideApiService from 'src/services/general/data-collection-guide-service';

function DataCollectionGuideList({ model }: { model: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<DataCollectionGuide | null>(null);
  const { t } = useTranslation();

  const fetchDataCollectionGuides = (params: GetRequestParam): Promise<IApiResponse<DataCollectionGuide[]>> => {
    return dataCollectionGuideApiService.getAll({
      ...params,
      filter: { model }
    });
  };

  const {
    data: dataCollectionGuides,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DataCollectionGuide[]>({
    queryKey: ['data-collection-guides', model],
    fetchFunction: fetchDataCollectionGuides
  });

  const toggleDrawer = () => {
    setSelectedRow({} as DataCollectionGuide);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (dataCollectionGuide: DataCollectionGuide) => {
    toggleDrawer();
    setSelectedRow(dataCollectionGuide);
  };
  const handleDelete = async (dataCollectionGuide: string) => {
    await dataCollectionGuideApiService.delete(dataCollectionGuide);
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
        <DataCollectionGuideDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          dataCollectionGuide={selectedRow as DataCollectionGuide}
          refetch={refetch}
        />
      )}
      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.list.value}
          isLoading={isLoading}
          title={t('data-collection-guide.title')}
          ItemViewComponent={({ data }) => (
            <DataCollectionGuideCard dataCollectionGuide={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: 'create',
              subject: 'data-collection-guide'
            }
          }}
          fetchDataFunction={refetch}
          items={dataCollectionGuides || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default DataCollectionGuideList;
