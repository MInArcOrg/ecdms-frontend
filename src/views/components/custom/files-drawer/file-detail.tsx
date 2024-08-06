import { Icon } from '@iconify/react';
import {
  Box,
  CardContent,
  Drawer,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Backdrop,
  CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDynamicDate } from '../ethio-calendar/ethio-calendar-utils';
import { deleteFile } from 'src/services/utils/file-utils';
import { FileModel } from 'src/types/general/file';
import RowOptions from 'src/views/shared/listing/row-options';

interface FileDetailProps {
  show: boolean;
  toggleDrawer: () => void;
  data: FileModel[];
  refetch: () => void;
  dataLoading: boolean;
}

function FileDetail({ show, toggleDrawer, data, refetch, dataLoading }: FileDetailProps) {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState<boolean>();
  const handleDelete = async (masterSubCategoryId: string) => {
    setLoading(true);
    await deleteFile(String(masterSubCategoryId));
    refetch();
    setLoading(false);
  };

  return (
    <Drawer
      anchor="right"
      open={show}
      sx={{
        '& .MuiDrawer-paper': {
          width: {
            sm: '100%',
            md: '40%',
            lg: '30%'
          },
          boxSizing: 'border-box'
        }
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '1',
            p: 3
          }}
        >
          <Typography variant="h6">{t('Files')}</Typography>
          <Icon icon="tabler:x" fontSize="1.5rem" cursor="pointer" onClick={toggleDrawer} />
          <Backdrop
            open={loading || dataLoading}
            sx={{
              position: 'absolute',
              color: 'primary.main',
              zIndex: (theme) => theme.zIndex.mobileStepper - 1
            }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
        <CardContent>
          <TableContainer component={Paper} sx={{ fontSize: '10px' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t('Name')}</TableCell>
                  <TableCell>{t('Date')}</TableCell>
                  <TableCell>{t('Size')}</TableCell>
                  <TableCell>{t('Action')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" style={{ paddingRight: 0 }}>
                      <Typography
                        component="a"
                        href={`${process.env.NEXT_PUBLIC_API_URL}${row.url}`}
                        target="_blank"
                        color="primary"
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
                      >
                        <Icon icon="mdi:file-document-outline" />
                        <Typography component="span" variant="body2" color="none">
                          {row.title.substr(0, 6)}...
                        </Typography>
                      </Typography>
                    </TableCell>
                    <TableCell>{getDynamicDate(i18n, row.created_at).toDateString()}</TableCell>
                    <TableCell>{row.size}KB</TableCell>
                    <TableCell>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography
                          component="a"
                          color="primary"
                          href={`${process.env.NEXT_PUBLIC_API_URL}${row.url}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Icon icon="tabler:download" fontSize="1.5rem" />
                        </Typography>

                        <RowOptions
                          item={row}
                          deletePermissionRule={{
                            action: 'delete',
                            subject: 'file'
                          }}
                          onDelete={() => handleDelete(row.id)}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Box>
    </Drawer>
  );
}

export default FileDetail;
