import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import SubDepartment from 'src/types/department/position';
import { positionColumns } from 'src/views/team/departments/view/SubDepartments/position-row-column';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';

function SubDepartmentTable({ parentDepartment }: { parentDepartment: Department }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SubDepartment | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const fetchSubDepartments = (params: GetRequestParam): Promise<IApiResponse<SubDepartment[]>> => {
    return positionApiService.getSubDepartmentByDepartmentId(parentDepartment.id, params);
  };

  const {
    data: positions,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SubDepartment[]>({
    queryKey: 'positions',
    fetchFunction: fetchSubDepartments
  });

  const handleDelete = (positionId: string) => {
    // Handle delete logic
  };

  const handleEdit = (position: SubDepartment) => {
    setSelectedRow(position);
    toggleDrawer();
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
        <SubDepartmentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          departmentId={parentDepartment?.id}
          position={selectedRow as SubDepartment}
          refetch={refetch}
        />
      )}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleDrawer}
        fetchDataFunction={refetch}
        tableProps={{ headers: positionColumns(handleEdit, handleDelete, t) }}
        items={positions || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}

export default SubDepartmentTable;
