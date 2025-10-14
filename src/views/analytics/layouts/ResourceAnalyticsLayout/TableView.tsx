// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from "@mui/material";

interface Year {
  id: string | number;
  name: string;
}

interface Region {
  id: string | number;
  name: string;
}

interface TableViewProps {
  years: Year[];
  baseYear: number;
  regions: Region[];
  data?: any[];
}

const TableView = ({ years, baseYear, regions, data = [] }: TableViewProps) => {
  // Columns
  const columns = [
    { id: "label", label: "Region", minWidth: 170 },
    ...years.map((year) => ({
      id: year.id,
      label: year.name,
      minWidth: 100,
    })),
  ];

  function createData(label: string, values: number[]) {
    // Normalize each value as % of base year value
    const normalized = values.map((v, i) =>
      Number((v / values[baseYear]) * 100).toFixed(0)
    );
    return { label, ...normalized };
  }

  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Build table rows dynamically
  useEffect(() => {
    if (regions?.length > 0) {
      const mockValues = [100, 120, 140, 150, 155, 160, 170, 175, 180, 185];
      const newRows = regions.map((region) =>
        createData(region.name, mockValues)
      );
      setRows(newRows);
    }
  }, [regions, baseYear]);

  const displayRows = rows.length > 0 ? rows : data;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="regional-growth-table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  sx={{ minWidth: column.minWidth, fontWeight: 600 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align="left">
                        {value !== undefined ? value : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={displayRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableView;
