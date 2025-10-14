import {
  Autocomplete,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useAuth } from 'src/hooks/useAuth'
import departmentApiService from 'src/services/department/department-service'

function EVAPerformanceTable({ title }: { title: string }) {
  const { user } = useAuth()

  // Fetch departments (used as labels)
  const { data: labels } = useQuery({
    queryKey: ['departments', user?.id],
    queryFn: () =>
      departmentApiService.getAll({
        filter: { parent_department_id: user?.department_id }
      }),
    enabled: !!user?.id
  })
  const years = ['2021', '2020', '2019', '2018']
  const [year, setYear] = useState(years[0])
  const [region, setRegion] = useState(labels?.payload ? labels.payload[0] : null)

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>{title}</TableCell>
            <TableCell>
              Year
              {/* {years && years.length > 0 ? ( */}
              <Autocomplete
                disableClearable
                size='small'
                options={years ? years : []}
                getOptionLabel={option => option}
                // isOptionEqualToValue={option => option === option}
                renderInput={params => <TextField {...params} variant='outlined' />}
                sx={{ width: 100 }}
                value={year}
                onChange={(e, value) => {
                  setYear(value)
                }}
              />
              {/* ) : (
                <Typography variant='subtitle2'>No Data</Typography>
              )} */}
            </TableCell>
            <TableCell colSpan={2}>
              Region
              {/* {regions && regions.length > 0 ? ( */}
              <Autocomplete
                disableClearable
                size='small'
                options={labels ? labels.payload : []}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} variant='outlined' />}
                sx={{ width: 150 }}
                value={region as any}
                onChange={(e, value) => {
                  setRegion(value)
                }}
              />
              {/* ) : (
                <Typography variant='subtitle2'>No Data</Typography>
              )} */}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>SPI</TableCell>
            <TableCell>CPI</TableCell>
            <TableCell>SV</TableCell>
            <TableCell>CV</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              backgroundColor: theme => theme.palette.customColors.trackBg
            }}
          >
            <TableCell>2022</TableCell>
            <TableCell>24</TableCell>
            <TableCell>567</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q1</TableCell>
            <TableCell>24</TableCell>
            <TableCell>24</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q2</TableCell>
            <TableCell>344</TableCell>
            <TableCell>344</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q3</TableCell>
            <TableCell>50</TableCell>
            <TableCell>15</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q4</TableCell>
            <TableCell>567</TableCell>
            <TableCell>13</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

export default EVAPerformanceTable
