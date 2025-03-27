import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { InternetConnectionInfrastructureAge } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface InternetConnectionInfrastructureAgeCardProps {
  internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge;
  refetch: () => void;
  onEdit: (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => void;
  onDelete: (id: string) => void;
  onDetail: (internetConnectionInfrastructureAge: InternetConnectionInfrastructureAge) => void;
}

const InternetConnectionInfrastructureAgeCard: React.FC<InternetConnectionInfrastructureAgeCardProps> = ({
  internetConnectionInfrastructureAge,
  refetch,
  onEdit,
  onDelete,
  onDetail
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(internetConnectionInfrastructureAge)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {internetConnectionInfrastructureAge?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.internet-connection-id')}:{' '}
            {internetConnectionInfrastructureAge?.internet_connection_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.routers')}:{' '}
            {internetConnectionInfrastructureAge?.routers?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.switches')}:{' '}
            {internetConnectionInfrastructureAge?.switches?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.modems')}:{' '}
            {internetConnectionInfrastructureAge?.modems?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.cables')}:{' '}
            {internetConnectionInfrastructureAge?.cables?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-age.details.others')}:{' '}
            {internetConnectionInfrastructureAge?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer
          id={internetConnectionInfrastructureAge.id}
          type={uploadableProjectFileTypes.other.internetConnectionInfrastructureAge}
        />
        <ModelAction
          model="InternetConnectionInfrastructureAge"
          model_id={internetConnectionInfrastructureAge.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'internetconnectioninfrastructureage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'internetconnectioninfrastructureage'
          }}
          onEdit={() => onEdit(internetConnectionInfrastructureAge)}
          onDelete={() => onDelete(internetConnectionInfrastructureAge.id)}
          item={internetConnectionInfrastructureAge}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default InternetConnectionInfrastructureAgeCard;
