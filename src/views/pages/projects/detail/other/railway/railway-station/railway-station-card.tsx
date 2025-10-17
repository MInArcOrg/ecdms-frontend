import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { RailwayStation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface RailwayStationCardProps {
  railwayStation: RailwayStation;
  refetch: () => void;
  onEdit: (railwayStation: RailwayStation) => void;
  onDelete: (id: string) => void;
  onDetail: (railwayStation: RailwayStation) => void;
}

const RailwayStationCard: React.FC<RailwayStationCardProps> = ({ railwayStation, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(railwayStation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {railwayStation.name || t('common.not-available')}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.specifications')}: {railwayStation.specifications || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.northing')}: {railwayStation.northing || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.railway-station.details.easting')}: {railwayStation.easting || t('common.not-available')}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {railwayStation.created_at ? formatCreatedAt(railwayStation.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={railwayStation.id} type={uploadableProjectFileTypes.other.railwayStation} />
        <ModelAction
          model="RailwayStation"
          model_id={railwayStation.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions onEdit={() => onEdit(railwayStation)} onDelete={() => onDelete(railwayStation.id)} item={railwayStation} options={[]} />
      </CardActions>
    </Card>
  );
};

export default RailwayStationCard;
