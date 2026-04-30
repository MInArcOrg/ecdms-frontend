import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { MobileNetwork } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface MobileNetworkCardProps {
  mobileNetwork: MobileNetwork;
  refetch: () => void;
  onEdit: (mobileNetwork: MobileNetwork) => void;
  onDelete: (id: string) => void;
  onDetail: (mobileNetwork: MobileNetwork) => void;
}

const MobileNetworkCard: React.FC<MobileNetworkCardProps> = ({ mobileNetwork, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(mobileNetwork)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {mobileNetwork?.name || `${mobileNetwork?.id.slice(0, 5)}...`}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.name')}: {mobileNetwork?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.mobile-network-type')}: {mobileNetwork?.mobilenetworktype.title || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.call-towers')}: {mobileNetwork?.cell_towers ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.antennas')}: {mobileNetwork?.antennas ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.base-stations')}: {mobileNetwork?.base_stations ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.repeaters')}: {mobileNetwork?.repeaters ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.switches')}: {mobileNetwork?.switches ? t('common.yes') : t('common.no')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.mobile-network.details.others')}: {mobileNetwork?.others || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={mobileNetwork.id} type={uploadableProjectFileTypes.other.mobileNetwork} />
        <ModelAction
          model="MobileNetwork"
          model_id={mobileNetwork.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'mobilenetwork'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'mobilenetwork'
          }}
          onEdit={() => onEdit(mobileNetwork)}
          onDelete={() => onDelete(mobileNetwork.id)}
          item={mobileNetwork}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default MobileNetworkCard;
