import { Icon } from '@iconify/react';
import { CircularProgress, Typography, IconButton, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import FileDetail from './file-detail';
import { useTranslation } from 'react-i18next';
import { getFilesByModel } from 'src/services/utils/file-utils';
import { useQuery } from '@tanstack/react-query';

function FileDrawer({ id, type, onRefetch }: { id: string; type: string; onRefetch?: (refetch: () => void) => void }) {
  const [show, setShow] = useState(false);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['model-file', id, type],
    queryFn: () => getFilesByModel({ filter: { type, reference_id: id } })
  });
  const { t } = useTranslation();

  // If `onRefetch` prop is provided, pass the refetch function to the parent component
  if (onRefetch) {
    onRefetch(refetch);
  }

  return (
    <Fragment>
      {data?.payload && data?.payload?.length > 0 && (
        <FileDetail show={show} toggleDrawer={() => setShow(!show)} data={data?.payload} refetch={refetch} dataLoading={isLoading} />
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
          <Icon icon="mdi:file-document-outline" fontSize="1.2rem" />
          {data?.payload?.length || 0} {t('Files')}
          <Tooltip title={t('Refresh Files')}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                refetch();
              }}
              disabled={isFetching}
            >
              <Icon icon="mdi:refresh" />
            </IconButton>
          </Tooltip>
        </Typography>
      )}
    </Fragment>
  );
}

export default FileDrawer;
