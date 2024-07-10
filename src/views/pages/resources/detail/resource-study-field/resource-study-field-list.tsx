import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceStudyFieldApiService from 'src/services/resource/resource-study-field-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceStudyField } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceStudyFieldCard from './resource-study-field-card';
import ResourceStudyFieldDrawer from './resource-study-field-drawer';

function ResourceStudyFieldList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceStudyField | null>(null);

  const { t } = useTranslation();

  const fetchResourceStudyFields = (params: GetRequestParam): Promise<IApiResponse<ResourceStudyField[]>> => {
    return resourceStudyFieldApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceStudyFields,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceStudyField[]>({
    queryKey: ['resourceStudyFields', resourceId],
    fetchFunction: fetchResourceStudyFields
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceStudyField);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceStudyField: ResourceStudyField) => {
    toggleDrawer();
    setSelectedRow(resourceStudyField);
  };
  const handleDelete = async (resourceStudyFieldId: string) => {
    await resourceStudyFieldApiService.delete(resourceStudyFieldId);
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
        <ResourceStudyFieldDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceStudyField={selectedRow as ResourceStudyField}
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
            <ResourceStudyFieldCard resourceStudyField={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
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
          items={resourceStudyFields || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceStudyFieldList;
