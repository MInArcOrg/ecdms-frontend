import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import Department from 'src/types/department/department';
import ItemsListing from 'src/views/shared/listing';
import PositionDrawer from './position-drawer';
import positionApiService from 'src/services/department/position-service';
import Position from 'src/types/department/position';
import { positionColumns } from 'src/views/team/departments/view/Positions/position-row-column';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { Container } from '@mui/system';

function PositionTable({ parentDepartment }: { parentDepartment: Department }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Position | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const fetchPositions = (params: GetRequestParam): Promise<IApiResponse<Position[]>> => {
    return positionApiService.getPositionByDepartmentId(parentDepartment.id, params);
  };

  const {
    data: positions,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<Position[]>({
  queryKey: ['positions',parentDepartment?.id],
    fetchFunction: fetchPositions
  });

  const handleDelete = (positionId: string) => {
    // Handle delete logic
  };

  const handleEdit = (position: Position) => {
    setSelectedRow(position);
    toggleDrawer();
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
        <PositionDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          departmentId={parentDepartment?.id}
          position={selectedRow as Position}
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
          tableProps={{ headers: positionColumns(handleEdit, handleDelete, t) }}
          items={positions || []}
          onPaginationChange={handlePageChange}
        />
      </Container>
    </Box>
  );
}

export default PositionTable;
