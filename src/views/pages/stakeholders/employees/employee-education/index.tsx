import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import employeeEducationApiService from 'src/services/stakeholder/employee-education-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import EmployeeEducationCard from './employee-education-card';
import EmployeeEducationDrawer from './employee-education-drawer';
import { EmployeeEducation } from 'src/types/stakeholder/employee-education';
import { employeeEducationColumns } from './employee-education-row';
import { useTranslation } from 'react-i18next';

function EmployeeEducationList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();
  const [selectedRow, setSelectedRow] = useState<EmployeeEducation | null>(null);
  const fetchEmployeeEducations = (params: GetRequestParam): Promise<IApiResponse<EmployeeEducation[]>> => {
    return employeeEducationApiService.getAll({ ...params, filter: { ...params.filter, stakeholder_id: stakeholderId } });
  };

  const {
    data: employeeEducations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<EmployeeEducation[]>({
    queryKey: ['employeeEducations'],
    fetchFunction: fetchEmployeeEducations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as EmployeeEducation);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (employeeEducation: EmployeeEducation) => {
    toggleDrawer();
    setSelectedRow(employeeEducation);
  };
  const handleDelete = async (employeeEducationId: string) => {
    await employeeEducationApiService.delete(employeeEducationId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <EmployeeEducationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          employeeEducation={selectedRow as EmployeeEducation}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.employee-education.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <EmployeeEducationCard employeeEducation={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        tableProps={{ headers: employeeEducationColumns(handleEdit, handleDelete, t, refetch) }}
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
        items={employeeEducations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default EmployeeEducationList;
