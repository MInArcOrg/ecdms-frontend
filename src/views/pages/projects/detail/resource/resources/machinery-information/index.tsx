import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { MachineryInformation } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import MachineryInformationDrawer from './machinery-information-drawer';
import { machineryInformationColumns } from './machinery-information-row';

const MachineryInformationList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MachineryInformation | null>(null);

  const fetchMachineryInformations = (params: GetRequestParam): Promise<IApiResponse<MachineryInformation[]>> => {
    return machineryInformationApiService.getAll({
      ...params,
      filter: { ...params.filter, parent: projectId }
    });
  };

  const {
    data: machineryInformations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MachineryInformation[]>({
    queryKey: ['machinery-informations', projectId],
    fetchFunction: fetchMachineryInformations
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setShowDrawer(true);
  };

  const handleEdit = (item: MachineryInformation) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await machineryInformationApiService.delete(id);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <MachineryInformationDrawer
          projectId={projectId}
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          machineryInformation={selectedRow}
        />
      )}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.machinery')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: machineryInformationColumns(handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'resource'
          }
        }}
        fetchDataFunction={refetch}
        items={machineryInformations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MachineryInformationList;
