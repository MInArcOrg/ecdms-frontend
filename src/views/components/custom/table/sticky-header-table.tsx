// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const StickyHeaderTable = ({ years, baseYear, regions }: {
    years: any,
    baseYear: any,
    regions: any
}) => {
    const columns = [
        { id: 'region', label: 'Region', minWidth: 170 },
        { id: 'totalPublc', label: 'Total Public Sector', minWidth: 100 },
        { id: 'totalPrivate', label: 'Total Private Sector', minWidth: 100 },
        { id: 'malePblic', label: 'Male Public Sector', minWidth: 100 },
        { id: 'femalePublic', label: 'Female Public Sector', minWidth: 100 },
        { id: 'malePrivate', label: 'Male Private Sector', minWidth: 100 },
        { id: 'femalePrivate', label: 'Female Private Sector', minWidth: 100 }
    ]
    function createData(region: string, rest: any[]) {
        return {
            region,
            totalPublc: rest[0],
            totalPrivate: rest[1],
            malePblic: rest[2],
            femalePublic: rest[3],
            malePrivate: rest[4],
            femalePrivate: rest[5]
        }
    }

    const data = [
        createData('0-2', [100, 200, 150, 200, 150, 140, 130, 120, 130, 140]),
        createData('2-5', [100, 100, 150, 210, 210, 150, 170, 120, 130, 140]),
        createData('5-10', [100, 250, 130, 180, 230, 180, 230, 120, 130, 140]),
        createData('10-12', [100, 150, 150, 130, 140, 230, 140, 120, 130, 140]),
        createData('above 12', [100, 210, 160, 250, 100, 160, 100, 120, 130, 140])
    ]

    const getRandomInt = (max: number) => {
        return Math.floor(Math.random() * Math.floor(max))
    }

    // ** States
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [rows, setRows] = useState([])

    useEffect(() => {
        if (regions?.length > 0) {
            setRows(
                regions.map((region: any) => {
                    return createData(region.name, [
                        getRandomInt(150),
                        getRandomInt(200),
                        getRandomInt(250),
                        getRandomInt(110),
                        getRandomInt(190),
                        getRandomInt(250),
                        getRandomInt(250),
                        getRandomInt(250),
                        getRandomInt(270),
                        getRandomInt(250)
                    ])
                })
            )
        }

        return () => { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [regions, baseYear])

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column: any) => (
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
                                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                                    {columns.map((column: any) => {
                                        const value = row[column.id]

                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        )
                                    })}
                                    <TableCell>{rows.map((row: any) => row.totalPublc).reduce((a, b) => a + b, 0)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default StickyHeaderTable
