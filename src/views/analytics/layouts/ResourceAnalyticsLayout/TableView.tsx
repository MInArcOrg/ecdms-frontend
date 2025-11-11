// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import {
  Paper,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination
} from '@mui/material';

interface Year {
  id: string | number;
  name: string;
}

interface RegionData {
  label: string;
  data: number[];
}

interface TableViewProps {
  years: Year[]; // Example: [{id: 2024, name: "2024"}, {id: 2025, name: "2025"}]
  baseYear: number; // index of base year
  data: RegionData[]; // from your API {label, data[]}
}

const TableView = ({ years, baseYear, data = [] }: TableViewProps) => {
  // Columns
  const columns = [
    { id: 'label', label: 'Region', minWidth: 170 },
    ...years.map((year) => ({
      id: year.name,
      label: year.name,
      minWidth: 100
    }))
  ];

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

  // Normalize values based on baseYear (percentage)
  const normalizeValues = (values: number[]) => {
    const baseValue = values[baseYear];
    if (!baseValue || baseValue === 0) return values.map(() => 0);
    return values.map((v) => Number(((v / baseValue) * 100).toFixed(1)));
  };

  // Build table rows dynamically
  useEffect(() => {
    if (data?.length > 0) {
      const newRows = data.map((item) => {
        const normalized = normalizeValues(item.data);
        // Map each year to its corresponding normalized value
        const yearData = years.reduce((acc, year, index) => {
          acc[year.name] = normalized[index] ?? '-';
          return acc;
        }, {} as Record<string, number | string>);

        return {
          label: item.label,
          ...yearData
        };
      });
      setRows(newRows);
    } else {
      setRows([]);
    }
  }, [data, years, baseYear]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="resource-analytics-table">
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: number) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {row[column.id] !== undefined ? row[column.id] : '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableView;
