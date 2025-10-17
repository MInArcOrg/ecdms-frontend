import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CustomChip from 'src/@core/components/mui/chip';

// import CentersDrawer from 'src/views/components/centers/CentersDrawer'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const createData = (title: any, description: any, role: any, Action: any) => {
  return { title, description, role, Action };
};

const rows = [
  createData('Frozen yoghurt', 159, 'admin', 24),
  createData('Ice cream sandwich', 237, 'notadmin', 37),
  createData('Eclair', 262, 'admin', 24),
  createData('Cupcake', 305, 'superadmin', 67)
];
function Document() {
  // const [selectedRow, setSelectedRow] = useState(undefined);
  // const [showDrawer, setShowDrawer] = useState(false);

  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'end'
      }}
    >
      <Icon
        // sx={{ alignSelf: 'end' }}
        fontSize="1.45rem"
        icon="tabler:plus"
        cursor="pointer"
        onClick={() => {
          // setShowDrawer(true);
        }}
      />
      {/* <CentersDrawer
        show={showDrawer}
        toggleDrawer={() => setShowDrawer(!showDrawer)}
        data={selectedRow}
        handleFormSubmit={() => {}}
        title={'Document'}
      /> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 50 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('Name')}</TableCell>
              <TableCell align="right">{t('Description')}</TableCell>
              <TableCell align="center">{t('Status')}</TableCell>
              <TableCell align="right">{t('Action')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.title}
                sx={{
                  '&:last-of-type td, &:last-of-type th': {
                    border: 0
                  }
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography
                    href={`/centers/subDepartements/${row.description}`}
                    component={Link}
                    sx={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'primary.main'
                    }}
                  >
                    {row.title}
                  </Typography>
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">
                  <Box display="flex" alignItems="end" justifyContent="end">
                    <CustomChip
                      rounded
                      size="small"
                      label="Authorized"
                      color="success"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        console.log(row);
                      }}
                    />
                    <Button variant="text" size="small" color="secondary">
                      Task
                    </Button>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Icon
                    fontSize="1.25rem"
                    icon="tabler:edit"
                    cursor="pointer"
                    onClick={() => {
                      // setSelectedRow(row);
                      // setShowDrawer(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Document;
