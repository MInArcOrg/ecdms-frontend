import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { Transformer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TransformerCardProps {
  transformer: Transformer;
  refetch: () => void;
  onEdit: (transformer: Transformer) => void;
  onDelete: (id: string) => void;
  onDetail: (transformer: Transformer) => void;
}

const TransformerCard: React.FC<TransformerCardProps> = ({ transformer, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(transformer)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {transformer.transformertype?.name || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer.details.specifications')}: {transformer.specifications || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer.details.input-current')}: {transformer.input_current || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer.details.input-voltage')}: {transformer.input_voltage || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer.details.output-current')}: {transformer.output_current || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transformer.details.output-voltage')}: {transformer.output_voltage || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {transformer.created_at ? formatCreatedAt(transformer.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={transformer.id} type={uploadableProjectFileTypes.other.transformer} />
        <ModelAction
          model="Transformer"
          model_id={transformer.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(transformer)} onDelete={() => onDelete(transformer.id)} item={transformer} options={[]} />
      </CardActions>
    </Card>
  );
};

export default TransformerCard;
