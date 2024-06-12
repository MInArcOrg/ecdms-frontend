import { Container } from '@mui/material';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import departmentApiService from 'src/services/department/department-service';
import Department from 'src/types/department/department';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import SubDepartmentDrawer from './sub-department-drawer';
import { subDepartmentColumns } from './sub-department-row';

function SubDepartmentList({ parentDepartment }: { parentDepartment: Department }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Department | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setSelectedRow({} as Department);
    setShowDrawer(!showDrawer);
  };

  const fetchSubDepartments = (params: GetRequestParam): Promise<IApiResponse<Department[]>> => {
    return departmentApiService.getSubDeparmtnetByDepartmentId(parentDepartment.id, params);
  };

  const {
    data: subDepartments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Department[]>({
    queryKey: ['subDepartments', parentDepartment?.id],
    fetchFunction: fetchSubDepartments
  });
  console.log('subDepartments', subDepartments);
  const handleDelete = (subDepartmentId: string) => {
    // Handle delete logic
  };

  const handleEdit = (subDepartment: Department) => {
    setSelectedRow(subDepartment);
    toggleDrawer();
  };

  return (
    <Fragment>
      {showDrawer && (
        <SubDepartmentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          departmentId={parentDepartment?.id}
          subDepartment={selectedRow as Department}
          refetch={refetch}
        />
      )}
      <Container>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          onCreateClick={toggleDrawer}
          fetchDataFunction={refetch}
          tableProps={{ headers: subDepartmentColumns(handleEdit, handleDelete, t,refetch) }}
          items={subDepartments || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Fragment>
  );
}

export default SubDepartmentList;
