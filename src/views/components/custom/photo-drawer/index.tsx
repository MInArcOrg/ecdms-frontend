import { Icon } from '@iconify/react';
import { CircularProgress, Typography, IconButton, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import PhotoDetail from './photo-detail';
import { useTranslation } from 'react-i18next';
import { useGetMultiplePhotos } from 'src/services/utils/file-utils';

function PhotoDrawer({ id, type }: { id: string; type?: string }) {
    const [show, setShow] = useState(false);
    const { data, isLoading, refetch, isFetching } = useGetMultiplePhotos({ filter: { model_id: id, ...(type ? { type } : {}) } }, { enabled: !!id });
    const { t } = useTranslation();

    return (
        <Fragment>
            {data?.payload && data?.payload?.length > 0 && (
                <PhotoDetail show={show} toggleDrawer={() => setShow(!show)} data={data?.payload} refetch={refetch} dataLoading={isLoading} modelId={id} type={type} />
            )}
            {isLoading ? (
                <CircularProgress size={10} />
            ) : (
                <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                    onClick={() => setShow(!show)}
                >
                    <Icon icon="mdi:image-outline" fontSize="1.2rem" />
                    {data?.payload?.length || 0} {t('Photos')}
                    <Tooltip title={t('Refresh Photos')}>
                        <span>
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    refetch();
                                }}
                                disabled={isFetching}
                            >
                                {isFetching ? <CircularProgress size={16} color="inherit" /> : <Icon icon="mdi:refresh" />}
                            </IconButton>
                        </span>
                    </Tooltip>
                </Typography>
            )}
        </Fragment>
    );
}

export default PhotoDrawer;
