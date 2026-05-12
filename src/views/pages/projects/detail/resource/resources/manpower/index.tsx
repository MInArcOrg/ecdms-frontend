import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import professionalApiService from 'src/services/resource/professional-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import type { Professional } from 'src/types/resource';
import ItemsListing from 'src/views/shared/listing';
import ManpowerDrawer from './manpower-drawer';
import { manpowerColumns } from './manpower-row';

const ManpowerList = ({ projectId }: { projectId: string }) => {
  const { t } = useTranslation();
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Professional | null>(null);

  const fetchManpower = (params: GetRequestParam): Promise<IApiResponse<Professional[]>> => {
    return professionalApiService.getAll({
      ...params,
      filter: {
        parent: projectId
      }
    });
  };

  const {
    data: manpower,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Professional[]>({
    queryKey: ['manpower'],
    fetchFunction: fetchManpower
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setShowDrawer(true);
  };

  const handleEdit = (item: Professional) => {
    setSelectedRow(item);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await professionalApiService.delete(id);
    refetch();
  };

  return (
    <Box>
      {showDrawer && <ManpowerDrawer projectId={projectId} open={showDrawer} toggle={toggleDrawer} refetch={refetch} manpower={selectedRow} />}

      <ItemsListing
        title={t('project.navigation.submenu.resource.resources.manpower')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        tableProps={{
          headers: manpowerColumns(handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: handleCreate,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'projectmanpower'
          }
        }}
        fetchDataFunction={refetch}
        items={manpower || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default ManpowerList;
