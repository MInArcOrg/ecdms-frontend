import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { TransmissionLine } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface TransmissionLineCardProps {
  transmissionLine: TransmissionLine;
  refetch: () => void;
  onEdit: (transmissionLine: TransmissionLine) => void;
  onDelete: (id: string) => void;
  onDetail: (transmissionLine: TransmissionLine) => void;
}

const TransmissionLineCard: React.FC<TransmissionLineCardProps> = ({ transmissionLine, refetch, onEdit, onDelete, onDetail }) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="bold">
            <Button
              onClick={() => onDetail(transmissionLine)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {transmissionLine.name}
            </Button>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.line-type')}: {transmissionLine.line_type || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.transmission-capacity')}:{' '}
            {transmissionLine.transmission_capacity || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.transmitting-power')}: {transmissionLine.transmitting_power || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.transmitting-current')}:{' '}
            {transmissionLine.transmitting_current || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.transmitting-voltage')}:{' '}
            {transmissionLine.transmitting_voltage || t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.transmission-towers-number')}:{' '}
            {transmissionLine.transmission_towers_number !== null ? transmissionLine.transmission_towers_number : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.start-northing')}:{' '}
            {transmissionLine.start_northing !== null ? transmissionLine.start_northing : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.start-easting')}:{' '}
            {transmissionLine.start_easting !== null ? transmissionLine.start_easting : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.end-northing')}:{' '}
            {transmissionLine.end_northing !== null ? transmissionLine.end_northing : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.transmission-line.end-easting')}:{' '}
            {transmissionLine.end_easting !== null ? transmissionLine.end_easting : t('common.not-available')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {transmissionLine.created_at ? formatCreatedAt(transmissionLine.created_at) : t('common.not-available')}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={transmissionLine.id} type={uploadableProjectFileTypes.other.transmissionLine} />
        <ModelAction
          model="TransmissionLine"
          model_id={transmissionLine.id}
          refetchModel={refetch}
          resubmit={refetch}
          title=""
          postAction={refetch}
        />
        <RowOptions
          onEdit={() => onEdit(transmissionLine)}
          onDelete={() => onDelete(transmissionLine.id)}
          item={transmissionLine}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default TransmissionLineCard;
