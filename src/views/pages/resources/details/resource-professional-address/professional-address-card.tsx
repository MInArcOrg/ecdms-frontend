import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import { ProfessionalAddress } from 'src/types/resource';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface AddressCardProps {
  address: ProfessionalAddress;
  refetch: () => void;
  onEdit: (address: ProfessionalAddress) => void;
  onDelete: (id: string) => void;
  onDetail: (address: ProfessionalAddress) => void;
}

const AddressCard: React.FC<AddressCardProps> = ({ address, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(address)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {address?.city}, {address?.country}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('professional.address.region')}: {address?.region || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('professional.address.sub_city')}: {address?.sub_city || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('professional.address.street')}: {address?.street || 'N/A'}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={address?.id || ''} type={uploadableResourceFileTypes.resource} />
        <ModelAction
          model="ProfessionalAddress"
          model_id={address?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'professionaladdress'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'professionaladdress'
          }}
          onEdit={() => onEdit(address)}
          onDelete={() => onDelete(address?.id || '')}
          item={address}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default AddressCard;
