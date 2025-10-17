import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { SpillwayInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface SpillwayInfoCardProps {
  spillwayInfo: SpillwayInfo;
  refetch: () => void;
  onEdit: (spillwayInfo: SpillwayInfo) => void;
  onDelete: (id: string) => void;
  onDetail: (spillwayInfo: SpillwayInfo) => void;
}

const SpillwayInfoCard: React.FC<SpillwayInfoCardProps> = ({ spillwayInfo, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(spillwayInfo)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {spillwayInfo.name || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.spillway-info.details.type')}: {spillwayInfo.type || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.spillway-info.details.quantity')}:{' '}
            {spillwayInfo.quantity !== undefined ? spillwayInfo.quantity : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.spillway-info.details.capacity')}:{' '}
            {spillwayInfo.capacity !== undefined ? spillwayInfo.capacity : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.spillway-info.details.specifications')}: {spillwayInfo.specifications || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.spillway-info.details.revision-no')}:{' '}
            {spillwayInfo.revision_no !== undefined ? spillwayInfo.revision_no : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {spillwayInfo.created_at ? formatCreatedAt(spillwayInfo.created_at) : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.updated-at')}:{' '}
            {spillwayInfo.updated_at ? formatCreatedAt(spillwayInfo.updated_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={spillwayInfo.id} type={uploadableProjectFileTypes.other.spillwayInfo} />
        <ModelAction
          model="SpillwayInfo"
          model_id={spillwayInfo.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(spillwayInfo)} onDelete={() => onDelete(spillwayInfo.id)} item={spillwayInfo} options={[]} />
      </CardActions>
    </Card>
  );
};

export default SpillwayInfoCard;
