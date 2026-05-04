import { Icon } from '@iconify/react';
import {
  Box,
  CardContent,
  Drawer,
  IconButton,
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
import { deleteFile, downloadFileById } from 'src/services/utils/file-utils';
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

  const normalizeExtension = (value: string) => {
    const raw = (value || '').trim();
    if (!raw) return '';

    const lower = raw.toLowerCase();
    if (lower.includes('vnd.openxmlformats-officedocument.spreadsheetml.sheet')) return 'xlsx';
    if (lower.includes('spreadsheetml.sheet')) return 'xlsx';
    if (lower.includes('ms-excel')) return 'xls';
    if (lower.includes('wordprocessingml.document')) return 'docx';
    if (lower === 'application/pdf' || lower.includes('pdf')) return 'pdf';
    if (lower.includes('image/png')) return 'png';
    if (lower.includes('image/jpeg')) return 'jpg';
    if (lower.includes('text/csv') || lower.includes('csv')) return 'csv';
    if (lower.includes('/')) return '';

    return raw.startsWith('.') ? raw.slice(1) : raw;
  };

  const getDownloadFileName = (row: FileModel) => {
    const baseName = (row.title || 'file').trim() || 'file';
    const ext = normalizeExtension(row.extension || '');
    if (!ext) return baseName;

    const lowerBase = baseName.toLowerCase();
    const lowerExt = ext.toLowerCase();
    if (lowerBase.endsWith(`.${lowerExt}`)) return baseName;

    return `${baseName}.${ext}`;
  };

  const handleDownload = async (event: React.MouseEvent, row: FileModel) => {
    event.preventDefault();
    event.stopPropagation();

    const fileName = getDownloadFileName(row);
    try {
      await downloadFileById(row.id, fileName, row.url || '');
    } catch {
      return;
    }
  };

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
                        component="button"
                        onClick={(e) => handleDownload(e, row)}
                        color="primary"
                        variant="body2"
                        sx={{
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          textDecoration: 'none'
                        }}
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
                        <IconButton color="primary" onClick={(e) => handleDownload(e, row)}>
                          <Icon icon="tabler:download" fontSize="1.5rem" />
                        </IconButton>

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
