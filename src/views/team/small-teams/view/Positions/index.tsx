import { useState } from 'react';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePosition from 'src/hooks/team/position-hook';
import { defaultGetRequestParam } from 'src/types/requests';
import Position from 'src/types/team/position';

import ItemsListing from 'src/views/shared/listing';
import { positionColumns } from './position-row-column';
import PositionDrawer from './add/position-drawer';
import Department from 'src/types/team/department';

const PositionList = ({ department }: { department: Department }) => {
  const [positionsDrawerOpen, setAddPositionOpen] = useState<boolean>(false);
  const [editablePosition, setEditablePosition] = useState<Position>();
  const handleEdit = (positions: Position) => {
    togglePositionDrawer();
    setEditablePosition(positions);
  };
  // Access the hook methods and state
  const { pagination, allPositions, isLoading, addNewPosition, fetchPositions, deletePosition } = usePosition(
    defaultGetRequestParam,
    department.id
  ) as ReturnType<typeof usePosition>;

  const togglePositionDrawer = () => {
    setEditablePosition({} as Position);
    setAddPositionOpen(!positionsDrawerOpen);
  };
  function handleDelete(id: string): void {
    deletePosition(id);
  }

  return (
    <>
      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        onCreateClick={togglePositionDrawer}
        fetchDataFunction={fetchPositions}
        tableProps={{ headers: positionColumns(handleEdit, handleDelete) }}
        items={allPositions}
      />

      {positionsDrawerOpen && (
        <PositionDrawer
          departmentId={department.id}
          refetch={fetchPositions}
          addNewPosition={addNewPosition}
          open={positionsDrawerOpen}
          toggle={togglePositionDrawer}
          position={editablePosition as Position}
        />
      )}
    </>
  );
};
export default PositionList;
