import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Icon } from '@iconify/react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'

import { useState } from 'react'
import Drawer from './SubdepartmentDrawer'
import Link from 'next/link'
import { getSubdepartments } from 'src/services/department/department-service'
import ModelAction from '../../custom/model-actions'
import Can from 'src/layouts/components/acl/Can'
import { useTranslation } from 'react-i18next'

function SubDepartementTable({ parentDepartment }) {
  const [{ data: rows, loading, error }, refetch] = getSubdepartments(parentDepartment?.id)
  const [selectedRow, setSelectedRow] = useState(undefined)
  const [showDrawer, setShowDrawer] = useState(false)
  const { t } = useTranslation()

  const toggleDrawer = row => {
    setSelectedRow(row)
    setShowDrawer(!showDrawer)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}
    >
      {' '}
      <Can do='create_department' on='department'>
        <Icon
          sx={{ alignSelf: 'end' }}
          fontSize='1.45rem'
          icon='tabler:plus'
          cursor='pointer'
          onClick={() => {
            setShowDrawer(true)
          }}
        />
      </Can>
      {showDrawer ? (
        <Drawer
          refetch={refetch}
          show={showDrawer}
          toggleDrawer={toggleDrawer}
          editableData={selectedRow}
          parent_department_id={parentDepartment?.id}
          title={'Department'}
          setEditableData={setSelectedRow}
        />
      ) : null}
      {loading ? (
        <Grid container justifyContent='center'>
          <CircularProgress />
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 50 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>{t('Name')}</TableCell>
                <TableCell align='right'>{t('Description')}</TableCell>
                <TableCell align='center'>{t('Status')}</TableCell>
                {/* <TableCell align='right'>{t('Action')}</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map(row => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-of-type td, &:last-of-type th': {
                      border: 0
                    }
                  }}
                >
                  <TableCell component='th' scope='row'>
                    <Typography
                      href={`/departments/sub-departements/${row.id}`}
                      component={Link}
                      sx={{
                        textDecoration: 'none',
                        display: 'block',
                        color: 'primary.main'
                      }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell align='right'>{row.description}</TableCell>
                  <TableCell align='right'>
                    <Box display='flex' alignItems='end' justifyContent='end'>
                      <ModelAction
                        model='department'
                        model_id={row?.id}
                        title={t('Sub departemnts')}
                        refetchModel={refetch}
                        handleEdit={() => {
                          toggleDrawer(row)
                        }}
                        editPermission={{
                          action: 'create_department',
                          subject: 'department'
                        }}
                      />
                    </Box>
                  </TableCell>
                  {/* <TableCell align='right'>
                    <Can do='create_department' on='department'>
                      <Icon
                        fontSize='1.25rem'
                        icon='tabler:edit'
                        cursor='pointer'
                        onClick={() => {
                          toggleDrawer(row)
                        }}
                      />
                    </Can>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  )
}

export default SubDepartementTable
