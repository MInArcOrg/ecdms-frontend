// components/UserList.tsx
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';

import userApiService from 'src/services/admin/user-service';
import userService from 'src/services/general/project/soil-type-master-service';
import User from 'src/types/admin/user';
import UserDrawer from 'src/views/admin/user/list/user-drawer';
import { userColumns } from 'src/views/admin/user/list/user-row-column';

const UserList = () => {
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const { t } = useTranslation();
  const fetchUser = (params: GetRequestParam): Promise<IApiResponse<User[]>> => {
    return userApiService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: users,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<User[]>({
    queryKey: ['users'],
    fetchFunction: fetchUser
  });
  const handleDelete = async (id: string) => {
    await userService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as User);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: User) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  const hanldeStatusChange = async (user: User, status: string) => {
    await userApiService.handleAccountAction(user.id, status);
    refetch();
  };
  return (
    <Fragment>
      {showDrawer && <UserDrawer departmentId='' open={showDrawer} toggle={toggleDrawer} user={selectedRow as User} refetch={refetch} />}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        title={t(`department.user.title`)}
        isLoading={isLoading}
        tableProps={{
          headers: userColumns(handleEdit, handleDelete, t, refetch, false, hanldeStatusChange)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: `user`
          }
        }}
        fetchDataFunction={refetch}
        items={users || []}
        onPaginationChange={handlePageChange}
      />
    </Fragment>
  );
};
UserList.acl = {
  subject: 'user',
  action: 'view'
}

export default UserList;
