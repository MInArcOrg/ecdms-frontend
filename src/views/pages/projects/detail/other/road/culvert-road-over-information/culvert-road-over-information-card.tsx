'use client';

import { Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import type React from 'react';
import { useTranslation } from 'react-i18next';
import type { CulvertRoadOverInformation } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CulvertRoadOverInformationCardProps {
  culvertRoadOverInformation: CulvertRoadOverInformation;
  refetch: () => void;
  onEdit: (culvertRoadOverInformation: CulvertRoadOverInformation) => void;
  onDelete: (id: string) => void;
  onDetail: (culvertRoadOverInformation: CulvertRoadOverInformation) => void;
}

const CulvertRoadOverInformationCard: React.FC<CulvertRoadOverInformationCardProps> = ({
  culvertRoadOverInformation,
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
              onClick={() => onDetail(culvertRoadOverInformation)}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {culvertRoadOverInformation?.id.slice(0, 5)}...
            </Typography>
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />
        <Box display="flex" flexDirection="column" gap={1} mt={2}>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-road-over-information.details.culvert-id')}: {culvertRoadOverInformation?.culvert?.name || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-road-over-information.details.carriage-way-width')}:{' '}
            {culvertRoadOverInformation?.carriage_way_width || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-road-over-information.details.lane-number')}: {culvertRoadOverInformation?.lane_number || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('project.other.culvert-road-over-information.details.guard-rail-type-id')}:{' '}
            {culvertRoadOverInformation?.guardRailType?.title || 'N/A'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <ModelAction
          model="CulvertRoadOverInformation"
          model_id={culvertRoadOverInformation.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'culvertroadoverinformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertroadoverinformation'
          }}
          onEdit={() => onEdit(culvertRoadOverInformation)}
          onDelete={() => onDelete(culvertRoadOverInformation.id)}
          item={culvertRoadOverInformation}
          options={[]}
        />
      </CardActions>
    </Card>
  );
};
export default CulvertRoadOverInformationCard;
