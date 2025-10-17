import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { TransformerType } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TransformerTypeCardProps {
  transformerType: TransformerType;
  refetch: () => void;
  onEdit: (transformerType: TransformerType) => void;
  onDelete: (id: string) => void;
  onDetail: (transformerType: TransformerType) => void;
}

const TransformerTypeCard: React.FC<TransformerTypeCardProps> = ({ transformerType, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(transformerType)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {transformerType.name}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer-type.details.description')}: {transformerType.description || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {transformerType.created_at ? formatCreatedAt(transformerType.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {transformerType.updated_at ? formatCreatedAt(transformerType.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={transformerType.id} type={uploadableProjectFileTypes.other.transformerType} />
        <ModelAction
          model="TransformerType"
          model_id={transformerType.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          onEdit={() => onEdit(transformerType)}
          onDelete={() => onDelete(transformerType.id)}
          item={transformerType}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default TransformerTypeCard;
