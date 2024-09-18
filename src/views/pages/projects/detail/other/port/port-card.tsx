import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { Port } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface PortCardProps {
  port: Port;
  refetch: () => void;
  onEdit: (port: Port) => void;
  onDelete: (id: string) => void;
  onDetail: (port: Port) => void;
}

const PortCard: React.FC<PortCardProps> = ({ port, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(port)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {port?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.port.details.operator')}: {port?.operator || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.port.details.port-type')}: {port?.port_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.port.details.site-area')}: {port?.site_area ? `${port?.site_area} sqm` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.port.details.annual-traffic-size')}: {port?.annual_traffic_size ? `${port?.annual_traffic_size} tons` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {port?.created_at ? formatCreatedAt(port?.created_at) : 'N/A'}{' '}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={port.id} type={uploadableProjectFileTypes.other.port} />
        <ModelAction
          model="Port"
          model_id={port.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title={''}
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(port)}
          onDelete={() => onDelete(port.id)}
          item={port}
          deletePermissionRule={{
            action: 'delete',
            subject: 'port'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'port'
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default PortCard;
