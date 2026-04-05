'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import machineryInformationApiService from 'src/services/project/machinery-information-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import MachineryInformationCard from './machinery-card';
import MachineryInformationDrawer from './machinery-drawer';
import type { MachineryInformation } from 'src/types/resource/index';
import { machineryInformationColumns } from './machinery-row';
import { useAuth } from 'src/hooks/useAuth';

interface MachineryInformationListProps { }

const MachineryInformationList: React.FC<MachineryInformationListProps> = ({ }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MachineryInformation | null>(null);
  const { t } = useTranslation();
  const { user } = useAuth();

  const fetchMachineryInformations = (params: GetRequestParam): Promise<IApiResponse<MachineryInformation[]>> => {
    return machineryInformationApiService.getAll(params);
  };

  const {
    data: machineryInformations,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MachineryInformation[]>({
    queryKey: ['machinery-informations'],
    fetchFunction: fetchMachineryInformations
  });

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (machineryInformation: MachineryInformation) => {
    setSelectedRow(machineryInformation);
    setShowDrawer(true);
  };

  const handleDelete = async (machineryInformationId: string) => {
    await machineryInformationApiService.delete(machineryInformationId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <MachineryInformationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          refetch={refetch}
          machineryInformation={selectedRow}
          departmentId={user?.department_id || ''}
        />
      )}

      <ItemsListing
        title={t('Machinery')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: machineryInformationColumns(handleEdit, handleDelete, t)
        }}
        ItemViewComponent={({ data }) => (
          <MachineryInformationCard
            machineryInformation={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: () => {
            setSelectedRow(null);
            toggleDrawer();
          },
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
