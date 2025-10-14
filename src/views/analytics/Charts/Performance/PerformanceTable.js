import {
  Autocomplete,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'

function PerformanceTable({ years, year, setYear, title, regions, setRegion, region }) {
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
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
                options={regions ? regions : []}
                getOptionLabel={option => option.name}
                renderInput={params => <TextField {...params} variant='outlined' />}
                sx={{ width: 150 }}
                value={region}
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
            <TableCell>Plan</TableCell>
            <TableCell>Actual</TableCell>
            <TableCell>%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              backgroundColor: theme => theme.palette.customColors.trackBg
            }}
          >
            <TableCell>2022</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q1</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q2</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q3</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Q4</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>24,344,567,000</TableCell>
            <TableCell>20</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}

export default PerformanceTable
