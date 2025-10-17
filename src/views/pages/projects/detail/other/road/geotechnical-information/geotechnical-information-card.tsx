'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import type { GeotechnicalInformation } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface GeotechnicalInformationCardProps {
  geotechnicalInformation: GeotechnicalInformation;
  refetch: () => void;
  onEdit: (geotechnicalInformation: GeotechnicalInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (geotechnicalInformation: GeotechnicalInformation) => void;
}

const GeotechnicalInformationCard: React.FC<GeotechnicalInformationCardProps> = ({
  geotechnicalInformation,
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
              onClick={() => onDetail(geotechnicalInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {geotechnicalInformation?.name || geotechnicalInformation?.id.slice(0, 8) + '...'}
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geotechnical-information.details.soil-type')}: {geotechnicalInformation?.soil_type_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geotechnical-information.details.ground-water-impact')}:{' '}
            {geotechnicalInformation?.ground_water_impact_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.geotechnical-information.details.slope-stability')}: {geotechnicalInformation?.slope_stability_id || 'N/A'}
          </Typography>
          {geotechnicalInformation?.remark && (
            <Typography variant="body2" color="text.secondary">
              {t('project.other.geotechnical-information.details.remark')}: {geotechnicalInformation.remark}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {t('common.table-columns.created-at')}:{' '}
            {geotechnicalInformation?.created_at ? formatCreatedAt(geotechnicalInformation.created_at) : 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" fontWeight="medium">
            {t('project.other.geotechnical-information.file-types.seismic-design')}:
          </Typography>
          <FileDrawer id={geotechnicalInformation.id} type={uploadableProjectFileTypes.other.seismicDesign} />
        </Box>

        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" fontWeight="medium">
            {t('project.other.geotechnical-information.file-types.geotechnical-report')}:
          </Typography>
          <FileDrawer id={geotechnicalInformation.id} type={uploadableProjectFileTypes.other.geotechnicalReport} />
        </Box>

        <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="subtitle2" fontWeight="medium">
            {t('project.other.geotechnical-information.file-types.foundation-design')}:
          </Typography>
          <FileDrawer id={geotechnicalInformation.id} type={uploadableProjectFileTypes.other.foundationDesign} />
        </Box>

        <Box width="100%" display="flex" justifyContent="flex-end" mt={1}>
          <ModelAction
            model="GeotechnicalInformation"
            model_id={geotechnicalInformation.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'geotechnicalinformation'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'geotechnicalinformation'
            }}
            onEdit={() => onEdit(geotechnicalInformation)}
            onDelete={() => onDelete(geotechnicalInformation.id)}
            item={geotechnicalInformation}
            options={[]}
          />
        </Box>
      </CardActions>
    </Card>
  );
};

export default GeotechnicalInformationCard;
