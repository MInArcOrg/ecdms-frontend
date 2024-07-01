import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePermission from 'src/hooks/admin/permission-hook';
import Permission from 'src/types/admin/role/permission';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import PermissionDrawer from 'src/views/admin/permissions/permission-drawer';
import { permissionColumns } from 'src/views/admin/permissions/permission-row-column';

import ItemsListing from 'src/views/shared/listing';

const PermissionList = ({}) => {
  const [permissionDrawerOpen, setAddPermissionOpen] = useState<boolean>(false);
  const [editablePermission, setEditablePermission] = useState<Permission>();
  const handleEdit = (permission: Permission) => {
    togglePermissionDrawer();
    setEditablePermission(permission);
  };
  // Access the hook methods and state
  const { pagination, allPermissions, isLoading, fetchPermissions, deletePermission } = usePermission() as ReturnType<typeof usePermission>;

  const togglePermissionDrawer = () => {
    setEditablePermission({} as Permission);
    setAddPermissionOpen(!permissionDrawerOpen);
  };
  function handleDelete(id: string): void {
    deletePermission(id);
  }

  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        fetchDataFunction={fetchPermissions}
        tableProps={{ headers: permissionColumns(handleEdit, handleDelete) }}
        items={allPermissions}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: togglePermissionDrawer,
          onlyIcon: true,
          permission: { action: 'create', subject: 'permission' }
        }}
      />

      {permissionDrawerOpen && (
        <PermissionDrawer
          refetch={fetchPermissions}
          open={permissionDrawerOpen}
          toggle={togglePermissionDrawer}
          permission={editablePermission as Permission}
        />
      )}
    </>
  );
};
export default PermissionList;
