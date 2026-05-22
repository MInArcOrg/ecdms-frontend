import { Icon } from '@iconify/react';
import { Box, CardContent, Drawer, IconButton, TableContainer, Typography, Paper, Table, TableHead, TableRow, TableBody, TableCell, Backdrop, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getDynamicDate } from '../ethio-calendar/ethio-calendar-utils';
import { deletePhoto, getStaticPhoto, useInvalidateFileQueries } from 'src/services/utils/file-utils';
import { ImageModel } from 'src/types/general/file';
import RowOptions from 'src/views/shared/listing/row-options';
import ShowImageDialog from '../image/image-dialog';

interface PhotoDetailProps {
    show: boolean;
    toggleDrawer: () => void;
    data: ImageModel[];
    refetch: () => void;
    dataLoading: boolean;
    modelId?: string;
    type?: string;
}

function PhotoDetail({ show, toggleDrawer, data, refetch, dataLoading, modelId, type }: PhotoDetailProps) {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState<boolean>();
    const [openViewer, setOpenViewer] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const invalidateFileQueries = useInvalidateFileQueries();

    const handleDownload = async (event: React.MouseEvent, row: ImageModel) => {
        event.preventDefault();
        event.stopPropagation();
        setSelectedImage(getStaticPhoto(row.url || ''));
        setOpenViewer(true);
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        await deletePhoto(id);
        refetch();
        if (modelId && type) invalidateFileQueries(modelId, type);
        setLoading(false);
    };

    return (
        <>
            <ShowImageDialog open={openViewer} setOpen={setOpenViewer} image={selectedImage} />
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
                        <Typography variant="h6">{t('Photos')}</Typography>
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
                                        <TableCell>{t('Preview')}</TableCell>
                                        <TableCell>{t('Name')}</TableCell>
                                        <TableCell>{t('Date')}</TableCell>
                                        <TableCell>{t('Action')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data?.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row" style={{ paddingRight: 0 }}>
                                                <Box sx={{ width: 40, height: 40, overflow: 'hidden', borderRadius: 1, cursor: 'pointer' }} onClick={(e) => handleDownload(e, row)}>
                                                    <img src={getStaticPhoto(row.url || '')} alt={row.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                </Box>
                                            </TableCell>
                                            <TableCell>{(row.title || 'Photo').substr(0, 10)}...</TableCell>
                                            <TableCell>{getDynamicDate(i18n, row.created_at).toDateString()}</TableCell>
                                            <TableCell>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <IconButton color="primary" onClick={(e) => handleDownload(e, row)}>
                                                        <Icon icon="tabler:eye" fontSize="1.5rem" />
                                                    </IconButton>
                                                    <RowOptions
                                                        item={row}
                                                        deletePermissionRule={{
                                                            action: 'delete',
                                                            subject: 'file'
                                                        }}
                                                        onDelete={() => handleDelete(row.id?.toString() || '')}
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
        </>
    );
}

export default PhotoDetail;
