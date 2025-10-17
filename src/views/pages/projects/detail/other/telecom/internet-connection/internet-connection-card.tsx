'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography, Grid, Chip } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { InternetConnection } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface InternetConnectionCardProps {
  internetConnection: InternetConnection;
  refetch: () => void;
  onEdit: (internetConnection: InternetConnection) => void;
  onDetail: (internetConnection: InternetConnection) => void;
  internetConnectionTypeMap: Map<string, string>;
}

const InternetConnectionCard: React.FC<InternetConnectionCardProps> = ({
  internetConnection,
  refetch,
  onEdit,
  onDetail,
  internetConnectionTypeMap
}) => {
  const { t } = useTranslation();

  const renderStatusChip = (value: boolean | undefined) => (
    <Chip size="small" label={value ? t('common.yes') : t('common.no')} color={value ? 'success' : 'default'} sx={{ minWidth: 70 }} />
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(internetConnection)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {internetConnectionTypeMap.get(internetConnection?.internet_connection_type_id) || internetConnection?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.internet-connection.details.routers')}: {renderStatusChip(internetConnection?.routers)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.internet-connection.details.switches')}: {renderStatusChip(internetConnection?.switches)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.internet-connection.details.modems')}: {renderStatusChip(internetConnection?.modems)}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="body2" color="text.secondary" display="flex" alignItems="center" gap={1}>
              {t('project.other.internet-connection.details.cables')}: {renderStatusChip(internetConnection?.cables)}
            </Typography>
          </Grid>
        </Grid>

        {internetConnection?.others && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              {t('project.other.internet-connection.details.others')}: {internetConnection.others}
            </Typography>
          </Box>
        )}

        {internetConnection?.created_at && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            {t('common.table-columns.created-at')}: {formatCreatedAt(internetConnection.created_at)}
          </Typography>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between' }}>
        <FileDrawer id={internetConnection.id} type={uploadableProjectFileTypes.other.internetConnection} />

        <Box display="flex">
          <ModelAction
            model="InternetConnection"
            model_id={internetConnection.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            editPermissionRule={{
              action: 'update',
              subject: 'internetconnection'
            }}
            onEdit={() => onEdit(internetConnection)}
            item={internetConnection}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default InternetConnectionCard;
