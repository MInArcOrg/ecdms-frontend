import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { TracksGeometryData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TracksGeometryDataCardProps {
  tracksGeometryData: TracksGeometryData;
  refetch: () => void;
  onEdit: (tracksGeometryData: TracksGeometryData) => void;
  onDelete: (id: string) => void;
  onDetail: (tracksGeometryData: TracksGeometryData) => void;
}

const TracksGeometryDataCard: React.FC<TracksGeometryDataCardProps> = ({ tracksGeometryData, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(tracksGeometryData)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {tracksGeometryData.name || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.specifications')}: {tracksGeometryData.specifications || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.northing')}: {tracksGeometryData.northing || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.easting')}: {tracksGeometryData.easting || t('common.not-available')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {tracksGeometryData.created_at ? formatCreatedAt(tracksGeometryData.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={tracksGeometryData.id} type={uploadableProjectFileTypes.other.tracksGeometryData} />
        <ModelAction
          model="TracksGeometryData"
          model_id={tracksGeometryData.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(tracksGeometryData)} onDelete={() => onDelete(tracksGeometryData.id)} item={tracksGeometryData} options={[]} />
      </CardActions>
    </Card>
  );
};

export default TracksGeometryDataCard;
