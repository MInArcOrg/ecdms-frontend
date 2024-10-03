import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import totalEmployeeApiService from 'src/services/stakeholder/total-employee-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import TotalEmployeeCard from './total-employee-card';
import TotalEmployeeDrawer from './total-employee-drawer';
import { TotalEmployee } from 'src/types/stakeholder/total-employee';
import { totalEmployeeColumns } from './total-employee-row';
import { useTranslation } from 'react-i18next';

function TotalEmployeeList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState<TotalEmployee | null>(null);
  const fetchTotalEmployees = (params: GetRequestParam): Promise<IApiResponse<TotalEmployee[]>> => {
    return totalEmployeeApiService.getAll({ ...params, filter: { ...params.filter, stakeholder_id: stakeholderId } });
  };

  const {
    data: totalEmployees,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TotalEmployee[]>({
    queryKey: ['totalEmployees'],
    fetchFunction: fetchTotalEmployees
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TotalEmployee);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (totalEmployee: TotalEmployee) => {
    toggleDrawer();
    setSelectedRow(totalEmployee);
  };
  const handleDelete = async (totalEmployeeId: string) => {
    await totalEmployeeApiService.delete(totalEmployeeId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <TotalEmployeeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          totalEmployee={selectedRow as TotalEmployee}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.total-employee.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TotalEmployeeCard totalEmployee={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        tableProps={{ headers: totalEmployeeColumns(handleEdit, handleDelete, t, refetch) }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'certificate'
          }
        }}
        fetchDataFunction={refetch}
        items={totalEmployees || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default TotalEmployeeList;
