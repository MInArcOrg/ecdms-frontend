import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceStudyLevelApiService from 'src/services/resource/resource-study-level-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceStudyLevel } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceStudyLevelCard from './resource-study-level-card';
import ResourceStudyLevelDrawer from './resource-study-level-drawer';

function ResourceStudyLevelList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceStudyLevel | null>(null);

  const { t } = useTranslation();

  const fetchResourceStudyLevels = (params: GetRequestParam): Promise<IApiResponse<ResourceStudyLevel[]>> => {
    return resourceStudyLevelApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceStudyLevels,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceStudyLevel[]>({
    queryKey: ['resourceStudyLevels', resourceId],
    fetchFunction: fetchResourceStudyLevels
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceStudyLevel);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceStudyLevel: ResourceStudyLevel) => {
    toggleDrawer();
    setSelectedRow(resourceStudyLevel);
  };
  const handleDelete = async (resourceStudyLevelId: string) => {
    await resourceStudyLevelApiService.delete(resourceStudyLevelId);
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
        <ResourceStudyLevelDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceStudyLevel={selectedRow as ResourceStudyLevel}
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
            <ResourceStudyLevelCard resourceStudyLevel={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
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
          items={resourceStudyLevels || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceStudyLevelList;
