import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { StakeholderService } from 'src/types/stakeholder/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface StakeholderServiceCardProps {
  stakeholderService: StakeholderService;
  refetch: () => void;
  onEdit: (stakeholderService: StakeholderService) => void;
  onDelete: (id: string) => void;
  onDetail: (stakeholderService: StakeholderService) => void;
}

const StakeholderServiceCard: React.FC<StakeholderServiceCardProps> = ({ stakeholderService, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Typography
              noWrap
              component={Button}
              onClick={() => onDetail(stakeholderService)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {stakeholderService.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.stakeholder-service.details.service-type')}:{' '}
            {stakeholderService?.constructionrelatedservice?.service_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.stakeholder-service.details.specification-detail')}:{' '}
            {stakeholderService?.constructionrelatedservice?.specification_detail || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.stakeholder-service.details.measurement-unit')}:{' '}
            {stakeholderService?.constructionrelatedservice?.measurement_unit || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {stakeholderService.created_at ? formatCreatedAt(stakeholderService.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={stakeholderService.id} type={uploadableStakeholderFileTypes.other.stakeholderService} />
        <ModelAction
          model="StakeholderService"
          model_id={stakeholderService.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(stakeholderService)}
          onDelete={() => onDelete(stakeholderService.id)}
          item={stakeholderService}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderService'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderService'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default StakeholderServiceCard;
