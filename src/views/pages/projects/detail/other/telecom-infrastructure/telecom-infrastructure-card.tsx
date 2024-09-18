import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { TelecomInfrastructure } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TelecomInfrastructureCardProps {
  telecomInfrastructure: TelecomInfrastructure;
  refetch: () => void;
  onEdit: (telecomInfrastructure: TelecomInfrastructure) => void;
  onDelete: (id: string) => void;
  onDetail: (telecomInfrastructure: TelecomInfrastructure) => void;
}

const TelecomInfrastructureCard: React.FC<TelecomInfrastructureCardProps> = ({
  telecomInfrastructure,
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
              onClick={() => onDetail(telecomInfrastructure)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {telecomInfrastructure?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.name')}: {telecomInfrastructure?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.specifications')}: {telecomInfrastructure?.specifications || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.coverage-area')}:{' '}
            {telecomInfrastructure?.coverage_area ? `${telecomInfrastructure?.coverage_area} sqm` : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.no-of-families-coverage')}:{' '}
            {telecomInfrastructure?.no_of_families_coverage !== undefined ? telecomInfrastructure?.no_of_families_coverage : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.service-period')}:{' '}
            {telecomInfrastructure?.service_period ? formatCreatedAt(telecomInfrastructure.service_period) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.telecom-infrastructure.details.inauguration-date')}:{' '}
            {telecomInfrastructure?.inauguration_date ? formatCreatedAt(telecomInfrastructure.inauguration_date) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {telecomInfrastructure?.created_at ? formatCreatedAt(telecomInfrastructure.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={telecomInfrastructure.id} type={uploadableProjectFileTypes.other.telecomInfrastructure} />
        <ModelAction
          model="TelecomInfrastructure"
          model_id={telecomInfrastructure.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(telecomInfrastructure)}
          onDelete={() => onDelete(telecomInfrastructure.id)}
          item={telecomInfrastructure}
          deletePermissionRule={{
            action: 'delete',
            subject: 'telecom'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'telecom'
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default TelecomInfrastructureCard;
