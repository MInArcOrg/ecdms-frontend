import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import useRole from 'src/hooks/admin/role-hook';
import Role from 'src/types/admin/role';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import RoleDrawer from 'src/views/admin/roles/role-drawer';
import { roleColumns } from 'src/views/admin/roles/role-row-column';

import ItemsListing from 'src/views/shared/listing';

const RoleList = ({}) => {
  const [roleDrawerOpen, setAddRoleOpen] = useState<boolean>(false);
  const [editableRole, setEditableRole] = useState<Role>();
  const handleEdit = (role: Role) => {
    toggleRoleDrawer();
    setEditableRole(role);
  };
  // Access the hook methods and state
  const { pagination, allRoles, isLoading, fetchRoles, deleteRole } = useRole() as ReturnType<typeof useRole>;

  const toggleRoleDrawer = () => {
    setEditableRole({} as Role);
    setAddRoleOpen(!roleDrawerOpen);
  };
  function handleDelete(id: string): void {
    deleteRole(id);
  }

  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleRoleDrawer}
        fetchDataFunction={fetchRoles}
        tableProps={{ headers: roleColumns(handleEdit, handleDelete) }}
        items={allRoles}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleRoleDrawer,
          onlyIcon: true,
          permission: { action: 'create', subject: 'role' }
        }}
      />

      {roleDrawerOpen && <RoleDrawer refetch={fetchRoles} open={roleDrawerOpen} toggle={toggleRoleDrawer} role={editableRole as Role} />}
    </>
  );
};
export default RoleList;
