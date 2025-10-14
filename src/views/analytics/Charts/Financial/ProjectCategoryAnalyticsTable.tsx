import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

function ProjectCategoryAnalyticsTable({ regions }: { regions: any[] }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Total Contract Price</TableCell>
              <TableCell>Main Contract Price</TableCell>
              <TableCell>Supplement</TableCell>
              <TableCell>Variation</TableCell>
              <TableCell>Omission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                backgroundColor: theme => theme.palette.customColors.trackBg
              }}
            >
              <TableCell>Total</TableCell>
              <TableCell>1,000,000 ETB</TableCell>
              <TableCell>1,000,000 ETB</TableCell>
              <TableCell>1,000,000 ETB</TableCell>
              <TableCell>1,000,000 ETB</TableCell>
              <TableCell>1,000,000 ETB</TableCell>
            </TableRow>
            {regions?.map((region, index) => (
              <TableRow key={index}>
                <TableCell>{region.name}</TableCell>
                <TableCell>1,000,000 ETB</TableCell>
                <TableCell>1,000,000 ETB</TableCell>
                <TableCell>1,000,000 ETB</TableCell>
                <TableCell>1,000,000 ETB</TableCell>
                <TableCell>1,000,000 ETB</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ProjectCategoryAnalyticsTable
