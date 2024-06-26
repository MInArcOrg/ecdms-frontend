import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import userHook from 'src/hooks/admin/user-hook';
import User from 'src/types/admin/user';
import UserDrawer from 'src/views/admin/user/list/user-drawer';
import { userColumns } from 'src/views/admin/user/list/user-row-column';
import ItemsListing from 'src/views/shared/listing';
import { useTranslation } from 'react-i18next';
import { defaultCreateActionConfig } from 'src/types/general/listing';

const UserList = ({}) => {
  const [userDrawerOpen, setAddUserOpen] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<User>();

  const { t } = useTranslation();
  // Access the hook methods and state
  const { pagination, allUsers, isLoading, deleteUser, fetchUsers, refetch } = userHook() as ReturnType<typeof userHook>;

  const toggleUserDrawer = () => {
    setEditableUser({} as User);
    console.log('editable user', editableUser);
    setAddUserOpen(!userDrawerOpen);
  };
  function handleDelete(id: string): void {
    deleteUser(id);
  }
  const handleEdit = (user: User) => {
    toggleUserDrawer();
    setEditableUser(user);
  };
  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleUserDrawer}
        fetchDataFunction={fetchUsers}
        tableProps={{ headers: userColumns(handleEdit, handleDelete, t, refetch) }}
        items={allUsers}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleUserDrawer,
          onlyIcon: true,
          permission: { action: 'create', subject: 'user' }
        }}
      />

      {userDrawerOpen && (
        <UserDrawer refetch={fetchUsers} open={userDrawerOpen} toggle={toggleUserDrawer} user={editableUser as User} departmentId={''} />
      )}
    </>
  );
};
UserList.authGuard = true;
export default UserList;
