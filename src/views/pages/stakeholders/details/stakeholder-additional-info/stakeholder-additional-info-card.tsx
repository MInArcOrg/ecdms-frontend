import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { StakeholderAdditionalInformation } from 'src/types/stakeholder/stakeholder-additional-information';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface AdditionalInformationCardProps {
  additionalInfo: StakeholderAdditionalInformation;
  refetch: () => void;
  onEdit: (additionalInfo: StakeholderAdditionalInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (additionalInfo: StakeholderAdditionalInformation) => void;
}

const AdditionalInformationCard: React.FC<AdditionalInformationCardProps> = ({ additionalInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(additionalInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {additionalInfo.reference || t('stakeholder.stakeholder-additional-information.noReference')}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.stakeholder-additional-information.additionalInformation')}: {additionalInfo.additional_information}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="StakeholderAdditionalInformation"
          model_id={additionalInfo?.id || ''}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderadditionalinformation'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderadditionalinformation'
          }}
          onEdit={() => onEdit(additionalInfo)}
          onDelete={() => onDelete(additionalInfo?.id || '')}
          item={additionalInfo}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default AdditionalInformationCard;
