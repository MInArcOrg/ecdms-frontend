import { Icon } from '@iconify/react';
import { Avatar, Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Can from 'src/layouts/components/acl/Can';
import { getProfessionalByDepartmentId } from 'src/services/department/professional-service';
import ModelAction from '../../custom/model-actions';
import ProfessionalDrawer from './ProfessionalDrawer';

function ProfessionalTable({ parentDepartment }) {
  const [selectedRow, setSelectedRow] = useState(undefined);
  const [showDrawer, setShowDrawer] = useState(false);
  const [{ data: rows, loading, error }, refetch] = getProfessionalByDepartmentId(parentDepartment?.id);

  const toggleDrawer = (row) => {
    setSelectedRow(row);
    setShowDrawer(!showDrawer);
  };

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}
    >
      <Can do="create_professional" on="professional">
        <Icon
          sx={{ alignSelf: 'end' }}
          fontSize="1.45rem"
          icon="tabler:plus"
          cursor="pointer"
          onClick={() => {
            setShowDrawer(true);
          }}
        />
      </Can>
      {showDrawer ? (
        <ProfessionalDrawer
          show={showDrawer}
          department_id={parentDepartment?.id}
          editableData={selectedRow}
          toggleDrawer={toggleDrawer}
          setEditableData={setSelectedRow}
          handleFormSubmit={() => {}}
          title={'Professional'}
          refetch={refetch}
        />
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Full Name')}</TableCell>
              <TableCell align="right">{t('Phone')}</TableCell>
              <TableCell align="right">{t('Status')}</TableCell>
              {/* <TableCell align='right'>{t('Action')}</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    href={`/users/${row.id}`}
                    component={Link}
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'primary.main'
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={3}>
                      <Avatar sx={{ backgroundColor: 'primary.light', color: '#fff', padding: '16px' }}>{row.full_name[0]}</Avatar>
                      {row.full_name}
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="end" justifyContent="end">
                    <ModelAction
                      model="user"
                      model_id={row?.id}
                      title={t('Professional')}
                      refetchModel={refetch}
                      handleEdit={() => {
                        toggleDrawer(row);
                      }}
                      editPermission={{
                        action: 'register_professional',
                        subject: 'professional'
                      }}
                    />
                  </Box>
                </TableCell>
                {/* <TableCell align='right'>
                  <Can do='register_professional' on='professional'>
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
    </Box>
  );
}

export default ProfessionalTable;
