import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableStakeholderFileTypes } from 'src/services/utils/file-constants';
import { ConstructionRelatedService } from 'src/types/stakeholder/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface ConstructionRelatedServiceCardProps {
  constructionRelatedService: ConstructionRelatedService;
  refetch: () => void;
  onEdit: (constructionRelatedService: ConstructionRelatedService) => void;
  onDelete: (id: string) => void;
  onDetail: (constructionRelatedService: ConstructionRelatedService) => void;
}

const ConstructionRelatedServiceCard: React.FC<ConstructionRelatedServiceCardProps> = ({
  constructionRelatedService,
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
              onClick={() => onDetail(constructionRelatedService)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {constructionRelatedService.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.construction-related-service.details.service-type')}: {constructionRelatedService.service_type || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.construction-related-service.details.specification-detail')}:{' '}
            {constructionRelatedService.specification_detail || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('stakeholder.other.construction-related-service.details.measurement-unit')}:{' '}
            {constructionRelatedService.measurement_unit || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {constructionRelatedService.created_at ? formatCreatedAt(constructionRelatedService.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={constructionRelatedService.id} type={uploadableStakeholderFileTypes.other.constructionRelatedService} />
        <ModelAction
          model="ConstructionRelatedService"
          model_id={constructionRelatedService.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(constructionRelatedService)}
          onDelete={() => onDelete(constructionRelatedService.id)}
          item={constructionRelatedService}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'constructionRelatedService'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'constructionRelatedService'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default ConstructionRelatedServiceCard;
