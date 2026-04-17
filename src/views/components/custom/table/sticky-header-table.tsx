// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
};

type SalaryRow = {
  region: string;
  totalPublc: number;
  totalPrivate: number;
  malePblic: number;
  femalePublic: number;
  malePrivate: number;
  femalePrivate: number;
  totalAverage: number;
};

type SalaryColumnId = Exclude<keyof SalaryRow, 'totalAverage'>;
type SalaryColumn = {
  id: SalaryColumnId;
  label: string;
  minWidth: number;
  align?: 'left' | 'right' | 'center';
  format?: (value: number) => string | number;
};

const StickyHeaderTable = ({
  years,
  baseYear,
  regions,
  rowsOverride,
  seedKey
}: {
  years: any;
  baseYear: any;
  regions: any;
  rowsOverride?: SalaryRow[];
  seedKey?: string;
}) => {
  const columns: SalaryColumn[] = [
    { id: 'region', label: 'Region', minWidth: 170 },
    { id: 'totalPublc', label: 'Total Public Sector', minWidth: 100 },
    { id: 'totalPrivate', label: 'Total Private Sector', minWidth: 100 },
    { id: 'malePblic', label: 'Male Public Sector', minWidth: 100 },
    { id: 'femalePublic', label: 'Female Public Sector', minWidth: 100 },
    { id: 'malePrivate', label: 'Male Private Sector', minWidth: 100 },
    { id: 'femalePrivate', label: 'Female Private Sector', minWidth: 100 }
  ];
  function createData(region: string, rest: any[]) {
    return {
      region,
      totalPublc: rest[0],
      totalPrivate: rest[1],
      malePblic: rest[2],
      femalePublic: rest[3],
      malePrivate: rest[4],
      femalePrivate: rest[5]
    };
  }

  const data = [
    createData('0-2', [100, 200, 150, 200, 150, 140, 130, 120, 130, 140]),
    createData('2-5', [100, 100, 150, 210, 210, 150, 170, 120, 130, 140]),
    createData('5-10', [100, 250, 130, 180, 230, 180, 230, 120, 130, 140]),
    createData('10-12', [100, 150, 150, 130, 140, 230, 140, 120, 130, 140]),
    createData('above 12', [100, 210, 160, 250, 100, 160, 100, 120, 130, 140])
  ];

  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<SalaryRow[]>([]);

  useEffect(() => {
    if (rowsOverride?.length) {
      setRows(rowsOverride);
      return;
    }
    if (regions?.length > 0) {
      const baseSeed = hashString(`${seedKey || 'salary'}:${String(baseYear ?? '')}`);
      const nextRows = regions.map((region: any, index: number) => {
        const regionName = String(region.name ?? region.title ?? region.label ?? `Region ${index + 1}`);
        const rand = mulberry32(hashString(`${baseSeed}:${regionName}:${index}`));

        const totalPublc = 8000 + Math.floor(rand() * 17000);
        const totalPrivate = 7000 + Math.floor(rand() * 20000);
        const malePblic = Math.round(totalPublc * (0.55 + rand() * 0.15));
        const femalePublic = Math.max(0, totalPublc - malePblic);
        const malePrivate = Math.round(totalPrivate * (0.6 + rand() * 0.18));
        const femalePrivate = Math.max(0, totalPrivate - malePrivate);
        const totalAverage = Math.round((totalPublc + totalPrivate) / 2);

        return {
          region: regionName,
          totalPublc,
          totalPrivate,
          malePblic,
          femalePublic,
          malePrivate,
          femalePrivate,
          totalAverage
        };
      });
      setRows(nextRows);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regions, baseYear, rowsOverride, seedKey]);

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Total Average</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>{row.totalAverage}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StickyHeaderTable;
