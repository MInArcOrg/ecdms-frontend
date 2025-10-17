// components/RoleList.tsx
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';

import roleApiService from 'src/services/admin/role-service';
import roleService from 'src/services/general/project/soil-type-master-service';
import Role from 'src/types/admin/role';
import RoleDrawer from 'src/views/admin/roles/role-drawer';
import { roleColumns } from 'src/views/admin/roles/role-row-column';

const RoleList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<Role | null>(null);
  const { t } = useTranslation();
  const fetchRole = (params: GetRequestParam): Promise<IApiResponse<Role[]>> => {
    return roleApiService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: roles,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Role[]>({
    queryKey: ['roles'],
    fetchFunction: fetchRole
  });
  const handleDelete = async (id: string) => {
    await roleService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as Role);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: Role) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && <RoleDrawer open={showDrawer} toggle={toggleDrawer} role={selectedRow as Role} refetch={refetch} />}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        title={t(`admin.role.roles`)}
        isLoading={isLoading}
        tableProps={{
          headers: roleColumns(handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: `role`
          }
        }}
        fetchDataFunction={refetch}
        items={roles || []}
        onPaginationChange={handlePageChange}
      />
    </Fragment>
  );
};

export default RoleList;
