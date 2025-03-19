import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { HydrologicalInformation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface HydrologicalInformationCardProps {
  hydrologicalInformation: HydrologicalInformation;
  refetch: () => void;
  onEdit: (hydrologicalInformation: HydrologicalInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (hydrologicalInformation: HydrologicalInformation) => void;
}

const HydrologicalInformationCard: React.FC<HydrologicalInformationCardProps> = ({
  hydrologicalInformation,
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
              onClick={() => onDetail(hydrologicalInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {hydrologicalInformation?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.water-source')}: {hydrologicalInformation?.water_source || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.catchment-area')}: {hydrologicalInformation?.catchment_area?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.elevation-change')}: {hydrologicalInformation?.elevation_change?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.head')}: {hydrologicalInformation?.head?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.total-inflow')}: {hydrologicalInformation?.total_inflow?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.active-storage-volume')}: {hydrologicalInformation?.active_storage_volume?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.water-stored')}: {hydrologicalInformation?.water_stored?.toString() || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.hydrological-information.details.remark')}: {hydrologicalInformation?.remark || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}: {hydrologicalInformation?.created_at ? formatCreatedAt(hydrologicalInformation.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <FileDrawer id={hydrologicalInformation.id} type={uploadableProjectFileTypes.other.hydrologicalInformation} />
        <ModelAction
          model="HydrologicalInformation"
          model_id={hydrologicalInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(hydrologicalInformation)}
          onDelete={() => onDelete(hydrologicalInformation.id)}
          item={hydrologicalInformation}
          deletePermissionRule={{
            action: 'delete',
            subject: 'hydrologicalInformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'hydrologicalInformation'
          }}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};

export default HydrologicalInformationCard;
