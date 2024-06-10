import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useDepartment from 'src/hooks/team/department-hook';
import { defaultGetRequestParam } from 'src/types/requests';
import Department from 'src/types/department/department';

import ItemsListing from 'src/views/shared/listing';
import DepartmentDrawer from 'src/views/team/departments/add/department-drawer';
import { departmentColumns } from 'src/views/team/departments/department-row-column';

const SubDepartmentList = ({ parentDepartment }: { parentDepartment: Department }) => {
  const [departmentsDrawerOpen, setAddDepartmentOpen] = useState<boolean>(false);
  const [editableDepartment, setEditableDepartment] = useState<Department>();
  const handleEdit = (departments: Department) => {
    toggleDepartmentDrawer();
    setEditableDepartment(departments);
  };
  // Access the hook methods and state
  const { pagination, allDepartments, isLoading, addNewDepartment, fetchDepartments, deleteDepartment } = useDepartment(
    defaultGetRequestParam,
    parentDepartment?.id
  ) as ReturnType<typeof useDepartment>;

  const toggleDepartmentDrawer = () => {
    setEditableDepartment({} as Department);
    setAddDepartmentOpen(!departmentsDrawerOpen);
  };
  function handleDelete(id: string): void {
    deleteDepartment(id);
  }

  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleDepartmentDrawer}
        fetchDataFunction={fetchDepartments}
        tableProps={{ headers: departmentColumns(handleEdit, handleDelete) }}
        items={allDepartments}
        title="sub-departments"
      />

      {departmentsDrawerOpen && (
        <DepartmentDrawer
          parentDepartmentId={parentDepartment.id}
          refetch={fetchDepartments}
          addNewDepartment={addNewDepartment}
          open={departmentsDrawerOpen}
          toggle={toggleDepartmentDrawer}
          department={editableDepartment as Department}
        />
      )}
    </>
  );
};
export default SubDepartmentList;
