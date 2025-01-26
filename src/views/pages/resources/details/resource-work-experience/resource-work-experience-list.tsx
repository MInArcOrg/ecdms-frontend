import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@mui/system';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import resourceWorkExperienceApiService from 'src/services/resource/resource-work-experience-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { ResourceWorkExperience } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ResourceWorkExperienceCard from './resource-work-experience-card';
import ResourceWorkExperienceDrawer from './resource-work-experience-drawer';

function ResourceWorkExperienceList({ resourceId }: { resourceId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ResourceWorkExperience | null>(null);

  const { t } = useTranslation();

  const fetchResourceWorkExperiences = (params: GetRequestParam): Promise<IApiResponse<ResourceWorkExperience[]>> => {
    return resourceWorkExperienceApiService.getAll({
      ...params,
      filter: {
        resource_id: resourceId
      }
    });
  };

  const {
    data: resourceWorkExperiences,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ResourceWorkExperience[]>({
    queryKey: ['resourceWorkExperiences', resourceId],
    fetchFunction: fetchResourceWorkExperiences
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ResourceWorkExperience);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resourceWorkExperience: ResourceWorkExperience) => {
    toggleDrawer();
    setSelectedRow(resourceWorkExperience);
  };
  const handleDelete = async (resourceWorkExperienceId: string) => {
    await resourceWorkExperienceApiService.delete(resourceWorkExperienceId);
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
        <ResourceWorkExperienceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          resourceId={resourceId}
          resourceWorkExperience={selectedRow as ResourceWorkExperience}
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
            <ResourceWorkExperienceCard resourceWorkExperience={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
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
          items={resourceWorkExperiences || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ResourceWorkExperienceList;
