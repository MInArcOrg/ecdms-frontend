import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import PositionDrawer from './position-drawer';
import positionApiService from 'src/services/department/position-service';
import { useQuery } from '@tanstack/react-query';
import { defaultGetRequestParam } from 'src/types/requests';
import { Pagination } from 'src/types/requests/pagination';
import Position from 'src/types/department/position';
import { positionColumns } from 'src/views/team/departments/view/Positions/position-row-column';

function PositionTable({ parentDepartment }: { parentDepartment: Department }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, pageSize: 10 });
  const [selectedRow, setSelectedRow] = useState<Position | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const {
    data: positions,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['positions', parentDepartment.id],
    queryFn: () =>
      positionApiService.getPositionByDepartmentId(parentDepartment.id, { ...defaultGetRequestParam, ...queryParams }).then((response) => {
        setPagination(response._attributes.pagination);
        return response.payload;
      }),
  });

  const handleDelete = (positionId: string) => {
    // Handle delete logic
  };

  const handleEdit = (position: Position) => {
    setSelectedRow(position);
    toggleDrawer();
  };

  const fetchUsers = () => {
    refetch();
  };

  useEffect(() => {
    if (showDrawer && !selectedRow) {
      setSelectedRow(null);
    }
  }, [showDrawer]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end',
      }}
    >
      {showDrawer && (
        <PositionDrawer
          show={showDrawer}
          toggleDrawer={toggleDrawer}
          department_id={parentDepartment?.id}
          editableData={selectedRow}
          title={'Positions'}
          refetch={refetch}
        />
      )}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={toggleDrawer}
        fetchDataFunction={fetchUsers}
        tableProps={{ headers: positionColumns(handleEdit, handleDelete, t) }}
        items={positions}
      />
    </Box>
  );
}

export default PositionTable;
