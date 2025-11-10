// src/views/analytics/Charts/Financial/ProjectCategoryAnalyticsTable.tsx

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material'

interface ProjectCategoryAnalyticsTableProps {
  regions?: string[]
  series?: { name: string; data: number[] }[]
  loading?: boolean
}

export default function ProjectCategoryAnalyticsTable({
  regions = [],
  series = [],
  loading = false
}: ProjectCategoryAnalyticsTableProps) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    )
  }

  if (!series?.length) {
    return (
      <Box textAlign="center" py={4} color="text.secondary">
        No data available
      </Box>
    )
  }

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Department</TableCell>
            {series.map((s) => (
              <TableCell key={s.name} align="right">
                {s.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {regions.map((region, i) => (
            <TableRow key={region}>
              <TableCell>{region}</TableCell>
              {series.map((s) => (
                <TableCell key={s.name + i} align="right">
                  {s.data[i] ?? 0}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
