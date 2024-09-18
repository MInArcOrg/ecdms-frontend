import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { GeneratingCapacity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface GeneratingCapacityCardProps {
  generatingCapacity: GeneratingCapacity;
  refetch: () => void;
  onEdit: (generatingCapacity: GeneratingCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (generatingCapacity: GeneratingCapacity) => void;
}

const GeneratingCapacityCard: React.FC<GeneratingCapacityCardProps> = ({ generatingCapacity, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(generatingCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {generatingCapacity.id.slice(0, 5)}...
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.operator')}: {generatingCapacity.operator || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.turbine-type-number')}:{' '}
            {generatingCapacity.turbine_type_number !== undefined ? generatingCapacity.turbine_type_number : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.designed-capacity')}:{' '}
            {generatingCapacity.designed_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.generating-capacity')}:{' '}
            {generatingCapacity.generating_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.installed-capacity')}:{' '}
            {generatingCapacity.installed_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.capacity-factor')}:{' '}
            {generatingCapacity.capacity_factor || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.annual-generation')}:{' '}
            {generatingCapacity.annual_generation || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.generating-capacity.details.commission-date')}:{' '}
            {generatingCapacity.commission_date ? formatCreatedAt(generatingCapacity.commission_date) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {generatingCapacity.created_at ? formatCreatedAt(generatingCapacity.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {generatingCapacity.updated_at ? formatCreatedAt(generatingCapacity.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={generatingCapacity.id} type={uploadableProjectFileTypes.other.generatingCapacity} />
        <ModelAction
          model="GeneratingCapacity"
          model_id={generatingCapacity.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          onEdit={() => onEdit(generatingCapacity)}
          onDelete={() => onDelete(generatingCapacity.id)}
          item={generatingCapacity}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'generatingcapacity'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'generatingcapacity'
          }}
        />
      </CardActions>
    </Card>
  );
};

export default GeneratingCapacityCard;
