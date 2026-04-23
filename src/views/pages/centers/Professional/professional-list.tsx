import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { Container } from '@mui/system';
import User from 'src/types/admin/user';
import { userColumns } from 'src/views/admin/user/list/user-row-column';
import UserDrawer from 'src/views/admin/user/list/user-drawer';
import userApiService from 'src/services/admin/user-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import UserCard from 'src/views/admin/user/list/user-card';

function ProfessionalList({ parentDepartment }: { parentDepartment: Department }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<User | null>(null);
  const { t } = useTranslation();

  const fetchProfessionals = (params: GetRequestParam): Promise<IApiResponse<User[]>> => {
    return userApiService.getProfessionalByDepartmentId(parentDepartment.id, params);
  };

  const {
    data: professionals,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<User[]>({
    queryKey: ['professionals', parentDepartment?.id],
    fetchFunction: fetchProfessionals
  });

  const handleDelete = async (professionalId: string) => {
    await userApiService.delete(professionalId);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as User);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (user: User) => {
    toggleDrawer();
    setSelectedRow(user);
  };
  const hanldeStatusChange = async (user: User, status: string) => {
    await userApiService.handleAccountAction(user.id, status);
    refetch();
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
        <UserDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          departmentId={parentDepartment?.id}
          user={selectedRow as User}
          refetch={refetch}
        />
      )}
      <Container>
        <ItemsListing
          ItemViewComponent={({ data }) => <UserCard user={data} onDelete={handleDelete} onEdit={handleEdit} hanldeStatusChange={hanldeStatusChange} t={t} refetch={refetch} />}
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: { action: 'create', subject: 'user' }
          }}
          title={t('department.expert.title')}
          fetchDataFunction={refetch}
          tableProps={{
            headers: userColumns(handleEdit, handleDelete, t, refetch, true, hanldeStatusChange)
          }}
          items={professionals || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default ProfessionalList;