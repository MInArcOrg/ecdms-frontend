import { Icon } from '@iconify/react';
import { CircularProgress, Typography } from '@mui/material';
import { Fragment, useState } from 'react';
import FileDetail from './file-detail';
import { useTranslation } from 'react-i18next';
import { getFilesByModel } from 'src/services/utils/file-service';
import { useQuery } from '@tanstack/react-query';

function FileDrawer({ id, type }: { id: string; type: string }) {
  const [show, setShow] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['model-file', id, type],
    queryFn: () => getFilesByModel(id, { filter: { type } })
  });
  const { t } = useTranslation();

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
          <Icon icon="mdi:file-document-outline" fontSize="1.2rem" /> {data?.payload?.length || 0} {t('Files')}
        </Typography>
      )}
    </Fragment>
  );
}

export default FileDrawer;
