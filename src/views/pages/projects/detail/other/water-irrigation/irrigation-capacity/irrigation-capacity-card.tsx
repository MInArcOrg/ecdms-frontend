import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { IrrigationCapacity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface IrrigationCapacityCardProps {
  irrigationCapacity: IrrigationCapacity;
  refetch: () => void;
  onEdit: (irrigationCapacity: IrrigationCapacity) => void;
  onDelete: (id: string) => void;
  onDetail: (irrigationCapacity: IrrigationCapacity) => void;
}

const IrrigationCapacityCard: React.FC<IrrigationCapacityCardProps> = ({ irrigationCapacity, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(irrigationCapacity)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {irrigationCapacity.id || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.irrigation-capacity.details.projectId')}: {irrigationCapacity.project_id || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.irrigation-capacity.details.designedCapacity')}:{' '}
            {irrigationCapacity.designed_irrigation_capacity !== undefined
              ? irrigationCapacity.designed_irrigation_capacity
              : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.irrigation-capacity.details.actualCapacity')}:{' '}
            {irrigationCapacity.actual_irrigation_capacity !== undefined
              ? irrigationCapacity.actual_irrigation_capacity
              : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.irrigation-capacity.details.revision-no')}:{' '}
            {irrigationCapacity.revision_no !== undefined ? irrigationCapacity.revision_no : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {irrigationCapacity.created_at ? formatCreatedAt(irrigationCapacity.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {irrigationCapacity.updated_at ? formatCreatedAt(irrigationCapacity.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={irrigationCapacity.id} type={uploadableProjectFileTypes.other.irrigationCapacity} />
        <ModelAction
          model="IrrigationCapacity"
          model_id={irrigationCapacity.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          onEdit={() => onEdit(irrigationCapacity)}
          onDelete={() => onDelete(irrigationCapacity.id)}
          item={irrigationCapacity}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default IrrigationCapacityCard;
