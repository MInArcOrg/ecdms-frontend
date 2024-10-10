  import { Box,Card } from '@mui/material';
  import { DataGrid, GridColDef, GridPaginationModel, GridRowId } from '@mui/x-data-grid';
  import React, { useState } from 'react';
  import { Pagination } from 'src/types/requests/pagination';

  interface T {
    // Define your item type
  }

  interface TableListingProps {
    columns: GridColDef[];
    items: T[];
    pagination: Pagination;
    isLoading: boolean;
    onPagination?: (pageSize: any, page: any) => void;
  }

  const TableListing: React.FC<TableListingProps> = ({ columns, items, pagination, onPagination, isLoading }) => {
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
