import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { InternetConnectionInfrastructureManufacturer } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface InternetConnectionInfrastructureManufacturerCardProps {
  internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer;
  refetch: () => void;
  onEdit: (internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer) => void;
  onDelete: (id: string) => void;
  onDetail: (internetConnectionInfrastructureManufacturer: InternetConnectionInfrastructureManufacturer) => void;
}

const InternetConnectionInfrastructureManufacturerCard: React.FC<InternetConnectionInfrastructureManufacturerCardProps> = ({
  internetConnectionInfrastructureManufacturer,
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
              onClick={() => onDetail(internetConnectionInfrastructureManufacturer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {internetConnectionInfrastructureManufacturer?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.internet-connection-id')}:{' '}
            {internetConnectionInfrastructureManufacturer?.internet_connection_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.routers')}:{' '}
            {internetConnectionInfrastructureManufacturer?.routers || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.switches')}:{' '}
            {internetConnectionInfrastructureManufacturer?.switches || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.modems')}:{' '}
            {internetConnectionInfrastructureManufacturer?.modems || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.cables')}:{' '}
            {internetConnectionInfrastructureManufacturer?.cables || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.internet-connection-infrastructure-manufacturer.details.others')}:{' '}
            {internetConnectionInfrastructureManufacturer?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer
          id={internetConnectionInfrastructureManufacturer.id}
          type={uploadableProjectFileTypes.other.internetConnectionInfrastructureManufacturer}
        />
        <ModelAction
          model="InternetConnectionInfrastructureManufacturer"
          model_id={internetConnectionInfrastructureManufacturer.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'internetconnectioninfrastructuremanufacturer'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'internetconnectioninfrastructuremanufacturer'
          }}
          onEdit={() => onEdit(internetConnectionInfrastructureManufacturer)}
          onDelete={() => onDelete(internetConnectionInfrastructureManufacturer.id)}
          item={internetConnectionInfrastructureManufacturer}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default InternetConnectionInfrastructureManufacturerCard;
