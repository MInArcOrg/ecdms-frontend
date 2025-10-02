import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import userApiService from "src/services/admin/user-service";
import User from "src/types/admin/user";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import UserCard from "src/views/admin/user/list/user-card";
import UserDrawer from "src/views/admin/user/list/user-drawer";
import { userColumns } from "src/views/admin/user/list/user-row-column";
import ItemsListing from "src/views/shared/listing";

const UserList = ({}) => {
  const [userDrawerOpen, setAddUserOpen] = useState<boolean>(false);
  const [editableUser, setEditableUser] = useState<User>();

  const { t } = useTranslation();
  // Access the hook methods and state
  const fetchUsers = (
    params: GetRequestParam,
  ): Promise<IApiResponse<User[]>> => {
    return userApiService.getAll(params);
  };

  const {
    data: users,
    isLoading,
    pagination,
    refetch,
  } = usePaginatedFetch<User[]>({
    queryKey: ["system-users"],
    fetchFunction: fetchUsers,
  });
  const toggleUserDrawer = () => {
    setEditableUser({} as User);
    setAddUserOpen(!userDrawerOpen);
  };
  async function handleDelete(id: string): Promise<void> {
    await userApiService.delete(id);
    refetch();
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
        tableProps={{
          headers: userColumns(handleEdit, handleDelete, t, refetch),
        }}
        ItemViewComponent={({ data }) => (
          <UserCard
            user={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            t={t}
            refetch={refetch}
          />
        )}
        items={users || []}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleUserDrawer,
          onlyIcon: false,
          permission: { action: "create", subject: "user" },
        }}
      />

      {userDrawerOpen && (
        <UserDrawer
          refetch={refetch}
          open={userDrawerOpen}
          toggle={toggleUserDrawer}
          user={editableUser as User}
          departmentId={""}
        />
      )}
    </>
  );
};
UserList.authGuard = true;
export default UserList;
