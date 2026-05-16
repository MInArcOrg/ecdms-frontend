import { Box, Card } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel, GridRowId, GridSortModel } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { Pagination } from 'src/types/requests/pagination';

// Make T a generic type parameter
interface TableListingProps<T> {
  columns: GridColDef[];
  items: T[]; // Use T[] for items
  pagination: Pagination;
  isLoading: boolean;
  onPagination?: (pageSize: number, page: number) => void;
  onSort?: (sortModel: GridSortModel) => void;
}

const TableListing = <T,>({ columns, items, pagination, onPagination, onSort, isLoading }: TableListingProps<T>) => {
  const [, setSelectedRows] = useState<GridRowId[]>([]);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: pagination?.page - 1,
    pageSize: pagination?.pageSize
  });

  const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
    setPaginationModel(newPaginationModel); // Update model unconditionally
    onPagination && onPagination(newPaginationModel.pageSize, newPaginationModel.page + 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Card>
        <DataGrid
          rows={items} // Use items from state
          pageSizeOptions={[5, 10, 25]}
          autoHeight
          pagination
          rowHeight={62}
          rowCount={pagination?.total}
          columns={columns}
          sortingMode="server"
          onSortModelChange={(model) => onSort && onSort(model)}
          paginationMode="server"
          disableRowSelectionOnClick
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          onRowSelectionModelChange={(rows) => setSelectedRows(rows)}
          loading={isLoading}
        />
      </Card>
    </Box>
  );
};

export default TableListing;
